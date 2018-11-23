#!/bin/bash

ENV=${1:-prod}
echo "Building for ${ENV}"
sed -i -e 's/^site_env:.*$/site_env: '"${ENV}"'/' _config.yml
docker run --rm -t -v $(pwd):/srv/jekyll jekyll/jekyll:builder bash -c "bundle install && bundle exec jekyll build"
