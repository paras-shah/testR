FROM ubuntu:18.04
RUN rm -rf /var/lib/apt/lists/* &&\
    apt-get update --fix-missing

# Install apt packages and configure them
ENV DEBIAN_FRONTEND=noninteractive 
RUN apt-get install -y tzdata php php-curl git python-pip sudo vim curl\
    tree less python-pip python3-pip python-dev python3-dev gnupg2

# Install gcloud
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-sdk -y

# Install docker
RUN cd /tmp && curl -fsSL https://get.docker.com -o get-docker.sh &&\
    sudo sh get-docker.sh

# Install git lfs
RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash &&\
    sudo apt-get install -y git-lfs

# Install Kubernetes
RUN curl -sSL -o /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/v1.13.4/bin/linux/amd64/kubectl &&\
    chmod +x /usr/local/bin/kubectl

# Install other requried tools
RUN apt-get install -y build-essential libssl-dev libffi-dev python-dev

# #INSTALL nodejs related deps
RUN curl -sL https://deb.nodesource.com/setup_11.x | sudo bash &&\
    sudo apt-get install -y nodejs

# Create user and set it as default
ARG DEVBOX_USER_NAME
ARG DEVBOX_USER_UID
ARG DEVBOX_USER_GUID
ARG DEVBOX_PWD
RUN useradd -d /home/$DEVBOX_USER_NAME -m $DEVBOX_USER_NAME &&\
    usermod -u $DEVBOX_USER_UID -U $DEVBOX_USER_NAME &&\
    usermod -aG sudo $DEVBOX_USER_NAME &&\
    groupmod -g $DEVBOX_USER_GUID $DEVBOX_USER_NAME &&\
    echo $DEVBOX_USER_NAME:$DEVBOX_USER_NAME | chpasswd &&\
    usermod -aG docker $DEVBOX_USER_NAME &&\
    echo "$DEVBOX_USER_NAME ALL=(ALL) NOPASSWD:ALL" | sudo tee -a /etc/sudoers

ENV  LC_ALL C.UTF-8
ENV LANG C.UTF-8
RUN python3 -m pip install pip==18.0 &&\
    python3 -m pip install pipenv==2018.5.18 &&\
    python3 -m pip install docker-compose==1.24.1 &&\
    python3 -m pip install plumbum==1.6.7 &&\
    python3 -m pip install pystache==0.5.4 &&\
    python3 -m pip install black==19.3b0

RUN mkdir -p $DEVBOX_PWD && chmod 777 $DEVBOX_PWD

USER $DEVBOX_USER_NAME
ENV WORKON_HOME /venv
WORKDIR $DEVBOX_PWD

# Create entrypoint
USER root
COPY docker/dev_box/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# CleanUP
RUN sudo rm -rf /tmp/* &&\
    sudo rm -rf /root/.cache/* &&\
    sudo rm -rf /var/lib/apt/lists/*

# set user
USER $DEVBOX_USER_NAME
WORKDIR /home/$DEVBOX_USER_NAME
