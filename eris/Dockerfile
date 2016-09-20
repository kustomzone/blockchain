FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y apt-transport-https ca-certificates
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
RUN echo 'deb https://apt.dockerproject.org/repo ubuntu-trusty main' > /etc/apt/sources.list.d/docker.list
RUN apt-get update
RUN apt-get install -y docker-engine

RUN apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv-keys 7D1F8F5A
RUN echo 'deb https://apt.eris.industries trusty main' > /etc/apt/sources.list.d/eris.list
RUN apt-get update
RUN apt-get -y install eris

ENV ERIS_PULL_APPROVE true
ENV PATH /scripts:$PATH

ADD ./scripts /scripts
