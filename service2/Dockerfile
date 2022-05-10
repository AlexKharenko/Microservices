
FROM node:14-alpine3.12

WORKDIR /

COPY service2/package*.json ./

RUN npm install
COPY service2/. ./

EXPOSE 3000

CMD [ "npm", "run", "start"]