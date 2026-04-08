FROM ruby:3.4 AS builder

COPY . /app
WORKDIR /app
RUN bundle install && bundle exec jekyll build

FROM nginx:alpine AS production

# Non-root: no "user" directive (ignored without root and noisy), listen on high port,
# pre-create paths from nginx -V so workers do not need to mkdir under /var/cache/nginx.
RUN sed -i '/^[[:space:]]*user /d' /etc/nginx/nginx.conf && \
    sed -i 's/listen       80;/listen       8000;/' /etc/nginx/conf.d/default.conf && \
    mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /run/nginx.pid \
        /var/cache/nginx /var/log/nginx /etc/nginx /usr/share/nginx/html

COPY --from=builder /app/_site/ /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html

USER nginx

EXPOSE 8000
