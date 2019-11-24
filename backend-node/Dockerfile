FROM node:alpine AS base

ENV TZ=America/Sao_Paulo
RUN rm -Rf /etc/localtime /etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apk update
RUN apk upgrade
RUN apk add --no-cache curl \ 
    busybox-extras \
    yarn \ 
    python \
    build-base \
    libexecinfo-dev \
    libc6-compat \
    g++ \
    make

WORKDIR /opt

CMD ["npm", "run", "start-production"]


COPY / ./
RUN rm -rf package-lock.json && npm i --production