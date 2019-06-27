FROM golang:1.12.4-alpine as builder
ENV GOPATH /home/developer
ENV CGO_ENABLED 0
ENV GOOS linux
ENV GO111MODULE on

RUN apk add --no-cache \
      bash \
      binutils \
      file \
      git \
      openssl-dev \
      musl-dev \
      patch \
      scanelf \
      && :

RUN apk add --no-cache -X http://dl-4.alpinelinux.org/alpine/edge/main \
      'ca-certificates>=20190108-r0' \
      && :
RUN adduser -D developer
WORKDIR /home/developer

COPY /builder/caddy/ /home/developer/
RUN chown --recursive developer /home/developer
RUN chmod +x /home/developer/compile
USER developer
RUN /home/developer/compile


FROM alpine:3.10
LABEL maintainer "Morph1904 <morph1904@gmail.com>"

ENV CASE_SENSITIVE_PATH=true

COPY --from=builder /home/developer/bin/caddy /usr/bin/caddy

RUN apk upgrade --no-cache --available \
      && \
    apk add --no-cache \
      ca-certificates \
      git \
      openssl \
      openssh-client \
      && \
#ENV APPS_DIR=/apps
#ENV TYGER_ROOT=$APPS_DIR/Tyger2
#ENV TYGER_DIR=$TYGER_ROOT/backend
#ENV TYGER_DATA=$TYGER_ROOT/data
#ENV TYGER_LOGS=$TYGER_ROOT/logs

#RUN apk add --no-cache \
#    git \
#    curl \
#    python3 \
#    python3-dev \
#    bash \
#   gcc \
#   libc-dev \
#  linux-headers \
#  openssl-dev \
#   libffi \
#    ca-certificates && \
#    python3 -m ensurepip && \
#    rm -r /usr/lib/python*/ensurepip && \
#    pip3 install --upgrade pip setuptools && \
#    pip3 install uwsgi

#RUN mkdir -p $APPS_DIR 
#COPY . $TYGER_ROOT
#RUN pip3 install -r $TYGER_ROOT/newrequirements.txt

RUN /usr/bin/caddy -version
#RUN mkdir -p $TYGER_DATA && \
#    chmod -R 0775 $TYGER_ROOT

EXPOSE 80 443 9090 2015

#VOLUME ["/apps/Tyger2/data", "/root/.caddy"]
COPY builder/entrypoint.sh /entrypoint.sh
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