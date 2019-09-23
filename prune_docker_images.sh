#!/usr/bin/env bash

DIR=$(dirname "$0")
export GIT_COMMIT_NGINX="nginx:"$(git log -1 --pretty=%h ${DIR}/../nginx)
export GIT_COMMIT_EXPRESS="node-express:"$(git log -1 --pretty=%h ${DIR}/../backend/node-express)
export GIT_COMMIT_REACT="node-react:"$(git log -1 --pretty=%h ${DIR}/../frontend/node-react)

docker_images=$(docker images | grep todo | awk '{print $1":"$2}' | grep -v $GIT_COMMIT_NGINX | grep -v $GIT_COMMIT_EXPRESS | grep -v $GIT_COMMIT_REACT)

echo "Pruning old todo docker images..."
for i in $docker_images;
do
    docker rmi $i    
done
echo "Done."

echo "Pruning dangling images..."
docker image prune -f
echo "Done."
