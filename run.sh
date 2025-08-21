#!/bin/sh

RUN_UID="$(id -u)"
echo "Starting development servers..."

mkdir -p ${HOME}/.bundle

# Start Jekyll
echo "Starting Jekyll with Docker in daemon mode as uid ${RUN_UID}"
docker run --name jekyll --rm -t -p 4000:4000 \
  -e JEKYLL_UID="${RUN_UID}" \
  -v $(pwd):/srv/jekyll \
  -v ${HOME}/.bundle:/home/jekyll/.bundle \
  jekyll/jekyll:4 \
  /bin/sh -c "bundle install && jekyll serve --host 0.0.0.0"

# Wait for Jekyll Docker container to stop
wait $!

