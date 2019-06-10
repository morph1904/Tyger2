import subprocess
import os
from install.models import Settings
from django.contrib.auth.models import User

from addresses.models import Address
from apps.models import App

from django.http import JsonResponse, HttpResponse

caddytext = ''

root_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),'data')

caddyfileconf = caddyfileconf = os.path.join(root_path, 'caddyfile.conf')

def reload_config():
    subprocess.call('pkill -USR1 caddy', shell=True)

def build_caddy_defaults():
    global caddytext
    global root_path
    global caddyfileconf

    user = User.objects.get(pk=1)
    
    caddytext = ':9091/api { \n \tproxy / localhost:9090 { \n \t\ttransparent \n \t} \n } \n :9091 { \n \t root /apps/Tyger2/frontend/dist \n \t log /apps/Tyger2/logs/frontend.log \n \t rewrite { \n \t\t regexp .* \n \t\t to {path} / \n \t } \n }\n\n'
    
    return True

def generate_block(add):
    
    global caddytext
    global root_path
    global caddyfileconf

    user = User.objects.get(pk=1)
    logfile = os.path.join(root_path, os.path.join(add.app.name, add.app.name + '.log'))
    caddytext += add.address + ' { \n\n' + '\troot ' + root_path + '\n\n' + '\tlog ' + logfile + '\n\n' + '\tproxy / ' + add.app.url + ' { \n'

    if add.app.insecure_skip_verify:
        caddytext += '\t\t insecure_skip_verify \n'

    if add.app.websocket:
        caddytext += '\t\t websocket \n'

    if add.app.transparent:
        caddytext += '\t\t transparent \n'

    caddytext += '\t} \n\n'

    if add.tls:
        if add.staging:
            caddytext += '\ttls ' + user.email + ' {\n' \
                                                '\t\tca https://acme-staging-v02.api.letsencrypt.org/directory\n' \
                                                '\t} \n' \
                                                '} \n'
        else: 
            caddytext += '\ttls ' + user.email + '\n} \n \n'
    else:
        caddytext += '\ttls off \n} \n \n'




def build_caddyfile(request):
    global caddytext
    global caddyfileconf

    build_caddy_defaults()

    user = User.objects.get(pk=1)

    caddyfile = open(caddyfileconf, 'w+')

    config = Settings.objects.get(pk=1)

    addresses = Address.objects.all()
    if addresses:
       for add in addresses:
           generate_block(add)

    caddyfile.write(caddytext)
    caddyfile.close()

    return HttpResponse(caddytext)
