#!/bin/bash

source .env || exit $?

git pull
docker build -t dosebot . || exit $?

docker stop dosebot
docker rm dosebot
docker run \
    --name dosebot \
    --network host \
    -d \
    --env DISCORD_TOKEN="$DISCORD_TOKEN" \
    dosebot
