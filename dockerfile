FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /apps
WORKDIR /apps
ADD newrequirements.txt
RUN pip install -r newrequirements.txt
ADD . /apps/
