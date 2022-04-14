FROM jekyll/builder:4

FROM nginx:alpine

ADD _site/ /usr/share/nginx/html/
COPY docker/nginx/config /usr/share/nginx/html/config

ADD docker/nginx/*.conf /etc/nginx/conf.d/
