import subprocess


def run_and_print(command, rc=0):
    """   
    >>> run_and_print("echo Hello World") #doctest: +NORMALIZE_WHITESPACE
    ===============================================================================
    cmd: echo Hello World
    	Hello World
    -------------------------------------------------------------------------------
    0
    >>> run_and_print("unknown cmd", rc=None) #doctest: +NORMALIZE_WHITESPACE +ELLIPSIS
    ===============================================================================
    cmd: unknown cmd
    -------------------------------------------------------------------------------
    ...
    """
    process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    print("=" * 79)
    print("cmd: {0}".format(command))
    rcs = rc if type(rc) == list else [rc]
    while True:
        output = process.stdout.readline()
        if output == b"" and process.poll() is not None:
            break
        if output:
            print("\t{0}".format(output.decode().strip()))
    _rc = process.poll()
    if _rc not in [0, None] and rc != None:
        assert _rc not in rcs, "Return code {0}".format(_rc)
    print("-" * 79)
    return _rc


def run_and_return(command, rc=0):
    """   
    >>> run_and_return("echo Hello World") #doctest: +NORMALIZE_WHITESPACE
    ['Hello World']
    >>> run_and_return("unknown cmd", rc=None) #doctest: +NORMALIZE_WHITESPACE +ELLIPSIS
    []
    """
    rcs = rc if type(rc) == list else [rc]
    process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    _rc = process.poll()
    if _rc not in [0, None] and rc != None:
        assert _rc not in rcs, "Return code {0}".format(_rc)
    return [i.strip().decode() for i in process.stdout.readlines()]


def get_tag_for_paths(paths):
    return run_and_return(
        """ git log --pretty=oneline -n 1 {0} | cut -d ' ' -f 1""".format(" ".join(paths))
    )[0]


def build_and_tag(image_map):
    build_cmd = "docker-compose build {service_name}"
    tag_cmd = "docker tag {src} {dst}"
    for imk, imv in image_map.items():
        run_and_print(build_cmd.format(service_name=imk))
        run_and_print(tag_cmd.format(src=imv["src_image_name"], dst=imv["dst_image_name"]))


def push_images(image_map):
    push_cmd = "docker push {img}"
    for imk, imv in image_map.items():
        run_and_print(push_cmd.format(img=imv["src_image_name"]))
        run_and_print(push_cmd.format(img=imv["dst_image_name"]))


def get_image_map():
    image_map = {
        "velocity-web": {
            "image_version": get_tag_for_paths(["rubrik", "docker/web"]),
            "src_image_name": run_and_return(
                "echo ${IMAGE_NAME_PREFIX:?IMAGE_NAME_PREFIX}/velocity-web:${WEB_IMAGE_SUFFIX:-latest}"
            )[0],
            "dst_image_name": None,
        }
    }

    for imk, imv in image_map.items():
        imv["dst_image_name"] = (
            ":".join(imv["src_image_name"].split(":")[0:-1]) + ":" + imv["image_version"]
        )

    return image_map


if __name__ == "__main__":
    import doctest

    doctest.testmod(verbose=True)
