#!/bin/sh
set -e
cat > /usr/share/nginx/html/js/site-env.js <<EOF
window.CANFAR_ADVANCED_SEARCH_URL = '${ADVANCED_SEARCH_URL}';
window.CANFAR_GROUP_MANAGEMENT_URL = '${GROUP_MANAGEMENT_URL}';
window.CANFAR_CERTIFICATE_URL = '${CERTIFICATE_URL}';
EOF
exec nginx -g 'daemon off;'
