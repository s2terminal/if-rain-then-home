FROM node:alpine
WORKDIR /app

RUN apk --no-cache add git
RUN npm install -g serverless

COPY package.json ./
COPY package-lock.json ./
RUN npm install
