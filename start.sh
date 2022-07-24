#!/bin/bash

git pull
docker build -t dosebot . || exit $?

source .env || exit $?

docker run \
    --name dosebot \
    --network host \
    -d \
    --env DISCORD_TOKEN="$DISCORD_TOKEN" \
    dosebot
