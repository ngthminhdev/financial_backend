#!/bin/bash

if [ -z "$TAG" ]; then
    echo "Biến TAG không được set. Vui lòng set và thử lại."
    exit 1
fi  

sudo docker-compose down
sudo TAG=${TAG} docker-compose pull ngthminhdev/chat-app-server:${TAG}
sudo TAG=${TAG} docker-compose up -d
