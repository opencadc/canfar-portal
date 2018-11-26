#!/bin/bash

ENV=${1:-prod}
DOCKER_IMAGE="jekyll/jekyll:builder"
echo "Building for ${ENV}"
sed -i -e 's/^site_env:.*$/site_env: '"${ENV}"'/' _config.yml

docker pull ${DOCKER_IMAGE}
docker run --rm -t -v $(pwd):/srv/jekyll:ro -v /srv/cadc/build:/srv/cadc/build ${DOCKER_IMAGE} bash -c "bundle install && bundle exec jekyll build -d /srv/cadc/build"
