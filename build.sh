#!/bin/bash

ENV=${1:-prod}
DOCKER_IMAGE=${DOCKER_IMAGE:-"bucket.canfar.net/jekyll:builder"}
echo "Building for ${ENV}"
sed -i -e 's/^site_env:.*$/site_env: '"${ENV}"'/' _config.yml

docker pull ${DOCKER_IMAGE}
PWD=$(pwd)
OUTPUT_DIR="${PWD}/_site"
echo "Building into ${OUTPUT_DIR}"
docker run --rm -t -v ${PWD}:/srv/jekyll ${DOCKER_IMAGE} bash -c "bundle install && bundle exec jekyll build --incremental"

if [[ -d "${OUTPUT_DIR}" ]];
then
  rsync -avc ${OUTPUT_DIR}/* ${RPS}/www/
else
  echo "Nothing built in ${OUTPUT_DIR}"
fi
