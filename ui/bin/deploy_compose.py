import atexit
import os
import plumbum
import subprocess
import time
import uuid

import common


def print_service_info():
    DEFAULT_PROXY_DOMAIN = os.environ.get("DEFAULT_PROXY_DOMAIN")
    service_map = [dict(name="UI", url="http://web.{0}".format(DEFAULT_PROXY_DOMAIN))]
    print("*" * 79)
    for service in service_map:
        print("\tAccess {name}@{url}".format(**service))
    print("*" * 79)


def main(args):
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
            WEB_IMAGE_SUFFIX=common.get_image_map()["web"]["image_version"]
        )

        if os.environ.get("DEPLOYMENT_TYPE") == "development":
            (docker_compose["build"]) & plumbum.FG
        else:
            (docker_compose["pull", "web"]) & plumbum.FG

    (docker_compose["up", "-d", "proxy"]) & plumbum.FG
    (docker_compose["up", "-d", "velocity-web"]) & plumbum.FG

    print_service_info()
    if args.tail_log:
        if os.environ.get("DEPLOYMENT_TYPE") != "development":
            print("!!! DEPLOYMENT_TYPE not set to development, can tail logs")
        else:
            (docker_compose["logs", "-f"]) & plumbum.FG
