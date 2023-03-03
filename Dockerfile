FROM node:18-alpine

MAINTAINER Kyrylo Pikhno

RUN mkdir /Applications

WORKDIR /app

COPY ./server/package.json /app

RUN npm i --prodaction