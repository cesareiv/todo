#!/usr/bin/env bash

docker rm -f $(docker ps -a | grep todo | awk {'print $1'})
