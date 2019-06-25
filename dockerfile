FROM python:3.6
ENV PYTHONUNBUFFERED 1
ENV APP_ROOT /apps/Tyger2
RUN mkdir /apps
RUN mkdir /apps/Tyger2
# Set the working directory to /apps/Tyger2
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}
RUN ls
RUN apt-get update

RUN pip3 install -U pip
RUN pip3 install -r ${APP_ROOT}/newrequirements.txt

# Copy the current directory contents into the container at /app
RUN chmod 775 -R ${APP_ROOT}

CMD  ['python3 manage.py collectstatic --noinput', '&&', '/bin/sh','-c','python manage.py runserver']
