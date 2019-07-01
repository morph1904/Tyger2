#Build the Caddy exectuable
FROM alpine:3.10 as builder
LABEL maintainer "Morph1904 <morph1904@gmail.com>"

RUN apk add --no-cache \
        curl \
        tar
RUN curl -sLO https://github.com/mholt/caddy/releases/download/v1.0.0/caddy_v1.0.0_linux_amd64.tar.gz && tar -xzf caddy_v1.0.0_linux_amd64.tar.gz && mv caddy /usr/bin/caddy && chmod 755 /usr/bin/caddy && rm -rf caddy*

RUN /usr/bin/caddy -version

# Compile Vue into production
FROM node:8.16-alpine as nodebuild
COPY ./frontend /frontend
WORKDIR /frontend
RUN npm install
RUN npm run build

#Build final image
FROM python:3.7-alpine as Tyger2

ENV APPS_DIR=/apps
ENV TYGER_ROOT=$APPS_DIR/Tyger2
ENV TYGER_DIR=$TYGER_ROOT/backend
ENV TYGER_FRONTEND=$TYGER_ROOT/frontend
ENV TYGER_DATA=$TYGER_ROOT/data

RUN apk add --no-cache \
    git \
    #gcc \
    #uwsgi-python3 \
    curl \
    bash && \
    python3 -m ensurepip

RUN apk add --no-cache --virtual build-dependencies gcc libc-dev linux-headers python3-dev && \
    pip3 install --upgrade pip setuptools

RUN mkdir -p $APPS_DIR

# Bring in the compiled Vue frontend
COPY --from=nodebuild /frontend/dist $TYGER_FRONTEND/dist

COPY ./backend $TYGER_DIR
COPY ./builder $TYGER_ROOT/builder
COPY ./install/caddyfile.conf $TYGER_ROOT/install/caddyfile.conf
COPY ./install/uwsgi.ini $TYGER_ROOT/install/uwsgi.ini
#COPY ./install/logfile_plugin.so /usr/lib/uwsgi/logfile_plugin.so
COPY ./certs $TYGER_ROOT/certs
COPY ./data $TYGER_DATA
COPY ./newrequirements.txt $TYGER_ROOT

#Install backend
RUN pip3 install -r $TYGER_ROOT/newrequirements.txt
RUN pip3 install uwsgi

RUN apk del build-dependencies

COPY --from=builder /usr/bin/caddy /usr/bin/caddy
RUN chmod -R 0775 $TYGER_ROOT

EXPOSE 80 443 9090 9091

VOLUME ["/apps/Tyger2/data", "/root/.caddy"]

COPY builder/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["run"]

ARG BUILD_DATE
ARG VCS_REF
ARG VERSION
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="Tyger2" \
      org.label-schema.description="Caddy based reverse proxy app with web GUI " \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.version=$VERSION \
      org.label-schema.vcs-url="https://github.com/morph1904/Tyger2"