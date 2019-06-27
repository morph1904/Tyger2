FROM alpine:edge as builder
ENV GOPATH /go
ENV CADDY_TAG v0.10.4

RUN apk add --update musl \
    && apk add -t build-tools build-base go mercurial git \
    && mkdir /go \
    && cd /go \
    && go get -tags=$CADDY_TAG github.com/mholt/caddy/... \
    && mv $GOPATH/bin/caddy /bin \
    && mkdir /caddy \
    && apk del --purge build-tools \
    && rm -rf /go /var/cache/apk/*



FROM alpine:3.10
LABEL maintainer "Morph1904 <morph1904@gmail.com>"

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
COPY --from=builder /go/bin/caddy /usr/bin/caddy
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