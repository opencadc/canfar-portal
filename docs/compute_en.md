---
layout: pages_left_nav

namespace: docs.cloud_portal
lang: en
permalink: /en/docs/cloud_portal/
---

##  Introduction

Are you an astronomer and would like to perform reproducible research? With the Canadian Advanced Network for Astronomical Research infrastructure you can build your data processing pipeline, interactively analyze results, and launch thousands of batch jobs on multiple clusters, using exactly the same operating system and software stack.

### Virtual Machines

The CANFAR infrastructure uses Virtual Machines to deploy your software. A Virtual Machine is a computer system running inside another computing system. The primary (or real) computing system provides the link to the hardware on which the computation is being done and provides an environment in which the 'Virtual Machine' can be created. This extra level of abstraction comes with a small performance price which is easily overcome by considering the savings in development costs. Once your computation works in your VM you can be certain that the computation will work on the computers that your processing will execute on.

### Digital Research Alliance Canada and OpenStack

The CANFAR computing resources are currently provided as an [OpenStack](http://www.openstack.org) cloud managed by [Digital Research Alliance Canada](https://alliancecan.ca).

### Before you start

You will need to [register](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/auth/request.html) to CANFAR. The CANFAR team will take care of your registration to Digital Research Alliance Canada infrastructure.

### Managing your resources

#### With the user interface
The OpenStack dashboard is a web interface to manage your resources for your persistent computing resources.
Digital Research Alliance Canada has a visual [quick start guide](https://www.westgrid.ca/support/quickstart/Nefos) to show you how to use it.

Some other tutorials that go into greater depth may be also be found at other OpenStack clouds, which all look similar.
The [RAC documentation](http://www.cybera.ca/projects/cloud-resources/rapid-access-cloud/documentation) at Cybera is another good source.

#### With the command line tools
To automate the management of your project resources, you can automate them using the OpenStack command line clients. We document some of the [command line tools](/docs/vms/) to help you getting started.

### Batch Processing
If you need to run large processing jobs, we recommend to make use of the CANFAR batch services. The resources are much larger and more adequate than for the personal resources you get with your project. The [batch documentation](/docs/batch/) has the basics you need to help you using the CANFAR batch services.

### Tutorial
A [tutorial](/docs/tutorial/) covering all the above use cases is also available. The documentation will show you how to setup Virtual Machines, install software and process some data, and storing results in your [VOSpace](/docs/vospace/).
