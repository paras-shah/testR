#!/usr/bin/env python3
import argparse
import atexit
import os
import subprocess
import time
import uuid
import glob
import plumbum
import pystache
import yaml
from bin import common
from bin import env_generator

BASE_DIR = os.path.abspath(os.path.dirname("{0}/../../".format(os.path.abspath(__file__))))

ENV_FILE = "{0}/.env".format(BASE_DIR)
KUBE_CONF_AUTO_GENERATED_DIR = "{0}/.autogen-k8".format(BASE_DIR)
os.chdir(BASE_DIR)


def print_service_info(args):
    DEFAULT_PROXY_DOMAIN = os.environ.get("DEFAULT_PROXY_DOMAIN")
    PROXY_PORT = os.environ.get("DEFAULT_PROXY_SERVICE_PORT")

    if os.environ.get("DEPLOYMENT_TYPE") == "development":
        username = "dev-admin"
        password = "nopassword"
    else:
        username = "ProductionUsername"
        password = "ProductionPassword"

    PORT = "" if PROXY_PORT == "80" else ":{0}".format(PROXY_PORT)
    service_map = [
        dict(
            name="UI",
            username=username,
            password=password,
            url="http://web.{0}{1}".format(DEFAULT_PROXY_DOMAIN, PORT),
        )
    ]
    print("*" * 79)
    for service in service_map:
        print("\tAccess {name} with {username}:{password}@{url}".format(**service))
    print("*" * 79)


def render_k8_template(src_file, dst_file, context):
    with open(src_file) as src, open(dst_file, "w") as dst:
        src_content = src.read()
        dst_content = pystache.render(src_content, context)
        dst.write(dst_content)


def generate_deployment_configs():
    common.run_and_print(
        "rm -rf {} && mkdir  {}".format(KUBE_CONF_AUTO_GENERATED_DIR, KUBE_CONF_AUTO_GENERATED_DIR)
    )

    context = env_generator.get_dict_from_env_file(ENV_FILE)
    context.update({"WEB_IMAGE_SUFFIX": common.get_image_map()["velocity-web"]["image_version"]})
    # Render all templates
    for src_file in glob.glob("templates/kube/**/*.yml"):
        dst_dir = os.path.dirname(src_file).replace("templates/kube", ".autogen-k8")
        dst_file = src_file.replace("templates/kube", ".autogen-k8")
        if not os.path.exists(dst_dir):
            common.run_and_print("mkdir -p {0}".format(dst_dir))

        render_k8_template(src_file, dst_file, context)

    # Generate ConfigMap
    config_map = {
        "apiVersion": "v1",
        "data": context,
        "kind": "ConfigMap",
        "metadata": {
            "name": "velocity-config-env-file",
            "labels": {"name": os.environ.get("K8_VELOCITY_LABEL")},
        },
    }
    with open(".autogen-k8/velocity-config-env-file.yml", "w") as f:
        yaml.safe_dump(config_map, f)


def deploy_to_k8(args):
    # Reset deployment if needed
    if args.reset_hard and os.environ.get("DEPLOYMENT_TYPE") == "development":
        common.run_and_print(
            "kubectl -n {0} delete configmap {1}".format(
                os.environ.get("k8_NAMESPACE"), os.getenv("VELOCITY_CONFIGMAP_NAME")
            )
        )
        common.run_and_print(
            "kubectl  -n {0} delete deployment,svc,job, pod,replicaset,pv,pvc,configmaps -l name={1}".format(
                os.environ.get("k8_NAMESPACE"), os.getenv("K8_VELOCITY_LABEL")
            )
        )

    # create namespace
    try:
        common.run_and_print(
            "kubectl  -n {0} apply -f {1}/apps/namespace.yml".format(
                os.environ.get("k8_NAMESPACE"), os.getenv("KUBE_CONF_AUTO_GENERATED_DIR")
            )
        )
    except Exception as e:
        print(e)

    # create configmap
    try:
        common.run_and_print(
            "kubectl  -n {0} delete configmaps {1}".format(
                os.environ.get("k8_NAMESPACE"), os.getenv("VELOCITY_CONFIGMAP_NAME")
            )
        )
    except Exception as e:
        print(e)

    common.run_and_print(
        "kubectl  -n {0} apply -f {1}/velocity-config-env-file.yml".format(
            os.environ.get("k8_NAMESPACE"), KUBE_CONF_AUTO_GENERATED_DIR
        )
    )

    # Deploy ingress if needed
    if common.run_and_return("kubectl config current-context") == b"docker-desktop\n":
        common.run_and_print(
            "kubectl create namespace {0}".format(os.getenv("INGRESS_NAME_SPACE"))
        )
        common.run_and_print(
            "kubectl  -n {0} apply -f {1}/ingress-controller-development".format(
                os.getenv("INGRESS_NAME_SPACE"), KUBE_CONF_AUTO_GENERATED_DIR
            )
        )

    # Create apps
    common.run_and_print(
        "kubectl  -n {0} apply -f {1}/apps".format(
            os.environ.get("k8_NAMESPACE"), KUBE_CONF_AUTO_GENERATED_DIR
        )
    )

    # Create ingress rules
    if os.environ.get("DEPLOYMENT_TYPE") == "development":
        common.run_and_print(
            "kubectl  -n {0} apply -f {1}/ingress-rule-development".format(
                os.environ.get("k8_NAMESPACE"), KUBE_CONF_AUTO_GENERATED_DIR
            )
        )
    elif os.environ.get("DEPLOYMENT_TYPE") == "production":
        common.run_and_print(
            "kubectl  -n {0} apply -f {1}/ingress-rule-production".format(
                os.environ.get("k8_NAMESPACE"), KUBE_CONF_AUTO_GENERATED_DIR
            )
        )


def start_logging_k8(args):
    if args.tail_log:
        if os.environ.get("DEPLOYMENT_TYPE") != "development":
            print("!!! DEPLOYMENT_TYPE not set to development, can tail logs")
        else:
            common.run_and_print(
                "kubectl -n {0} logs --selector='app in (velocity-web)' --since=1m --tail=20 --all-containers".format(
                    os.environ.get("k8_NAMESPACE")
                )
            )


def build_images(args):
    docker_compose = plumbum.local["docker-compose"]
    if args.deployment_server:
        sock_file_name = "/tmp/" + str(uuid.uuid4())
        open_sock_cmd = "ssh -nNT -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o Compression=no -L {0}:/var/run/docker.sock {1}".format(
            sock_file_name, args.deployment_server
        )
        open_sock_proc = subprocess.Popen(open_sock_cmd, stdout=subprocess.PIPE, shell=True)
        print("waiting for socket to open...")
        time.sleep(30)
        atexit.register(open_sock_proc.kill)
        atexit.register(os.remove, sock_file_name)
        docker_compose = docker_compose.setenv(DOCKER_HOST="unix://{0}".format(sock_file_name))
    docker_compose = docker_compose.setenv(
        WEB_IMAGE_SUFFIX=common.get_image_map()["velocity-web"]["image_version"]
    )

    if os.environ.get("DEPLOYMENT_TYPE") == "development":
        common.run_and_print("bin/publish_images")


def main(args):
    if args.service_info:
        print_service_info(args)
        exit(0)

    build_images(args)
    generate_deployment_configs()
    deploy_to_k8(args)
    print_service_info(args)
    start_logging_k8(args)
