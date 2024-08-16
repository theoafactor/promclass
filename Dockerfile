FROM node:alpine

WORKDIR /app/promclass

COPY package.json /app/promclass/

RUN npm install

COPY . /app/promclass/

CMD node server.js