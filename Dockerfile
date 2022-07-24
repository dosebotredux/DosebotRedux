FROM node:latest

RUN mkdir /dosebot
ADD . /dosebot
WORKDIR /dosebot

RUN npm install
RUN npx tsc

ENV DISCORD_TOKEN ""
CMD DISCORD_TOKEN="$DISCORD_TOKEN" node ./dist/bot.js
