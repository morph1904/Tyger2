#!/bin/bash

APPS_DIR=/apps
TYGER_ROOT=$APPS_DIR/Tyger2
TYGER_DIR=$TYGER_ROOT/backend
TYGER_DATA=$TYGER_ROOT/data
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
  cp $TYGER_ROOT/install/caddyfile.conf $TYGER_DATA
fi

if [ -e $TYGER_DATA/logs/uwsgi.log ]
then
  printf "uwsgi log exists, doing nothing\n"
else
    printf "Creating uwsgi.log\n"
  touch $TYGER_DATA/logs/uwsgi.log 
fi

if [ -e $TYGER_DATA/logs/uwsgi-access.log ]
then
  printf "uwsgi log exists, doing nothing\n"
else
    printf "Creating uwsgi-access.log\n"
  touch $TYGER_DATA/logs/uwsgi-access.log
fi


printf "Starting Services"

uwsgi --emperor $TYGER_ROOT/install/uwsgi.ini &
caddy -log $TYGER_LOGS/caddy.log -pidfile=$TYGER_DATA/caddypid.txt -agree=true -conf=$TYGER_DATA/caddyfile.conf -root=/var/tmp