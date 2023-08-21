---
layout: pages_left_nav

namespace: docs.openstack_cloud_portal
lang: en
permalink: /en/docs/openstack_cloud_portal/
---


All the cloud services used by CANFAR are the Digital Research Alliance Canada (DRAC) OpenStack offerings.
We strongly encourage the user to refer to the [Digital Research Alliance Canada cloud documentation](https://docs.alliancecan.ca/wiki/Cloud) for reference.

The Digital Research Alliance Canada allocation resources are currently shared between all CANFAR users. Currently the main difference between the Digital Research Alliance Canada cloud and the CANFAR access are the following:

* access to the cloud portals are with the CADC ```[username]``` and password, not the Digital Research Alliance Canada
* the access is with [arbutus-canfar](https://arbutus-canfar.cloud.computecanada.ca) instead of [arbutus](https://arbutus.cloud.computecanada.ca)
* CANFAR will give you reasonable resources for interactive analysis and very large for batch processing on the clouds.

## Registration and Resource Allocation

You will need to have a CADC account ([register](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/auth/request.html)).

Once registered, send an email to [CANFAR support](mailto:support@canfar.net) and include:
* a CADC account name
* a rough amount of required resources (storage capacity and processing capabilities), and if you need batch processing
* a few sentences describing what you want to do.

Your request will be reviewed and you will be contacted by the CANFAR team which will also take care of your registration to Digital Research Alliance Canada infrastructure.

Once registered, make note of your:
* ```[username]``` is your CADC username
* ```[VOSpace]``` is the short name of the VOSpace you requested access to
* ```[project]``` is the OpenStack project name you requested access to

Below we include a Quick Start tutorial describing a typical workflow using the OpenStack Cloud Services.

## Batch Quick Start

### Introduction

This guide will demonstrate how to create a basic source detection pipeline operating on CFHT Megacam images within the CANFAR Virtual Machine (VM), with fast access to the CADC archive and storage. It will go over the following steps:

* create, configure, and interact with Digital Research Alliance Canada OpenStack cloud, and CANFAR VMs
* access CADC VOSpace storage
* launch jobs running the pipeline installed on the VM with the CANFAR batch system

This guide is mostly geared to do data processing. If you just want to access the regular Digital Research Alliance Canada cloud to build non-batch VMs, we suggest [this guide](https://docs.alliancecan.ca/wiki/Cloud_Quick_Start), which also applies to CANFAR.

### Create a Virtual Machine

To access and manage your VM with OpenStack, we suggest using the web dashboard at Digital Research Alliance Canada. 

* [Log into the dashboard](https://arbutus-canfar.cloud.computecanada.ca). Provide your CADC ```[username]``` and ```[password]```.

Each CANFAR resource allocation corresponds to an OpenStack ```[project]```. A user may be a member of multiple projects, and a project usually has multiple users. A pull-down menu near the top-left allows you to select between the different projects that you are a member of. 

To create a VM, you can go over [these instructions](https://docs.alliancecan.ca/wiki/Creating_a_Linux_VM) which we summarize in the 4 next sections.

#### Import an SSH public key

Access to VMs is facilitated by [SSH key pairs](https://docs.alliancecan.ca/wiki/SSH_Keys) rather than less secure user name / password. A private key resides on your own computer, and the public key is copied to all machines that you wish to connect to.

- If you have not yet created a key pair on your system, run  the `ssh-keygen` command from a terminal on your local machine to generate one, or follow this [documentation](https://docs.alliancecan.ca/wiki/SSH_Keys) for example.
- On the dashboard, click on **Compute**, switch to the **Key Pairs** tab and click on the **Import Key Pair** button (top-right).
- Choose a meaningful name for the key, and then copy and paste the contents of the public key. If you have not renamed your key, it will be on its default location at `$HOME/.ssh/id_rsa.pub` from the machine you plan to ssh from into the **Public Key** window.

#### Allocate a public IP address

You will need to connect to your VM via a public IP.

- Click on the **Floating IPs** tab part of **Network**. If there are no IPs listed, click on the **Allocate IP to Project** button at the top-right.

Each project will typically be given one public IP. If you have already allocated all of your IPs, this button will read "Quota Exceeded".

#### Launch a VM instance

We will now launch a VM. A VM comes with an operating system, and we support two Linux distributions: Ubuntu LTS and RedHat Enterprise Linux clone (Rocky Linux). For this tutorial, we will select Ubuntu 20.04 based VM, with some CANFAR specific pre-installed packages. 

Follow these steps to access and launch those pre-built VMs:

* Switch to the **Compute** tab, then on **Instances**, click on the **Launch Instance** button on the right.
* Fill up the form of your VM:
  * **Details**: choose a meaningful **Instance Name**
  * **Source**: select *Boot Source* as an *Instance Snapshot* and choose **canfar-ubuntu-20.04**. This is especially important to choose an **Image** or **Instance Snaphot** for batch processing. We 
  * **Flavor**: the resources of the VM. ```c2-7.5gb-30``` provides 2 CPU (equivalent), 7.5GB RAM, and a 31 GB *ephemeral disk* that will be used as scratch space. The flavours starting with **p** are persistent VMs, and do not have scratch space.
  * **Key Pair**: ensure that your SSH public key is selected
* Finally, click the **Launch** button.


#### Connect to the VM instance

After launching the VM you are returned to the **Instances** window. You can check the VM status once booted by clicking on its name, wait for the power state to say **Running**.
Before being able to ssh to your instance, you will need to attach the public IP address to it.

* Select **Associate Floating IP** from the pull-down menu on the right of **Create Snapshot** button.
* Select an allocated IP address

Your SSH public key will be injected into the VM under a [generic account](https://docs.alliancecan.ca/wiki/Cloud_Quick_Start#Connecting_to_your_VM_with_SSH). The default username depends on the VM image you selected: an Ubuntu-based VM will have a default ```ubuntu``` user. A Rocky-Linux (open-srouce RedHat) based VM will have ```rocky``` as the default username. This user is not related to your CADC user.

You should be able to access your VM:

<div class="shell">

{% highlight bash %}
ssh ubuntu@[floating ip]
{% endhighlight %}

</div>

Once you are connected, we recommend to create a user on the VM with your CADC ```[username]```. It will likely be easier to manage if you have software that you will install in the home directory. Create a user, using your CADC ```[username]```, with the following command:

<div class="shell">

{% highlight bash %}
sudo canfar_create_user [username]
{% endhighlight %}

</div>

You can now logout from the VM and ssh back in with ```ssh [username]@[floating ip]```, and have the same privileges as the default `ubuntu` user.

### Install software on the VM

The VM operating system has only a minimal set of packages. For this example, we will use:

- the [Source EXtractor](https://sextractor.readthedocs.io/) software, to detect astronomical sources in FITS images, resulting in catalogues of stars and galaxies.
- the [funpack](https://heasarc.gsfc.nasa.gov/fitsio/fpack/) software, a file decompressor. We also need to read FITS images. Most FITS images from CADC come Rice-compressed with an `fz` extension. `SExtractor` only reads uncompressed images, so we also need the `funpack` utility to uncompress the incoming data. In Debian/Ubuntu, the `funpack` executable is included in the package `libcfitsio-bin`.

Let's install them both system wide since they are available in Ubuntu, after a fresh update of the Ubuntu repositories:

<div class="shell">

{% highlight bash %}
sudo apt update -y
sudo apt install -y source-extractor libcfitsio-bin
{% endhighlight %}

</div>

#### Test the Software on the VM instance

We are now ready to do our basic pipeline. Let’s download a FITS image to the scratch space. When we instantiated the VM, we selected a flavour with an ephemeral disk. The disk was automatically mounted on ```/mnt```. We want to access the ephemeral disk as a non-root user. This simple command will create a scratch directory on `/mnt/scratch`, and give the proper permissions:

<div class="shell">

{% highlight bash %}
sudo canfar_setup_scratch
{% endhighlight %}

</div>

Important notes concerning the scratch space:
* You will need to run the ```canfar_setup_scratch``` command every time you launch a new VM instance from OpenStack.
* When the VM runs in batch mode, the scratch directory will be setup automatically in a different directory for each batch job, which is NOT `/mnt/scratch` (see below).

Next, we enter the scratch directory, download an astronomical image from CADC of the CFHT Megaprime there, and detect the sources with `SExtractor`. Here we take the default configuration of `SExtractor` and decide to only output the positions and magnitudes of the detected sources.

<div class="shell">

{% highlight bash %}
cd /mnt/scratch
cp /usr/share/source-extractor/default* .
echo 'NUMBER
MAG_AUTO
X_IMAGE
Y_IMAGE' > default.param
cadcget cadc:CFHT/1056213p.fits.fz
funpack -D 1056213p.fits.fz
source-extractor 1056213p.fits -CATALOG_NAME 1056213p.cat
{% endhighlight %}

</div>

The image `1056213p.fits` is a Multi-Extension FITS file with 36 extensions, each containing data from one CCD from the CFHT Megacam camera. The `cadcget` command downloads the FITS image from CADC and stores it on the current directory and is already installed on the VM (`cadcdata` python module)
The resulting catalogue of detected sources is stored under `1056213p.cat`.

#### Store results on the CANFAR VOSpace

All data stored on ephemeral disk are **wiped out** when the VM instance terminates.
We only want to store the output catalogue `1056213p.cat` at a persistent, externally accessible location. We will use the CADC [VOSpace](/en/docs/storage/) for this purpose. To store files on the VOSpace from a command line, you will use the CADC python VOSpace client (`vos` python module) which is already installed on your VM.

For an automated procedure to access the VOSpace on your behalf, your proxy authorization must be present on the VM. You can accomplish this using a `.netrc` file that contains your CANFAR user name and password, and the command `cadc-get-cert` can obtain an *X509 Proxy Certificate* using that username/password combination without any further user interaction. The commands below will create the file and get a proxy certificate. A proxy certificate is by default valid 10 days.

<div class="shell">

{% highlight bash %}
cadc_dotnetrc # you only need this command once to create the file
cadc-get-cert -n
{% endhighlight %}

</div>
If you use batch, a new proxy certificate will automatically be created and injected into all the VM clones which will be processing at submission time.

Let's check that the VOSpace client works by uploading the output source catalogue:

<div class="shell">

{% highlight bash %}
vcp 1056213p.cat vos:[VOSpace]
{% endhighlight %}

</div>

Verify that the file is properly uploaded by pointing your browser to the [VOSpace browser interface](https://www.canfar.net/storage/list).

#### Snapshot (save) the VM Instance

Now you want to save the VM with your software installed. Return to your browser on the OpenStack dashboard.

* Save the state of your VM by navigating to the **Instances** window of the dashboard. and click on the **Create Snapshot** button to the right of your VM instance's name. After selecting a meaningful name for the snapshot of the VM instance, e.g., ```image-reduction-2023-08-21```, click the **Create Snapshot** button. The VM instance will eventually be saved and listed in the VM **Images** window, and will be available next time you launch an instance of that VM image in a few minutes.

While the system is taking a snapshot of your VM, avoid doing anything on your VM.

```IMPORTANT``` : if you do not create a snapshot of the VM, you will loase all of your work when the VM is deleted. Volume-based VMs do not need snapshots and will persist the files directly on a persistent disk, but Volume-based VM can not be used for batch processing.

If you do not need batch processing, you are done. If you want to use batch, carry on.


### Make a script to automate the  pipeline

Batch jobs in CANFAR are scheduled and launched  with the [HTCondor](http://www.htcondor.org) software. The [cloud scheduler](http://www.cloudscheduler.org) will launch the necessary VM instances, to process the jobs on demand, and HTCondor will launch the jobs on the launched VMs (workers).

Now we want to automate the whole procedure as a batch script. ssh into the CANFAR batch cluster:

<div class="shell">

{% highlight bash %}
ssh [username]@batch.canfar.net
{% endhighlight %}

</div>

We need to recreate and automate the same procedure done interactively. We can simply put all the necessary command into a pipeline script. Paste the following commands into one BASH script named ```~/do_catalogue.bash```:

<div class="shell">

{% highlight bash %}
#!/bin/bash
id=$1
cadcget cadc:CFHT/${id}.fits.fz
funpack -D ${id}.fits.fz
cp /usr/share/source-extractor/default* .
echo 'NUMBER
MAG_AUTO
X_IMAGE
Y_IMAGE' > default.param
source-extractor ${id}.fits -CATALOG_NAME ${id}.cat
vcp ${id}.cat vos:[VOSpace]/
{% endhighlight %}

</div>
The script will repeat the same commands as before with one image observation ID as an argument:
1. download the compressed FITS file corresponding to the ID from CADC
2. uncompress the file
3. detect the sources
4. save the resulting catalogue of detected sources to the VOSpace.

Remember to substitute ```[VOSpace]``` with the VOSPace name that you requested (often this is your ```[username]```).

#### Write a job submission file

We now want to apply this pipeline to a few images. We need to write a submission file to tell the job scheduler to launch all necessary jobs, in this case one per Megacam image. We need to transfer the `do_catalogue.bash` script to a worker VM. The worker VM will be an instance of the frozen snapshot VM image. For each given observation ID, a job will run on the worker. Let's take the following image IDs: 1056215p, 1056216p, 1056217p, and 1056218p. Paste the following text into a submission file with an editor on the batch login node:

<div class="shell">

{% highlight text %}

executable = do_catalogue.bash

output = do_catalogue-$(arguments).out
error  = do_catalogue-$(arguments).err
log    = do_catalogue-$(arguments).log

queue arguments from (
  1056215p
  1056216p
  1056217p
  1056218p
)

{% endhighlight %}

</div>

Let's save the submission file as `do_catalogue.sub`. Each job will execute with an output and an error file. At the end of each job, all the log files will be transferred to the directory on batch.canfar.net where the job was submitted.

#### Submit the batch jobs

We need two authorizations to run the batch jobs:
* to give the scheduler access to launch VM snapshot stored in the [project] space
* to give write access to [VOSpace] to store results

In the home directory on the batch host, there is one or more `*-openrc.sh` file(s), corresponding to the OpenStack projects you belong to. 

Source the OpenStack RC project file, and enter your CADC password. This sets environment variables used by OpenStack (only required once per batch host login session):

<div class="shell">

{% highlight bash %}
. [project]-openrc.sh
{% endhighlight %}

</div>

Now we can submit the jobs to the condor job pool with the following command:

<div class="shell">

{% highlight bash %}
canfar_submit do_catalogue.sub catalogue-software-2023-08-21 c2-7.5gb-30
{% endhighlight %}

</div>

where:
* ```do_catalogue.sub```: is the path of the submission file
* ```image-reduction-2023-08-21```: is the name of the snapshot VM used to install all the software 
* ```c2-7.5gb-30```: is the resource flavour for the VM(s) that will execute the jobs. Resources are visible through the dashboard when [launching an instance](#launch-a-vm-instance), or using the command line ```openstack flavor list```.

After submission, we can check where the jobs stand in the queue:

<div class="shell">

{% highlight bash %}
condor_q
{% endhighlight %}

</div>

Monitoring the queue, we should see your jobs going from idle (I) to running (R). Once no more jobs are in the queue, we can check the logs and output files `105621.*` on the batch host, and check the VOSpace browser that all 4 of the generated catalogues were properly uploaded.

We can also check the status of the VMs and jobs running on the cloud summarizing all users:

<div class="shell">

{% highlight bash %}
condor_q -all
{% endhighlight %}

</div>

If we do need your interactive VM instance anymore, you can terminate it from the OpenStack dashboard, by selecting the VM instance, clicking on **Delete Instances**.
You are done!

## Extra: helpful CANFAR commands and VM maintenance

Once your VM is built, the responsibility is yours to maintain and update software. You may want to run `sudo yum update` or `sudo apt dist-upgrade` to make sure you get the latest security updates from the Linux distributions.

On the CANFAR pre-built VMs (`canfar-ubuntu-20.04` and `canfar-rocky-8`), there are a few scripts to help out with CANFAR related activities, all of them come with a ```--help```:

* ```cadc_cert -u [username]```:  get a CADC proxy certificate by various methods to access CADC VOSpace (legacy script)
* ```cadc_dotnetrc```: update / create a ```${HOME}/.netrc``` file to ease out with CADC VOSpace access
* ```canfar_setup_scratch```: simple script to authorize a scratch space when in interactive mode on ```/mnt/scratch```
* ```canfar_create_user [user]```: create a user with a name ```[user]``` on the VM and propagate ssh public key, and give sudo access
* ```canfar_update```: update all the CANFAR scripts and CADC clients on the VM with the latest versions.

You can find all these commands on ```/usr/local/bin```, or at the [GitHub source](https://github.com/canfar/canfarproc/tree/master/worker/bin).

