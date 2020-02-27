#!/bin/bash
sudo chown root:docker /var/run/docker.sock

sudo mkdir -p /velocity/node_modules
# create symlink for node_modles to /velocity/node_modules if it doesn't exist 
if [ ! -d "rubrik/node_modules" ]; then
    echo "node_modules doesn't exist. creating symlink to node_modules."
    ln -s /velocity/node_modules rubrik/
fi

# npm install, if node_modules is empty
if [ -z "$(ls -A rubrik/node_modules)" ]; then
    echo "node_modules is empty. running npm install."
    sudo chmod -R 777 /velocity/node_modules
    cd rubrik && npm install
    cd ../
else
    echo "node_modules directory is not empty, skipping 'npm install'. run it as needed. ex: when package.json is updated etc.."
fi

exec "$@"