---
layout: pages_left_nav

namespace: resources.docs.openstack_cloud_portal
lang: en
permalink: /en/resources/docs/openstack_cloud_portal
---

## Introduction

Are you an astronomer and would like to perform reproducible research? With the Canadian Advanced Network for Astronomical Research infrastructure you can build your data processing pipeline, interactively analyze results, and launch thousands of batch jobs on multiple clusters, using exactly the same operating system and software stack.

There are multiple methods for interacting with CANFAR Virtual Machines, including the [OpenStack dashboard](http://www.openstack.org/software/openstack-dashboard/), [command-line interface (CLI)](http://docs.openstack.org/user-guide/content/ch_cli.html), and a [Python API](http://docs.openstack.org/developer/python-novaclient/api.html), all of which are based on an underlying [RESTful API](http://developer.openstack.org/api-ref.html).

A good starting point for programmatic interactions with OpenStack is the CLI, which we introduce here. Some tutorials that go into greater depth may be found [here](http://www.cybera.ca/projects/cloud-resources/rapid-access-cloud/documentation).



<div class="row">
    <div class="col-md-5 col-sm-4">
      <ul class="list-group">
        <li class="list-group-item"><a href="#install-clients">Install Clients</a></li>
        <li class="list-group-item"><a href="#import-virtual-machine-images">Import virtual machine images</a></li>
      </ul>
    </div>
    <div class="col-md-5 col-sm-4">
      <ul class="list-group">
        <li class="list-group-item"><a href="#sharing-virtual-machine-images">Sharing virtual machine images</a></li>
        <li class="list-group-item"><a href="#managing-virtual-machine-instances">Managing virtual machine instances</a></li>
      </ul>
    </div>
</div>


## Install VM Management Clients

The CLI clients described in this document are available on the CANFAR batch host ```batch.canfar.net```, but you can install the clients on your own machine too.

The easiest method is to use the package system of a modern Linux distribution. In this document we will use the **nova** and **glance** clients (for the compute and image services, respectively).

For Debian-based distributions (e.g., Ubuntu):

{% highlight bash %}
$ sudo apt-get install python-novaclient python-glanceclient
{% endhighlight %}


For Redhat Enterprise-based distributions (e.g., Scientific Linux, CentOS):


{% highlight bash %}
$ sudo yum install python-novaclient python-glanceclient
{% endhighlight %}


Alternatively, to get the latest versions of the clients, install using **pip** (which may first require installation of the ```python-pip``` package using either ```apt-get``` or ```yum``` as above):


{% highlight bash %}
$ sudo pip install python-novaclient python-glanceclient
{% endhighlight %}


### Setup the Environment

The OpenStack CLI uses environment variables to store the URLs for services and credentials. The simplest way to set these variables is by sourcing an **openrc** file, which may be obtained from the OpenStack dashboard for your particular tenant. In the **Access & Security** panel switch to the **API Access** tab and then click on **Download OpenStack RC File** at the top-right.

{% include backToTop.html %}

## Import Virtual Machine Images

Virtual machine images reside in the OpenStack cloud's image repository, and can be accessed through the image service, **glance**. All images are associated with an OpenStack **tenant** (synonymous with **project** in OpenStack terminology), which is a single resource allocation. Within the CANFAR ecosystem, OpenStack tenants also correspond to **CANFAR groups with processing privileges**. Users may be members of multiple CANFAR processing groups, and each group may have multiple CANFAR users.

### List Virtual Machine Images

A VM image is normally only accessible to members of its tenant. However, there are a number of public images that are provided as a base upon which all users may build more complicated VMs. To list the images (both public and private) accessible to members of the current tenant:

{% highlight bash %}
$ glance image-list
{% endhighlight %}

{% highlight text %}
+--------------------------------------+-----------------------------------+-------------+------------------+-------------+--------+
| ID                                   | Name                              | Disk Format | Container Format | Size        | Status |
+--------------------------------------+-----------------------------------+-------------+------------------+-------------+--------+
| 7524b433-7f3f-4c0b-808b-09420791baae | CentOS 6.5 Base                   | qcow2       | bare             | 344457216   | active |
| 11f2b6f5-c21f-4ac2-93b4-6c94356e33bc | CentOS 6.6                        | qcow2       | bare             | 1151533056  | active |
| a4728b62-d15f-4e10-8475-1481ea3037d4 | CentOS 7                          | qcow2       | bare             | 339471872   | active |
| 6814a057-8acf-440b-97ba-e5386c5336c8 | Debian Jessie (8.0)               | qcow2       | bare             | 468853760   | active |
| 4375dc35-0711-4a23-aa61-be0152d42766 | Glint_CentOS                      | qcow2       | bare             | 3002007552  | active |
| 79c972b6-7aa6-47a5-8b46-404552a65d1e | ubuntu-server-14.04-amd64         | qcow2       | bare             | 255787520   | active |
| e8bc9e1d-495c-4d17-90fb-68d9d6a128c1 | uCernVM-devel.1.18-2              | raw         | bare             | 20971520    | active |
| ac787d9b-bb34-4741-b4a4-4a8126a44225 | Windows Server 2012 R2 Evaluation | raw         | bare             | 17182752768 | active |
+--------------------------------------+-----------------------------------+-------------+------------------+-------------+--------+
{% endhighlight %}


### Virtual Machine Requirements

Prior to importing images from an external source, become familiar with the [requirements](http://docs.openstack.org/image-guide/content/ch_openstack_images.html) for operability in an OpenStack cloud. Starting with one of the public base images is always a good idea, although modern cloud images from major Linux distributions will often work without modifications.

### Upload a Virtual Machine Image

Once you have a VM image ready, it can be uploaded to the image service directly from the local file system. For example:

{% highlight bash %}
$ glance image-create --name=new_vm --container-format=bare --disk-format=qcow2 < new_vm.qcow2
{% endhighlight %}


Here, the image disk format is **QCOW2** which compresses empty portions of the image, saving both file transfer and instantiating time. A [number of formats are supported](http://docs.openstack.org/image-guide/content/image-formats.html), and a good tool for converting between them is [qemu-img](http://docs.openstack.org/image-guide/content/ch_converting.html).

### Download a Virtual Machine Image

VM images may also be downloaded to the local file system. For example, download the ```CentOS 7``` image to a local file called ```centos7.qcow2``` (note ```ID``` of the image in the output of ```glance image-list```, and we have also chosen a file extension matching the ```Disk Format```):


{% highlight bash %}
$ glance image-download --file centos7.qcow2 a4728b62-d15f-4e10-8475-1481ea3037d4
{% endhighlight %}


{% include backToTop.html %}

## Sharing Virtual Machine Images

There are multiple ways to share your VM images. In addition to simply downloading the image from the image service and providing it to a collaborator (who may then upload it to their own tenant), there are other options that do not require making new copies.

### Share a VM Image with Another Tenant

If another user already has a CANFAR group with processing privileges (and corresponding OpenStack tenant), you can simply make the VM visible (read-only) to their tenant, enabling them to launch their own instances of the VM.

First, request the ```tenant_id``` for the target tenant (i.e., ```OS_TENANT_ID``` in the other user's openrc file). Then, **add members** to your VM's metadata:

<div class="shell">

{% highlight bash %}
$ glance member-create [image] [tenant_id]
{% endhighlight %}

</div>

where ```[image]``` can be either the ID or the name (output of ```glance image-list```) of the image in question. If using the dashboard, these images will then be visible from the target tenant in the **Images** window under the **Shared with Me** tab, as well as ```glance image-list``` from the command line.

### Add Users to your CANFAR Processing Group

Another option is to add a user to your CANFAR processing group through the [group management pages](http://www.canfar.phys.uvic.ca/canfar/groups/). Note, however, that *all* VM images in your tenant, as well as your processing allocation will also be available to them.

{% include backToTop.html %}

## Managing Virtual Machine Instances

### Preparation
Before launching an instance of a virtual machine, some preparation is needed:

* Create a **security group** (essentially firewall rules). Usually you want to enable ssh access.
* Create a **keypair**. This is an SSH public key that will be injected into a generic user account to give you access to the VM.
* Allocate an **IP address** to your tenant.

The [CANFAR tutorial](../tutorial/#virtual-machine-on-demand) describes these steps using the dashboard. The equivalent steps from the command line are covered in [this tutorial](https://docs.google.com/document/d/1zxnuyi1NoO-Hi52OWpmQZKu4dD3DipvZB-fy91mZ18Q/edit#heading=h.3znysh7).

### Launch the VM Instance

You will need to select a **flavor** (hardware profile) for the instance. List available flavors:

<div class="shell">

{% highlight bash %}
$ nova flavor-list
{% endhighlight %}

{% highlight bash %}
+--------------------------------------+---------------+-----------+------+-----------+------+-------+-------------+-----------+
| ID                                   | Name          | Memory_MB | Disk | Ephemeral | Swap | VCPUs | RXTX_Factor | Is_Public |
+--------------------------------------+---------------+-----------+------+-----------+------+-------+-------------+-----------+
| 083093b3-ffc1-464e-a453-cefce795021b | p4-6gb        | 6144      | 0    | 0         |      | 4     | 1.0         | True      |
| 0eb207f9-4575-4bd2-a430-1ed50e821d05 | c8-60gb-186   | 61440     | 20   | 186       |      | 8     | 1.0         | True      |
| 126e8ef0-b816-43ed-bd5f-b1d4e16fdda0 | c2-7.5gb-80   | 7680      | 20   | 80        |      | 2     | 1.0         | False     |
| 2cb70964-721d-47ff-badb-b702898b6fc2 | p8-12gb       | 12288     | 0    | 0         |      | 8     | 1.0         | True      |
| 2e33b8b5-d8d1-4fd8-913c-990f34a89002 | c2-7.5gb-31   | 7680      | 20   | 31        |      | 2     | 1.0         | True      |
| 2ff7463c-dda9-4687-8b7a-80ad3303fd41 | p2-3gb        | 3072      | 0    | 0         |      | 2     | 1.0         | True      |
| 327fa6c5-4ec8-432d-9607-cd7f40252320 | c8-90gb-186   | 92160     | 20   | 186       |      | 8     | 1.0         | True      |
| 39e8550a-c2cf-4094-93c0-fb70b35b6a6c | p1-1.5gb      | 1536      | 0    | 0         |      | 1     | 1.0         | True      |
| 401afec6-e588-454a-9a74-ebf32b64af26 | c4-30gb-180   | 30720     | 20   | 180       |      | 4     | 1.0         | False     |
| 4998f4d2-b664-4d9d-8e0d-2071f3e44b10 | c4-30gb-83    | 30720     | 20   | 83        |      | 4     | 1.0         | True      |
| 4f61f147-353c-4a24-892b-f95a1a523ef6 | c1-7.5gb-30   | 7680      | 20   | 30        |      | 1     | 1.0         | True      |
| 5c86b033-a1d0-4b6a-b1c9-4a57ad84d594 | c8-30gb-380   | 30720     | 20   | 380       |      | 8     | 1.0         | False     |
| 6164f230-4859-4bf5-8f5b-fc450d8a8fb0 | c2-15gb-80    | 15360     | 20   | 80        |      | 2     | 1.0         | False     |
| 64a90d5f-71fc-4644-bc64-f8d907249e35 | c16-60gb-780  | 61440     | 20   | 780       |      | 16    | 1.0         | False     |
| 69174301-2d70-4bc1-9061-66b2eaff5d07 | c4-15gb-180   | 15360     | 20   | 180       |      | 4     | 1.0         | False     |
| 7c7fdfc0-57e6-49e9-bbde-37add33e1681 | c8-60gb-380   | 61440     | 20   | 380       |      | 8     | 1.0         | False     |
| 88e57477-b6a5-412e-85e0-69ff48ceb45c | c4-45gb-180   | 46080     | 20   | 180       |      | 4     | 1.0         | False     |
| 91407374-25de-4c0a-bd76-c0bdaecf47eb | c16-120gb-392 | 122880    | 20   | 392       |      | 16    | 1.0         | True      |
| 9493fdd3-3100-440d-a9a1-020d93701ed2 | c4-15gb-83    | 15360     | 20   | 83        |      | 4     | 1.0         | True      |
| 9cabf7e3-1f74-463c-ab38-d46e7f92d616 | c16-180gb-780 | 184320    | 20   | 780       |      | 16    | 1.0         | False     |
| aa8ca469-e939-40ba-964d-28bfd1c61480 | c2-15gb-31    | 15360     | 20   | 31        |      | 2     | 1.0         | True      |
| ac5155b2-87c8-42ed-9b56-edd00b3880cc | c16-120gb-780 | 122880    | 20   | 780       |      | 16    | 1.0         | False     |
| b64b981a-e832-47e9-903f-fb98cff0579b | c16-60gb-392  | 61440     | 20   | 392       |      | 16    | 1.0         | True      |
| d2d56ca5-511b-4a4b-89eb-1d6f06ee58b1 | c8-30gb-186   | 30720     | 20   | 186       |      | 8     | 1.0         | True      |
| da751037-da00-4eff-bca1-0d21dafaa347 | c4-45gb-83    | 46080     | 20   | 83        |      | 4     | 1.0         | True      |
| df94e28a-8983-4b4a-baa8-ffb824591c23 | c8-90gb-380   | 92160     | 20   | 380       |      | 8     | 1.0         | False     |
+--------------------------------------+---------------+-----------+------+-----------+------+-------+-------------+-----------+
{% endhighlight %}

</div>

Note that ```Disk``` is the size of the root partition in GB. ```Ephemeral``` is an additional (typically large) block device that provides fast temporary storage.

Next, launch an instance:

<div class="shell">

{% highlight bash %}
$ nova boot --flavor c2-7.5gb-80 --image a4728b62-d15f-4e10-8475-1481ea3037d4 --security_groups default --key_name my_key my_centos7_instance
{% endhighlight %}

{% highlight bash %}
+--------------------------------------+----------------------------------------------------+
| Property                             | Value                                              |
+--------------------------------------+----------------------------------------------------+
| OS-DCF:diskConfig                    | MANUAL                                             |
| OS-EXT-AZ:availability_zone          | nova                                               |
| OS-EXT-STS:power_state               | 0                                                  |
| OS-EXT-STS:task_state                | scheduling                                         |
| OS-EXT-STS:vm_state                  | building                                           |
| OS-SRV-USG:launched_at               | -                                                  |
| OS-SRV-USG:terminated_at             | -                                                  |
| accessIPv4                           |                                                    |
| accessIPv6                           |                                                    |
| adminPass                            | 46MVRVJJtEdq                                       |
| config_drive                         |                                                    |
| created                              | 2016-01-21T22:30:49Z                               |
| flavor                               | c2-7.5gb-80 (126e8ef0-b816-43ed-bd5f-b1d4e16fdda0) |
| hostId                               |                                                    |
| id                                   | da131905-3425-4d92-93c3-c9d6cda854b1               |
| image                                | CentOS 7 (a4728b62-d15f-4e10-8475-1481ea3037d4)    |
| key_name                             | my_key                                             |
| metadata                             | {}                                                 |
| name                                 | my_centos7_instance                                |
| os-extended-volumes:volumes_attached | []                                                 |
| progress                             | 0                                                  |
| security_groups                      | default                                            |
| status                               | BUILD                                              |
| tenant_id                            | 259d10c208dc40d198ed7ef200f53259                   |
| updated                              | 2016-01-21T22:30:49Z                               |
| user_id                              | canfarcs                                           |
+--------------------------------------+----------------------------------------------------+
{% endhighlight %}

</div>

where possible image IDs or names can be obtained with ```glance image-list```, security groups with ```nova secgroup-list```, and keypairs with ```nova keypair-list```.

Check the status of running instances:

<div class="shell">

{% highlight bash %}
$ nova list
{% endhighlight %}

{% highlight bash %}
+--------------------------------------+--------------+--------+------------+-------------+-----------------------------------------------+
| ID                                   | Name         | Status | Task State | Power State | Networks                                      |
+--------------------------------------+--------------+--------+------------+-------------+-----------------------------------------------+
| de7afe99-a559-4744-bab7-fbc30e85fcfc | new_instance | ACTIVE | -          | Running     | CANFAROps_network=192.168.20.89               |
+--------------------------------------+--------------+--------+------------+-------------+-----------------------------------------------+
{% endhighlight %}

</div>

### Accessing VM Running Instances

Assign a floating IP to your running VM instance so that you can access it with SSH:
<div class="shell">

{% highlight bash %}
$ nova floating-ip-associate new_instance [floating ip]
{% endhighlight %}

</div>

Available values of ```[floating ip]``` can be listed using ```nova floating-ip-list```. If you wish to disassociate the IP (in order to make it available for another VM), use ```nova floating-ip-disassociate```.

You can then **ssh** to the VM. If you do not know the name of the generic user account into which your SSH key has been injected, initially try to enter as root and it will tell you the correct name:

{% highlight bash %}
$ ssh root@[floating ip]
{% endhighlight %}

<code class="output">
Please login as the user "centos" rather than the user "root".
</code>

<br />


{% highlight bash %}
$ ssh centos@[floating ip]
{% endhighlight %}


### Snapshot a Running VM Instance

You can save a snapshot of a running VM instance. It will produce a new Virtual Machine image reflecting the current state of the instance (execute from outside of the instance):


{% highlight bash %}
$ nova image-create new_instance new_image
{% endhighlight %}


It will then be visible to ```glance image-list``` with the name ```new_image```.

### Shutdown a VM Instance

To shut down the VM instance with the CLI, run:


{% highlight bash %}
$ nova stop new_instance
{% endhighlight %}


{% include backToTop.html %}
