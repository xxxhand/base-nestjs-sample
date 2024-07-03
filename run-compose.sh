#!/bin/sh

# 從package.json 中取得版本並設為環境參數
export IMAGE_TAG=$(grep '"version"' package.json | sed -E 's/.*"version": "(.*)".*/\1/')

echo "Using IMAGE_TAG: $IMAGE_TAG"

# Image name for checking exist or not
IMAGE_NAME="backend:$IMAGE_TAG"

# 若已存在則不加入 --build 參數
if docker images | grep -q "$IMAGE_NAME"; then
  echo "Image $IMAGE_NAME already exists. Running without --build."
  docker-compose up -d
else
  echo "Image $IMAGE_NAME does not exist. Building the image."
  docker-compose up --build -d
fi
