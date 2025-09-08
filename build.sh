#!/bin/bash

ENV=${1:-prod}
DOCKER_IMAGE=${DOCKER_IMAGE:-"ruby:3.4"}
echo "Building for ${ENV}"
sed -i -e 's/^site_env:.*$/site_env: '"${ENV}"'/' _config.yml

PWD=$(pwd)
OUTPUT_DIR="${PWD}/_site"
echo "Building into ${OUTPUT_DIR}"
docker run --rm -t -v $(pwd):/srv/jekyll -w /srv/jekyll ${DOCKER_IMAGE} /bin/sh -c "bundle install && bundle exec jekyll build"

if [[ -d "${OUTPUT_DIR}" && ! -z $RPS ]];
then
  rsync -avc ${OUTPUT_DIR}/* ${RPS}/www/
else
  echo "Not sending build to $RPS (does not exist)"
fi
