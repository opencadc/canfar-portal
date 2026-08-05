#!/bin/bash

DOCKER_IMAGE=${DOCKER_IMAGE:-"ruby:3.4"}

PWD=$(pwd)
OUTPUT_DIR="${PWD}/_site"
echo "Building into ${OUTPUT_DIR}"
docker run --rm -t -v $(pwd):/srv/jekyll -w /srv/jekyll ${DOCKER_IMAGE} /bin/sh -c "bundle install && bundle exec jekyll build"

if [[ (-n "${ADVANCED_SEARCH_URL}" || -n "${GROUP_MANAGEMENT_URL}") && -d "${OUTPUT_DIR}/js" ]];
then
  cat > "${OUTPUT_DIR}/js/site-env.js" <<EOF
window.CANFAR_ADVANCED_SEARCH_URL = '${ADVANCED_SEARCH_URL:-https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/search/}';
window.CANFAR_GROUP_MANAGEMENT_URL = '${GROUP_MANAGEMENT_URL:-https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/groups/}';
EOF
fi

if [[ -d "${OUTPUT_DIR}" && ! -z $RPS ]];
then
  rsync -avc ${OUTPUT_DIR}/* ${RPS}/www/
else
  echo "Not sending build to $RPS (does not exist)"
fi
