FROM node:latest

RUN mkdir /dosebot
WORKDIR /dosebot

COPY package*.json ./
RUN npm install \
 && npx tsc
COPY . .

ENV DISCORD_TOKEN ""
CMD DISCORD_TOKEN="$DISCORD_TOKEN" node ./dist/bot.js
