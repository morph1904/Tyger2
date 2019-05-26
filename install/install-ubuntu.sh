#!/bin/bash

# Set used terminal colors
GREEN=$(tput setaf 2)
NORMAL=$(tput sgr0)
LIME_YELLOW=$(tput setaf 190)

# do not change, these are hardcoded elsewhere
APPS_DIR=/apps
TYGER_ROOT=$APPS_DIR/Tyger2
TYGER_DATA=$TYGER_ROOT/data
TYGER_LOGS=$TYGER_ROOT/logs

if [ "$(whoami)" != 'root' ]; then
  printf "${GREEN}This script must be run as root${NORMAL}\n"
  printf "\n"
  SCRIPTPATH=$( cd $(dirname $0) ; pwd -P )
  SELF=`basename $0`
  sudo $SCRIPTPATH'/'$SELF
  exit 1
fi

printf "${GREEN}You are about to install TygerCaddy.${NORMAL}\n"
read -p "${LIME_YELLOW}Proceed? (y/N)${NORMAL} " -r
printf "\n"
if [[ ! $REPLY =~ ^[Yy*] ]]
then
    exit
fi

printf "${GREEN}Installing dependencies...${NORMAL}\n"
apt-get update && apt-get -y upgrade && apt-get -y install --no-install-recommends \
  python3 \
  python3-pip \
  python3-setuptools \
  python3-wheel \
  python3-dev \
  gcc \
  libssl-dev \
  libffi-dev \
  git \
  curl

printf "${GREEN}Cloning repository...${NORMAL}\n"
mkdir $APPS_DIR
cd $APPS_DIR

git clone https://github.com/morph1904/Tyger2.git

mkdir -p $TYGER_DATA \
         $TYGER_DATA/logs

touch $TYGER_DATA/caddyfile.conf
touch $TYGER_LOGS/caddy.txt
touch $TYGER_LOGS/uwsgi.txt

printf "${GREEN}Installing Caddy...${NORMAL}\n"
curl https://getcaddy.com | bash -s personal hook.service

printf "${GREEN}Creating folders, moving files, setting permissions...${NORMAL}\n"
mkdir -p /etc/caddy \
         /etc/ssl/caddy

cp $TYGER_ROOT/install/caddy.service        /etc/systemd/system/caddy.service
cp $TYGER_ROOT/install/uwsgi.service        /etc/systemd/system/uwsgi.service
cp $TYGER_ROOT/install/caddy-reload.path    /etc/systemd/system/caddy-reload.path
cp $TYGER_ROOT/install/caddy-reload.service /etc/systemd/system/caddy-reload.service

chown -R www-data:root /etc/caddy \
                       /etc/ssl/caddy
chown -R www-data:www-data $TYGER_ROOT
chown root:root /etc/systemd/system/caddy.service \
                /etc/systemd/system/uwsgi.service \
                /etc/systemd/system/caddy-reload.path \
                /etc/systemd/system/caddy-reload.service \
                /usr/local/bin/caddy

chmod -R 700 /etc/ssl/caddy
chmod -R 755 $TYGER_ROOT \
             /usr/local/bin/caddy \
             /etc/systemd/system/caddy.service \
             /etc/systemd/system/caddy-reload.path \
             /etc/systemd/system/caddy-reload.service \
             /etc/systemd/system/uwsgi.service

setcap 'cap_net_bind_service=+eip' /usr/local/bin/caddy

printf "${GREEN}Setting up services to run on boot...${NORMAL}\n"
systemctl daemon-reload
systemctl enable caddy.service
systemctl enable uwsgi.service

printf "${GREEN}Setting up initial install...${NORMAL}\n"
pip3 install -r $TYGER_ROOT/newrequirements.txt

printf "${GREEN}Starting TygerCaddy... Almost there!${NORMAL}\n"
systemctl start uwsgi
systemctl start caddy

cd /apps/Tyger2/backend/
python3 manage.py migrate
python3 manage.py createsuperuser admin admin


printf "${GREEN}Install complete! Enter the server IP in your chosen browser complete the install wizard.${NORMAL}\n"