#!/bin/bash

APPS_DIR=/apps
TYGER_ROOT=$APPS_DIR/TygerCaddy
TYGER_DIR=$TYGER_ROOT/TygerCaddy
TYGER_DATA=$TYGER_DIR/data
TYGER_LOGS=$TYGER_DATA/logs

if [ -e $TYGER_DATA/db.sqlite3 ]
then
  python3 $TYGER_DIR/manage.py migrate
else
  printf "Assuming new install\n"
fi

if [ -e $TYGER_DATA/caddyfile.conf ]
then
  printf "Looks installed, doing nothing\n"
else
  cp $TYGER_DIR/caddyfile.conf $TYGER_DATA
fi

uwsgi --emperor $TYGER_ROOT/uwsgi.ini &
caddy -log $TYGER_LOGS/caddy.txt -pidfile=$TYGER_DATA/caddypid.txt -agree=true -conf=$TYGER_DATA/caddyfile.conf -root=/var/tmp