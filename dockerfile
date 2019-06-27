FROM alpine:3.10 as builder
LABEL maintainer "Morph1904 <morph1904@gmail.com>"

RUN apk add --no-cache \
        curl \
        tar
RUN curl -sLO https://github.com/mholt/caddy/releases/download/v1.0.0/caddy_v1.0.0_linux_amd64.tar.gz && tar -xzf caddy_v1.0.0_linux_amd64.tar.gz && mv caddy /usr/bin/caddy && chmod 755 /usr/bin/caddy && rm -rf caddy*

RUN /usr/bin/caddy -version

ENV APPS_DIR=/apps
ENV TYGER_ROOT=$APPS_DIR/Tyger2
ENV TYGER_DIR=$TYGER_ROOT/backend
ENV TYGER_DATA=$TYGER_ROOT/data
ENV TYGER_LOGS=$TYGER_ROOT/logs

RUN apk add --no-cache \
    git \
    curl \
    python3 \
    python3-dev \
    bash \
   gcc \
   libc-dev \
  linux-headers \
  openssl-dev \
   libffi \
    ca-certificates && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    pip3 install uwsgi

RUN mkdir -p $APPS_DIR 
COPY . $TYGER_ROOT
RUN pip3 install -r $TYGER_ROOT/newrequirements.txt


RUN mkdir -p $TYGER_DATA && \
    chmod -R 0775 $TYGER_ROOT

EXPOSE 80 443 9090 2015

VOLUME ["/apps/Tyger2/data", "/root/.caddy"]

COPY builder/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["run"]

ARG BUILD_DATE
ARG VCS_REF
ARG VERSION
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="TygerCaddy" \
      org.label-schema.description="Caddy based reverse proxy app with web GUI " \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.version=$VERSION \
      org.label-schema.vcs-url="https://github.com/morph1904/TygerCaddy"