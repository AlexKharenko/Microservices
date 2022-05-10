
FROM node:14-alpine3.12

WORKDIR /

COPY service1/package*.json ./

RUN npm install
COPY service1/. ./

EXPOSE 3000

CMD [ "npm", "run", "start"]