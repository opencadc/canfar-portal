---
---

## CANFAR.net

Website code for [CANFAR.net](http://www.canfar.net).

The layout is all [Jekyll](http://jekyllrb.com) with [Markdown](https://daringfireball.net/projects/markdown/basics).

### Building the static site

[Jekyll](http://jekyllrb.com) has a Docker image that can be used to compile the site's source into a static
distribution that can then be used to deploy to a running proxy server.

The provided `build.sh` script will work.  It will build for Production by default, but can be used to build to any
configured environment declared in the [\_config.yml](./tree/gh-pages/_config.yml) file.  It is currently configured for `demo`, `rc`, and `prod` (Default):

```yaml
...
env:
    demo:
        cadc: 'demo.cadc-ccda.hia-iha.nrc-cnrc.gc.ca'
        canfar: 'demo.canfar.net'
        apps: 'demo.canfar.net'
    rc:
        cadc: 'rc.cadc-ccda.hia-iha.nrc-cnrc.gc.ca'
        canfar: 'rc-www.canfar.net'
        apps: 'rcapps.canfar.net'
    prod:
        cadc: 'www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca'
        canfar: 'www.canfar.net'
        apps: 'apps.canfar.net'
...
```ls


Custom environments can be added:
```yaml
env:
    ...
    mystaging:
      cadc: 'staging.cadc.ca'
      canfar: 'staging.canfar.net'
      apps: 'staging.canfar.net'
    ...
```

Then run:

`./build.sh mystaging`

When the build is finished, the `_site` folder will contain the compiled static files, with the links set appropriate to the environment configuration.


### Running locally (Development)

For development and testing, one can setup their own [Jekyll](http://jekyllrb.com)
server, or simply pull the official [Docker](http://www.docker.com)
container like so:

`docker pull jekyll/jekyll:pages`

which is meant as very close simulation of running the site on GitHub.

Then it can be run by cloning this repository. Ensure the `HOSTNAME` variable is set:
`export HOSTNAME=myhost.com`

or add it into a `.env` file in this folder.

Then starting the [Docker](http://www.docker.com) container using the supplied `docker-compose.yml` file:

```
mkdir $HOME/src && cd $HOME/src

git clone https://github.com/opencadc/canfar-portal.git canfar_site
cd canfar_site
docker-compose up -d
```

Or directly using the `docker` command:

```
mkdir $HOME/src && cd $HOME/src
git clone https://github.com/opencadc/canfar-portal.git canfar_site
docker run --rm --name canfar-site -p 4000:4000 -v $(pwd)/canfar_site:/srv/jekyll canfar/canfar-site bundle install && bundle exec jekyll s --incremental
```

Then point a browser to the [local site](http://localhost:4000/).

Normal development can occur in the `$HOME/src/canfar_site` directory
and will be immediately reflected after a page refresh.

Also, if the [\_config.yml](./tree/gh-pages/_config.yml) file contains a
`baseurl` value, it should be commented out before the server starts
(or comment it out then restart).

### Configuration

The configuration is handled by YAML files located in the [\_data](./tree/gh-pages/_data) directory.

#### [translations.yml](./tree/gh-pages/_data/translations.yml)

This file contains every textualized item on the site. The original
(and possibly future) intent was to have a bi-lingual site, so both the
`fr` and `en` versions have been maintained.

This also offers a convenient way to store re-usable items from the menus so that we can maintain consistency between the left menu and the drop down menus.

#### [menudata.yml](./tree/gh-pages/_data/menudata.yml)

This is menu layout for the dropdown menus and related left-menu (side nav).
The format is:
`<menuname>: [<items>]`

Where `<menuname>` is the related name in [translations.yml](./tree/gh-pages/_data/translations.yml) under the language.
The `<items>` are the same, but they can also be declared as hierarchical using dot (`.`) notation.

For example, the `Services` dropdown menu is made up of first level and second level (indented) items like so:

`services: ['uvic', 'uvic.cloud_portal', 'cadc', 'cadc.digital_object_identifiers', 'cadc.storage', 'cadc.batch_processing', 'cadc.group_management']`

Which will look in the [translations.yml](./tree/gh-pages/_data/translations.yml) file for:

`%PAGE_LANGUAGE%/services` to get the name to display (`Service`), then, for each item, will look for `%PAGE_LANGUAGE%/services/%ITEM_PATH%` to get their links and names to display.