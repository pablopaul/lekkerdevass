FROM node:18

WORKDIR /usr/src/app

ENV NODE_ENV development

RUN apt update && apt install -y sqlite3


COPY package*.json ./
RUN npm install --save-dev

# Bundle app source
COPY . .

EXPOSE 3000

CMD npm start
