[![pipeline status](https://gitlab.bytesense.biz/morph1904/Tyger2/badges/master/pipeline.svg)](https://gitlab.bytesense.biz/morph1904/Tyger2/commits/master)
# Tyger2
A Reverse Proxy Application 

## Description
This is a a bundled application using Caddy as a reverse proxy server and Django/VueJS as a web GUI. This is currently BETA and not a finished product. Use in a live environment at your own risk! (Though it seems stable at the moment.)

## Installation
### Docker (recommended)
#### Docker Compose
See a sample docker-compose.yml block below. 
```
version: "3.6"                                                                                                          
services: 
  Tyger2Beta:
    image: morph1904/tyger2:beta
    container_name: Tyger2Beta
    volumes:
      - /home/user/tyger2beta/data:/apps/Tyger2/data
      - /home/user/tyger2beta/data/certs:/root/.caddy
    ports:
      - 443:443
      - 80:80
      - 9090:9090
      - 9091:9091
    restart: unless-stopped
```
##### Storage
For storage persistance of the database and certificates etc please ensure that you map the volumes to a directory. If you backup your docker server these directories are used by Tyger2 to keep your certificates and proxy data, as well as your logs and caddyfile. 

##### Ports
To allow Tyger2 to proxy your requests correctly, you will need to forward port 443 and 80 from your router to your docker server's internal IP address. Tyger2 also uses ports 9090 and 9091. There is currently no easy way to change these however using docker, you can map them to alternative ports on your docker host. E.g 8123:9090 and 8124:9091

#### Portainer etc
Tyger2 works well with Portainer (thats what I use) just use the docker-compose config above to add your container. 

#### Post-Install
Once your docker container is up and running for the first time, go to 
```
http://<ip-of-your-docker-server>:9090/install/ 
```
Fill in the form with the relevant details:

username: the username of the admin user  
password: password for the admin user  
email: this is used for the letsencrypt certificate signing, they will send you expiry notifications  
server ip: this is the internal ip address of your docker server  

When complete visit your UI at
```
http://<ip-of-your-docker-server>:9091/
```
log in, and enjoy!
### Ubuntu Server
#### Download install script
Download the install script at [install-ubuntu.sh](https://raw.githubusercontent.com/morph1904/Tyger2/master/install/install-ubuntu.sh) and run it as sudo
```
cd /tmp  
wget https://raw.githubusercontent.com/morph1904/Tyger2/master/install/install-ubuntu.sh  
sudo ./install-ubuntu.sh  

```
The script will download and install the dependencies and set up the file structure and permissions etc.  
Once complete use the post install steps below to get up and running.  

#### Post-Install
Once the installer scripts is completed, go to 
```
http://<ip-of-your-ubuntu-server>:9090/install/ 
```
Fill in the form with the relevant details:

username: the username of the admin user  
password: password for the admin user  
email: this is used for the letsencrypt certificate signing, they will send you expiry notifications  
server ip: this is the internal ip address of your ubuntu server  

When complete visit your UI at
```
http://<ip-of-your-ubuntu-server>:9091/
```
log in, and enjoy!