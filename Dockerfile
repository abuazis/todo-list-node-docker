FROM node:17-alpine3.12

WORKDIR /todolist-api

COPY package.json .

RUN npm install && npm install --save sequelize-cli

COPY . .

EXPOSE 3030

RUN apk update && apk add bash

CMD ["npm", "start"]