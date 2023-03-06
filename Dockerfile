FROM node:18-alpine

MAINTAINER Kyrylo Pikhno

RUN mkdir /app

WORKDIR /app

COPY backend/package.json /app

RUN npm i --production