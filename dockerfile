#
# Builder
#
FROM abiosoft/caddy:builder as builder

ARG version="1.0.0"
ARG plugins="git,cors,realip,expires,cache"
ARG enable_telemetry="false"

# process wrapper
RUN go get -v github.com/abiosoft/parent

RUN VERSION=${version} PLUGINS=${plugins} ENABLE_TELEMETRY=${enable_telemetry} /bin/sh /usr/bin/builder.sh

#
# Final stage
#
FROM alpine:3.10
LABEL maintainer "Morph1904 <Morph1904@gmail.com>"

ENV APPS_DIR=/apps
ENV TYGER_ROOT=$APPS_DIR/Tyger2
ENV TYGER_DIR=$TYGER_ROOT/backend
ENV TYGER_DATA=$TYGER_ROOT/data
ENV TYGER_LOGS=$TYGER_ROOT/logs

ARG version="1.0.0"
LABEL caddy_version="$version"

# Let's Encrypt Agreement
ENV ACME_AGREE="true"

# Telemetry Stats
ENV ENABLE_TELEMETRY="$enable_telemetry"

RUN apk add --no-cache \
    ca-certificates \
    git \
    mailcap \
    openssh-client \
    tzdata \
    --no-cache \
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

# install caddy
COPY --from=builder /install/caddy /usr/bin/caddy

# validate install
RUN /usr/bin/caddy -version

EXPOSE 80 443 9001
VOLUME /root/.caddy

# Add any additional folders required, correct file permissions
RUN mkdir -p $TYGER_DATA && \
    chmod -R 0775 $TYGER_ROOT

COPY . /apps/Tyger2/

# install process wrapper
COPY --from=builder /go/bin/parent /bin/parent


#ENTRYPOINT ["/bin/parent", "caddy"]
#CMD ["--conf", "/apps/Tyger2/data/caddyfile.conf", "--log", "stdout", "--agree=$ACME_AGREE"]
ENTRYPOINT ["/bin/bash/","/apps/Tyger2/builder/entrypoint.sh"]
CMD ["run"]
#uwsgi --emperor $TYGER_ROOT/uwsgi.ini &
#caddy -log $TYGER_LOGS/caddy.txt -pidfile=$TYGER_DATA/caddypid.txt -agree=true -conf=$TYGER_DATA/caddyfile.conf -root=/var/tmp
######################
COPY builder/checkresponse.sh /test/checkresponse.sh
######################

ARG BUILD_DATE
ARG VCS_REF
ARG VERSION
LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="TygerCaddy" \
      org.label-schema.description="Caddy based reverse proxy app with web GUI " \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.version=$VERSION \
      org.label-schema.vcs-url="https://github.com/morph1904/TygerCaddy"
