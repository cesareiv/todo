#!/usr/bin/env bash                                                                                                         

DIR=$(dirname "$0")

#export GIT_COMMIT_MONGO=$(git log -1 --pretty=%h ${DIR}/mongo)
#export GIT_COMMIT_EXPRESS=$(git log -1 --pretty=%h ${DIR}/express)

# default the architecture to ""                                                                                            
if [ -z $ARCH ];
then
    export ARCH=""
fi

# default production mode to false                                                                                          
if [ -z $PRODUCTION ]
then
    export PRODUCTION="false"
fi

docker-compose -f $DIR/tests.yml down
docker-compose -f $DIR/tests.yml up --build --abort-on-container-exit --exit-code-from node-express "$@"





