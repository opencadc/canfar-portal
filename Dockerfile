FROM ruby:3.4 AS builder

COPY . /app
WORKDIR /app
RUN bundle install && bundle exec jekyll build

FROM nginx:alpine AS production

COPY --from=builder /app/_site/ /usr/share/nginx/html/
