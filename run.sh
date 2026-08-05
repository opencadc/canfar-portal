#!/bin/sh

RUN_UID="$(id -u)"
echo "Starting development servers..."

mkdir -p ${HOME}/.bundle

if [ -n "${ADVANCED_SEARCH_URL}" ] || [ -n "${GROUP_MANAGEMENT_URL}" ]; then
  cat > js/site-env.js <<EOF
window.CANFAR_ADVANCED_SEARCH_URL = '${ADVANCED_SEARCH_URL:-https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/search/}';
window.CANFAR_GROUP_MANAGEMENT_URL = '${GROUP_MANAGEMENT_URL:-https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/groups/}';
EOF
fi

# Start Jekyll
echo "Starting Jekyll with Docker in daemon mode as uid ${RUN_UID}"
docker run --name jekyll --rm -t -p 4000:4000 \
  -e JEKYLL_UID="${RUN_UID}" \
  -v $(pwd):/srv/jekyll \
  -w /srv/jekyll \
  ruby:3.4 \
  /bin/sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"

# Wait for Jekyll Docker container to stop
wait $!
