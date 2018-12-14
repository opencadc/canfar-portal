FROM nginx:alpine

ADD _site/ /usr/share/nginx/html/
COPY docker/nginx/config /usr/share/nginx/html/config
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
