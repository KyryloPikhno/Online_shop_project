FROM node:18-alpine

MAINTAINER Kyrylo Pikhno

RUN mkdir /app

WORKDIR /app

COPY ./server/package.json /app

RUN npm i --production