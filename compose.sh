#!/usr/bin/env sh

DIR=$(dirname "$0")
export GIT_COMMIT=$(git log -1 --pretty=%h $DIR)

if [ -z $PRODUCTION ]
then
    PRODUCTION=false
fi


docker build \
       -t todo/node:$GIT_COMMIT $DIR

docker run \
       -d todo/node:$GIT_COMMIT $DIR \
       -p 49160:8080
