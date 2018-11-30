CANFAR on Docker
------------------

This directory contains files to build a working Docker system with the necessary CANFAR web
applications running (i.e. a complete CANFAR UI).

The supplied NGINX configuration is used to configure the NGINX Proxy server to serve port 80 and proxy requests to the various Java applications running in their respective Tomcat containers, as well as serve the main static site.

The `Dockerfile`_ listed in the root will assemble everything in here to have a usable NGINX serve host.  It will depend
on the other hosts (Other CANFAR application hosts) being available, however.  See the `CANFAR Docker Repository`_ for
a Compose file to run it.

.. _Dockerfile:  ../Dockerfile
.. _CANFAR Docker Repository:  https://github.com/canfar/docker
