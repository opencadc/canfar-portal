---
layout: pages_left_nav

namespace: docs.quick_start
lang: en
permalink: /en/docs/quick_start/
---


## Introduction

This quick start guide will demonstrate how to create a basic source detection pipeline on a CANFAR Virtual Machine (VM). It will go over:

* create, configure, and interact with OpenStack cloud and CANFAR VMs
* access CADC VOSpace storage
* launch batch jobs running the pipeline installed on the VM

This guide is mostly geared to do data processing. If you just want to access the regular Compute Canada cloud to build non-batch VMs, we suggest [this guide](https://docs.computecanada.ca/wiki/Cloud_Quick_Start).

## Registration and Resource Allocation

Before starting this tutorial, you will need to have a CADC account ([register](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/auth/request.html)).

Once registered, send an email to [CANFAR support](mailto:support@canfar.net) and include:
* your CADC account name
* a rough amount of required resources (storage capacity and processing capabilities), and if you need batch processing
* a few sentences describing what you want to do.

Your request will be reviewed and you will be contacted by the CANFAR team which will also take care of your registration to Compute Canada infrastructure.

Once registered, make note of your:
* ```[username]``` is your CADC username
* ```[VOSpace]``` is the short name of the VOSpace you requested access
* ```[project]``` is the OpenStack project name you requested access

## Create a Virtual Machine

To access and manage your VM with OpenStack, we suggest using the  dashboard at Compute Canada. [Log into the dashboard](https://arbutus-canfar.cloud.computecanada.ca). Provide your ```[username]```.

Each resource allocation corresponds to an OpenStack ```[project]```. A user may be a member of multiple projects, and a project usually has multiple users. A pull-down menu near the top-left allows you to select between the different projects that you are a member of. You can go over [these instructions](https://docs.computecanada.ca/wiki/Creating_a_Linux_VM) which we summarize in the 4 next sections.

### Import an ssh public key

Access to VMs is facilitated by [SSH key pairs](https://docs.computecanada.ca/wiki/SSH_Keys) rather than less secure user name / password. A private key resides on your own computer, and the public key is copied to all machines that you wish to connect to.

- If you have not yet created a key pair on your system, run **ssh-keygen** on this local machine to generate one or follow this [documentation](https://docs.computecanada.ca/wiki/SSH_Keys) for example.
- On the dashboard, click on **Compute**, switch to the **Key Pairs** tab and click on the **Import Key Pair** button (top-right).
- Choose a meaningful name for the key, and then copy and paste the contents of `~/.ssh/id_rsa.pub` from the machine you plan to ssh from into the **Public Key** window.

### Allocate a public IP address

You will need to connect to your VM via a public IP.

- Click on the **Floating IPs** tab part of **Network**. If there are no IPs listed, click on the **Allocate IP to Project** button at the top-right.

Each project will typically have one public IP. If you have already allocated all of your IPs, this button will read "Quota Exceeded".

### Launch a VM

We will now launch a VM with Ubuntu 18.04. We support two distributions: Ubuntu LTS and CentOS VMs.

* Switch to the **Compute** tab, then on **Instances**, click on the **Launch Instance** button on the right.
* Fill up the form of your VM:
  * **Details**: choose a meaningful **Instance Name**
  * **Source**: select *Boot Source* as an *Image* and choose in Available: **canfar-ubuntu-18.04**. This is especially important to choose an **Image** or **Instance Snaphot** if you need batch processing.
  * **Flavor**: the resources of the VM. ```c2-7.5gb-31``` provides 2 CPU (equivalent), 7.5GB RAM, and a 31 GB *ephemeral disk* that will be used as scratch space. The flavours starting with `p` do not have scratch space.
  * **Key Pair**: ensure that your public key is selected
* Finally, click the **Launch** button.

### Connect to the VM

After launching the VM you are returned to the **Instances** window. You can check the VM status once booted by clicking on its name, wait for the power state to say **Running**.
Before being able to ssh to your instance, you will need to attach the public IP address to it.

* Select **Associate Floating IP** from the pull-down menu on the right of **Create Snapshot** button.
* Select an allocated IP address

Your ssh public key will be injected into the VM under a [generic account](https://docs.computecanada.ca/wiki/Cloud_Quick_Start#Connecting_to_your_VM_with_SSH) with a username like ```centos```, or ```ubuntu```, depending on the Linux distribution.
Then you should be able to access your VM:

<div class="shell">

{% highlight bash %}
ssh ubuntu@[floating ip]
{% endhighlight %}

</div>


### Install software on the VM

The VM operating system has only a minimal set of packages. For this example, we will use:

- the [SExtractor](http://www.astromatic.net/software/sextractor) package to detect astronomical sources in FITS images and create catalogues of stars and galaxies.
- We also need to read FITS images. Most FITS images from CADC come Rice-compressed with an `fz` extension. SExtractor only reads uncompressed images, so we also need the `funpack` utility to uncompress the incoming data. The `funpack` executable is included in the package `libcfitsio-bin`.

Let's install them both system wide after a fresh update of the Ubuntu repositories:

<div class="shell">

{% highlight bash %}
sudo apt update -y
sudo apt install -y sextractor libcfitsio-bin
{% endhighlight %}

</div>

### Test the Software on the VM

We are now ready to do our basic pipeline. Let’s download a FITS image to our scratch space. When we instantiated the VM we selected a flavour with an ephemeral disk, which was automatically mounted on ```/mnt```. You want to access the ephemeral disk with a non-root user and create a scratch directory:

<div class="shell">

{% highlight bash %}
sudo canfar_setup_scratch
{% endhighlight %}

</div>

Note when the VM runs in batch mode, the scratch directory is setup automatically so you do not need the lines above.

Next, enter the scratch directory, download an astronomical image from CADC of the CFHT Megaprime there, and run SExtractor on it:
Here we take the default configuration of SExtractor and decide to only output the positions and magnitudes of the detected sources.

<div class="shell">

{% highlight bash %}
cd /mnt/scratch
cp /usr/share/sextractor/default* .
echo 'NUMBER
MAG_AUTO
X_IMAGE
Y_IMAGE' > default.param
cadc-data get CFHT 1056213p 
funpack -D 1056213p.fits.fz
sextractor 1056213p.fits -CATALOG_NAME 1056213p.cat
{% endhighlight %}

</div>

The image `1056213p.fits` is a Multi-Extension FITS file with 36 extensions, each containing data from one CCD from the CFHT Megacam camera.
The resulting catalogue is stored under `1056213p.cat`.

### Store results on the CANFAR VOSpace

All data stored on ephemeral disk are **wiped out** when the VM terminates.
We only want to store the output catalogue `1056213p.cat` at a persistent, externally-accessible location. We will use the CADC [VOSpace](/en/docs/storage/) for this purpose. To store files on the VOSpace from a command line, you will use the CADC python VOSpace client which is already installed on your VM.

For an automated procedure to access the VOSpace on your behalf, your proxy authorization must be present on the VM. You can accomplish this using a `.netrc` file that contains your CANFAR user name and password, and the command **getCert** can obtain an *X509 Proxy Certificate* using that username/password combination without any further user interaction. The commands below will create the file and get a proxy certificate.

<div class="shell">

{% highlight bash %}
cadc_dotnetrc -u [username]
getCert
{% endhighlight %}

</div>

Let's check that the VOSpace client works by uploading the output source catalogue:

<div class="shell">

{% highlight bash %}
vcp 1056213p.cat vos:[VOSpace]
{% endhighlight %}

</div>

Verify that the file is properly uploaded by pointing your browser to the [VOSpace browser interface](https://www.canfar.net/storage/list).

### Snapshot (save) the VM Instance

Now you want to save the VM with your software installed. Return to your browser on the OpenStack dashboard.

* Save the state of your VM by navigating to the **Instances** window of the dashboard. and click on the **Create Snapshot** button to the right of your VM instance's name. After selecting a name for the snapshot of the VM instance, e.g., ```quick_start-0.1```, click the **Create Snapshot** button. It will eventually be saved and listed in the VM **Images** window, and will be available next time you launch an instance of that VM image.

While the system is taking a snapshot of your VM, avoid doing anything on your VM.

```IMPORTANT``` : if you do not create a snapshot of the VM, your work of this VM will be lost if the VM is deleted. Volume based VMs will keep your work, but Volume based VM can not be used for batch processing.

If you do not need batch processing, you are done. If you want to use batch, carry on.

## Preparing the VM for Batch Processing

Batch jobs in CANFAR are scheduled and launched with the [HTCondor](http://www.htcondor.org) software. The batch host does not know anything about your VM, so we use the [cloud scheduler](http://www.cloudscheduler.org) which launch the VMs necessary to process the jobs on demand. HTCondor will run the jobs on the launched VMs (workers). Your worker VMs need HTCondor install to tell they are available to run batch jobs. Run this script which will install HTCondor and tune the network on your VM:

<div class="shell">

{% highlight bash %}
sudo canfar_batch_prepare
{% endhighlight %}

</div>

## Make a script to automate your pipeline

Now we want to automate the whole procedure as a batch script. ssh into the CANFAR batch cluster:

<div class="shell">

{% highlight bash %}
ssh [username]@batch.canfar.net
{% endhighlight %}

</div>

Paste the following commands into one BASH script named ```~/do_catalog.bash```:

<div class="shell">

{% highlight bash %}
#!/bin/bash
id=$1
cadc-data get CFHT ${id}
funpack -D ${id}.fits.fz
cp /usr/share/sextractor/default* .
echo 'NUMBER
MAG_AUTO
X_IMAGE
Y_IMAGE' > default.param
sextractor ${id}.fits -CATALOG_NAME ${id}.cat
vcp ${id}.cat vos:[VOSpace]/
{% endhighlight %}

</div>
The script will take one image ID as an argument, download the FITS file corresponding to the ID from CADC, uncompress the file, detect the sources, and save the resulting source catalogue to the VOSpace.

Remember to substitute ```[VOSpace]``` with the VOSPace name that you requested (often this is your ```[username]```).

### Write your batch processing job submission

We now want to apply this pipeline to a few images. Let's now write a submission file to launch the jobs. We need to transfer the `do_catalog.bash` script to the worker VM. The worker VM will be an instance of your snapshot VM image. For each given CADC CFHT file id, a job will run on the worker. Let's take the following image IDs: 1056215p, 1056216p, 1056217p, and 1056218p. Fire up your favorite editor and paste the following text into a submission file:

<div class="shell">

{% highlight text %}

executable = do_catalog.bash

arguments = 1056215p
log = 1056215p.log
output = 1056215p.out
error = 1056215p.err
queue

arguments = 1056216p
log = 1056216p.log
output = 1056216p.out
error = 1056216p.err
queue

arguments = 1056217p
log = 1056217p.log
output = 1056217p.out
error = 1056217p.err
queue

arguments = 1056218p
log = 1056218p.log
output = 1056218p.out
error = 1056218p.err
queue
{% endhighlight %}

</div>

Save the submission file as `quick_start.sub`.

### Submit the batch jobs

You will need two authorizations to run the batch jobs:
* to launch your VM snapshot on your [project]
* to write files your [VOSpace]

Source the OpenStack RC project file, and enter your CANFAR password. This sets environment variables used by OpenStack (only required once per login session):

<div class="shell">

{% highlight bash %}
. [project]-openrc.sh
{% endhighlight %}

    <code class="output">Please enter your OpenStack Password:</code>
</div>

Then create a certificate by running `getCert`. The submission process will propagate your generated certificate to the jobs at the proper locations on the VMs.

You can then submit your jobs to the condor job pool with our wrapper command:

<div class="shell">

{% highlight bash %}
canfar_submit quick_start.sub quick_start-0.1 c2-7.5gb-31
{% endhighlight %}

</div>

where:
* ```quick_star.sub```: is the path of your submission file
* ```quick_start-0.1```: is the name of the snapshot you used during the VM configuration above
* ```c2-7.5gb-31```: is the flavor for the VM(s) that will execute the jobs. If you wish to use a different flavor, they are visible through the dashboard when [launching an instance](#launch-a-vm-instance), or using the command line ```openstack flavor list```.

After submitting, wait a couple of minutes. Check where your jobs stand in the queue:

<div class="shell">

{% highlight bash %}
condor_q [username]
{% endhighlight %}

</div>

Monitoring the queue, you should see your jobs going from idle (I) to running (R). Once you have no more jobs in the queue, check the logs and output files `105621.*` on the batch host, and check on your VOSpace browser that you have all 4 of the generated catalogues properly uploaded.

You can also check the status of the VMs and jobs running on the cloud summarizing all users:

<div class="shell">

{% highlight bash %}
condor_status -submitter
{% endhighlight %}

</div>

If you do need your VM anymore, you can terminate it from the OpenStack dashboard.
You are done!

## Extra: helpful CANFAR commands and VM maintenance

Once your VM is built, the responsibility is yours to maintain and update software. You may want to run `sudo yum update` or `sudo apt dist-upgrade` to make sure you get the latest security updates from the Linux distributions.

There are a few scripts to help out with CANFAR related activities, all of them come with a ```--help```:

* ```cadc_cert -u [username]```: try to get a CADC proxy certificate by various methods to access CADC VOSpace
* ```cadc_dotnetrc [username]```: update / create a ```${HOME}/.netrc``` file to ease out with VOSpace access
* ```canfar_batch_prepare```: prepare a VM for batch by installing HTCondor and network tuning
* ```canfar_setup_scratch```: simple script to authorize a scratch space when in interactive mode on ```/mnt/scratch```
* ```canfar_create_user [user]```: create a user with a name ```[user]``` on the VM and propagate ssh public key
* ```canfar_update```: update all the CANFAR scripts and CADC clients on the VM

You can find all these commands on ```/usr/local/bin```, or at the [GitHub](https://github.com/canfar/canfarproc/tree/master/worker/bin) source.

