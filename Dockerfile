FROM ubuntu:20.04

USER root

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update && apt-get install -y \
    nginx \
    vim \
    openssh-server \
    git 

RUN rm -rf /etc/nginx/sites-available/default && rm -rf /etc/nginx/sites-enabled/default

ADD default.conf /etc/nginx/sites-available/default.conf

RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf

WORKDIR /usr/share/nginx/html/

COPY build/ .

RUN ls -alht

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
