#!/bin/bash

ENV=${1:-prod}
DOCKER_IMAGE="jekyll/jekyll:builder"
echo "Building for ${ENV}"
sed -i -e 's/^site_env:.*$/site_env: '"${ENV}"'/' _config.yml

docker pull ${DOCKER_IMAGE}
PWD=$(pwd)
echo "Mounting ${PWD} to /srv/jekyll"
docker run --rm -t -v $(pwd):/srv/jekyll -e JEKYLL_UID=90 -e JEKYLL_GID=97 -v /builds:/builds ${DOCKER_IMAGE} bash -c "bundle install && bundle exec jekyll build -d /builds"
