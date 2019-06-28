#!/usr/bin/env bash

DIR=$(dirname "$0")

export GIT_COMMIT_NGINX=$(git log -1 --pretty=%h ${DIR}/nginx)
export GIT_COMMIT_REACT=$(git log -1 --pretty=%h ${DIR}/frontend)
export GIT_COMMIT_EXPRESS=$(git log -1 --pretty=%h ${DIR}/backend)
export GIT_COMMIT_MONGO=$(git log -1 --pretty=%h ${DIR}/backend)


# default the architecture to ""
if [ -z $ARCH ]
then
    export ARCH=""
fi

# default production mode to false
if [ -z $PRODUCTION ]
then
    export PRODUCTION="false"
fi

# if the operation is to spin down, destroy all volumes
if [ "$1" == "down" ]
then
    docker-compose "$@" "--volumes"
elif [ "$1" == "rebuild" ]
then
    # kill the containers passed in, restart them and rebuild
    docker-compose kill "${@:2}"
    docker-compose up -d --no-deps --build "${@:2}"
else
    docker-compose "$@"
fi

