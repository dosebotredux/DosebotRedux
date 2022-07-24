FROM node:latest

RUN mkdir /dosebot
WORKDIR /dosebot

COPY package*.json ./
RUN npm ci --only=production
COPY . .

ENV DISCORD_TOKEN ""
CMD DISCORD_TOKEN="$DISCORD_TOKEN" node bot.js
