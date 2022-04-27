
FROM node:14-alpine3.12

WORKDIR /

COPY service/package*.json ./

RUN npm install
COPY service/. ./

EXPOSE 3000

CMD [ "npm", "run", "start"]