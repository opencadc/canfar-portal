#!/bin/bash

ENV=${1:-prod}
DOCKER_IMAGE=${DOCKER_IMAGE:-"jekyll/builder:4"}
echo "Building for ${ENV}"
sed -i -e 's/^site_env:.*$/site_env: '"${ENV}"'/' _config.yml

docker pull ${DOCKER_IMAGE}
PWD=$(pwd)
OUTPUT_DIR="${PWD}/_site"
echo "Building into ${OUTPUT_DIR}"
docker run --rm -t -v $(pwd):/srv/jekyll -v ${HOME}/.bundle:/home/jekyll/.bundle ${DOCKER_IMAGE} /bin/sh -c "bundle install && bundle exec jekyll build"

if [[ -d "${OUTPUT_DIR}" && ! -z $RPS ]];
then
  rsync -avc ${OUTPUT_DIR}/* ${RPS}/www/
else
  echo "Nothing built in ${OUTPUT_DIR}"
fi
