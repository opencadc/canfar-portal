FROM jekyll/jekyll:pages

RUN apk --no-cache add make g++ libxml2-dev libxslt-dev pkgconfig
