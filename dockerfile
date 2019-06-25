FROM python:3.6
ENV PYTHONUNBUFFERED 1
ENV APP_ROOT /apps
RUN mkdir /apps
WORKDIR /apps
RUN apt-get update

RUN pip3 install -U pip

COPY requirements.txt ${APP_ROOT}/newrequirements.txt

RUN pip3 install -r ${APP_ROOT}/newrequirements.txt

# Set the working directory to /app
WORKDIR ${APP_ROOT}

# Copy the current directory contents into the container at /app
ADD . ${APP_ROOT}

RUN chmod 775 -R ${APP_ROOT}

CMD  ['python3 manage.py collectstatic --noinput', '&&', '/bin/sh','-c','python manage.py runserver']
