---
layout: pages_left_nav

namespace: docs.overview
lang: en
permalink: /en/docs/overview/
---


The Canadian Advanced Network for Astronomy Research (CANFAR) is a consortium that serves computing and data intensive needs of university groups and centres engaged in astronomy research.

## Storage Management
VOSpace is the CANFAR storage system, an implementation of the [Virtual Observatory Specification](http://www.ivoa.net/Documents/VOSpace/). It is used for storing and sharing files between members of a collaboration, or to publish data to the community. Users are able to view, manage, and transfer files and folders using either the [web interface](https://www.canfar.net/storage/vault/list) or the command line, with the [`vos` python package](https://www.canfar.net/en/docs/storage/).

## Science Portal
The [CANFAR Science Portal](https://www.canfar.net/science-portal/) is a container-based science platform that is accessible directly from the browser. The platform allows users to launch both pre-built and custom computing environments for their scientific analysis which run on the compute servers, next to the large data sets. It provides a browser-based remote desktop environment, Jupyter notebooks, the CARTA data visualization tool, and users can contribute web frameworks to interact with the same data.

For user instructions, see the [online documentation](https://canfar-scienceportal.readthedocs.io/en/latest/) or [doc/README.md](https://github.com/opencadc/science-containers/tree/main/doc) in the source distribution.

## Data Publication
The purpose of the [Data Publication Service (DPS)](https://www.canfar.net/citation/) is to support linking a research paper to the actual data that were used to produce the conclusions of that paper. The DPS provides storage space and the ability to register (publish) a Digital Object Identifier (DOI) with the DataCite system. That DOI will point to the published data on a permanent basis.

## Cloud Services
CANFAR gives access to the [OpenStack cloud](https://docs.alliancecan.ca/wiki/Cloud). Users can create and configure virtual machines (VMs), which can either be used interactively, or snap-shotted to be run in batch mode, and manage isolated data volumes. A [quick start guide](https://www.canfar.net/en/docs/quick_start/) is available, as well as [full documentation](https://docs.alliancecan.ca/wiki/Cloud_resources).

## Group Management
The [Group Management](https://www.canfar.net/en/docs/group_management/) system provides the ability to control the access to software containers and VOSpace datasets. Access can limited to the group owner, shared with a groups of users, or made fully public.
