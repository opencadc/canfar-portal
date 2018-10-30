#!/bin/bash

docker run --rm -t -v $(pwd):/srv/jekyll jekyll/jekyll:builder bash -c "bundle install && bundle exec jekyll build"
