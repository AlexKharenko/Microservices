
FROM node:14-alpine3.12

WORKDIR /

COPY service3/package*.json ./

RUN npm install
COPY service3/. ./

EXPOSE 3000

CMD [ "npm", "run", "start"]