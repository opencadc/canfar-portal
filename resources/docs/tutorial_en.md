---
layout: pages_left_nav

namespace: resources.docs.tutorial
lang: en
permalink: /en/resources/docs/tutorial
---

# Processing Tutorial for CANFAR

<div class="span-4 module-table-contents">
	<h2>Table of contents</h2>
  <ol class="column-2">
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#interactive-virtual-machine">Interactive Virtual Machine</a></li>
    <li><a href="#batch-processing">Batch Processing</a></li>
    <li><a href="#notes">Notes</a></li>
  </ol>
</div>
<div class="clear"></div>

## Introduction

Before starting the tutorial, you will need to [register](http://apps.canfar.net/canfar/login.html) to CANFAR. The CANFAR team will take care of your registration to Compute Canada infrastructure.

This tutorial demonstrates how to:

* create, configure, and interact with Virtual Machines (VMs) using the graphical interface
* launch batch processing jobs from the CANFAR batch host, using VMs created in the previous step.

{% include backToTop.html %}

## Interactive Virtual Machine

To manage the VMs with OpenStack, we suggest using the  dashboard at Compute Canada. [Log into the dashboard](https://west.cloud.computecanada.ca). Provide your CANFAR username, adding a ```-canfar``` suffix, e.g, ```janesmith-canfar```, and your usual CANFAR password. We will refer the CANFAR username (excluding the ```-canfar``` suffix which is only used for logging into the dashboard) as ```[username]``` throughout this document.

Each resource allocation corresponds to an OpenStack **tenant** or **project** (these two names are used interchangeably). A user may be a member of multiple tenants, and a tenant usually has multiple users. A pull-down menu near the top-left allows you to select between the different tenants that you are a member of.

### Allow ssh access to your VM

* Click on **Access & Security** (left column of page), and then the **Security Groups** tab. 
* Click on the **Manage Rules** button next to the default group. If you see a rule with **Ingress** direction, **22(SSH)** Port Range and **0.0.0.0/0 (CIDR)** , then that means someone in your tenant already  opened the ssh port for you. If you don't see it, add a new rule following step.
* Click on the **+ Add Rule** button near the top-right. Select **SSH** at the bottom of the **Rule** pull-down menu, and then click on **Add** at the bottom-right. **This operation is only required once for the initial setup of the tenant**.

### Import an ssh public key

Access to VMs is facilitated by SSH key pairs rather than less secure user name / password. A private key resides on your own computer, and the public key is copied to all machines that you wish to connect to. 

* If you have not yet created a key pair on your system, run **ssh-keygen** on this local machine to generate one or follow this [documentation](https://help.github.com/articles/generating-ssh-keys/) for example.
* Click on **Access & Security**, switch to the **Key Pairs** tab and click on the **Import Key Pair** button at the top-right. 
* Choose a meaningful name for the key, and then copy and paste the contents of ```~/.ssh/id_rsa.pub``` from the machine you plan to ssh from into the **Public Key** window. 

### Allocate a public IP address 

You will need to connect to your VM via a public IP. 

* Click on the **Floating IPs** tab. If there are no IPs listed, click on the **Allocate IP to Project** button at the top-right. 

Each tenant/project will typically have one public IP. If you have already allocated all of your IPs, this button will read "Quota Exceeded".

### Launch a VM

We will now launch a VM with Ubuntu 16.04.

* Switch to the **Images** window (left-hand column), and then click on the **Public** button at top right (it might be already selected.
* For this tutorial, select ```ubuntu-server-16.04-amd64``` and click on the **Launch Instance** button on the right.
* In the **Details** tab choose a meaningful **Instance Name**. **Flavor** is the hardware profile for the VM. ```c2-7.5gb-80``` provides the minimal requirements of 2 cores, 7.5GB or RAM for most VMs. Note that it provides an 80 GB *ephemeral disk* that will be used as scratch space for batch processing. **Availability Zone** should be left empty, and **Instance Count** 1 for this tutorial. 
* In the **Access & Security** tab ensure that your public key is selected, and the ```default``` security group (with ssh rule added) is selected.
* Finally, click the **Launch** button.

### Connect to the VM

After launching the VM you are returned to the **Instances** window. You can check the VM status once booted by clicking on its name (the **Console** tab of this window provides a basic console in which you can monitor the boot process).
Before being able to ssh to your instance, you will need to attach the public IP address to it. 

* Select **Associate Floating IP** from the **More** pull-down menu. 
* Select the address that was allocated and the new VM instance in the **Port to be associated** menu, and click on **Associate**.

Your ssh public key will have been injected into a **generic account** with a name like ```centos```, or ```ubuntu```, depending on the Linux distribution. To discover the name of this account, first attempt to connect as root:

<div class="shell">

{% highlight bash %}
$ ssh root@[floating ip]
{% endhighlight %}

<code class="output">
Please login as the user "ubuntu" rather than the user "root".
</code>
</div>

<br />

<div class="shell">

{% highlight bash %}
$ ssh ubuntu@[floating ip]
{% endhighlight %}

</div>

### Create a user on the VM

You might need to create a different user than the default one, and for batch processing to work, it is presently necessary for you to create a user on the VM with your CANFAR username. You can use a wrapper script for this:

<div class="shell">

{% highlight bash %}
$ curl https://raw.githubusercontent.com/canfar/openstack-sandbox/master/scripts/canfar_create_user.bash -o canfar_create_user.bash
$ sudo bash canfar_create_user.bash [username]
{% endhighlight %}

</div>

Now, exit the VM, and re-connect with your CANFAR username instead of the standard ubuntu username:

<div class="shell">

{% highlight bash %}
$ exit
$ ssh [username]@[floating_ip]
{% endhighlight %}

</div>

### Install software on the VM

The VM operating system has only a minimal set of packages. For this tutorial, we will use:

*  the [SExtractor](http://www.astromatic.net/software/sextractor) package to create catalogues of stars and galaxies. 
* We also need to read FITS images. Most FITS images from CADC come Rice-compressed with an `fz` extension. SExtractor only reads uncompressed images, so we also need the ```funpack``` utility to uncompress the incoming data. The ```funpack``` executable is included in the package ```libcfitsio-bin```.

Let's install them both system wide after a fresh update of the Ubuntu repositories:

<div class="shell">

{% highlight bash %}
$ sudo apt  update -y
$ sudo apt install -y sextractor libcfitsio-bin
{% endhighlight %}

### Test the Software on the VM

We are now ready to do a simple test. Let’s download a FITS image to our scratch space. When we instantiated the VM we chose a flavour with an ephemeral disk. First, execute the following script to mount this device at `/ephemeral` and create a work directory to mimic the batch processing environment (note that this will be done automatically for batch jobs):

<div class="shell">

{% highlight bash %}
$ curl https://raw.githubusercontent.com/canfar/openstack-sandbox/master/scripts/canfar_mount_ephemeral.bash -o canfar_mount_ephemeral.bash
$ sudo bash canfar_mount_ephemeral.bash
$ sudo mkdir /ephemeral/work
$ sudo chown [username]:[username] /ephemeral/work
{% endhighlight %}

</div>

Next, enter the directory, copy an astronomical image there, and run SExtractor on it:

<div class="shell">

{% highlight bash %}
$ cd /ephemeral/work
$ cp /usr/share/sextractor/default* .
$ rm default.param
$ echo 'NUMBER
MAG_AUTO
X_IMAGE
Y_IMAGE' > default.param
$ curl -L http://www.canfar.phys.uvic.ca/data/pub/CFHT/1056213p | funpack -O 1056213p.fits -
$ sextractor 1056213p.fits -CATALOG_NAME 1056213p.cat
{% endhighlight %}

</div>

The image `1056213p.fits` is a Multi-Extension FITS file with 36 extensions, each containing data from one CCD from the CFHT Megacam camera.

### Store the results on the CANFAR VOSpace

All data stored on the VM and ephemeral disk since the last time it was saved are normally **wiped out** when the VM shuts down). We will use the [CANFAR VOSpace](/docs/vospace/) to store the result.
We want to store the output catalogue `1056213p.cat` at a persistent, externally-accessible location. We will use the CANFAR VOSpace for this purpose. To store anything on the CANFAR VOSpace from a command line, you will need the CANFAR VOSpace client. 

<div class="shell">

{% highlight bash %}
$ sudo apt install -y python-pip
$ sudo pip install vos

{% endhighlight %}

</div>

 For an automated procedure to access VOSpace on your behalf, your proxy authorization must be present on the VM. You can accomplish this using a `.netrc` file that contains your CANFAR user name and password, and the command **getCert** can obtain an *X509 Proxy Certificate* using that username/password combination without any further user interaction. The commands below will create the file and install the VOSpace utilities.

<div class="shell">

{% highlight bash %}
$ echo "machine www.canfar.phys.uvic.ca login [username] password [password]" > ~/.netrc
$ chmod 600 ~/.netrc
$ getCert
{% endhighlight %}

</div>

Let's check that the VOSpace client works by copying the results to your VOSpace:

<div class="shell">

{% highlight bash %}
$ vcp 1056213p.cat vos:[username]
{% endhighlight %}

</div>

Verify that the file is properly uploaded by pointing your browser to the [VOSpace browser interface](http://www.canfar.phys.uvic.ca/vosui).

### Write a script that does all the above

Now we want to automate the whole procedure above in a single script, in preparation for batch processing. Paste the following commands into one BASH script named ```~/docatalog.bash``` on your VM:

<div class="shell">

{% highlight bash %}
#!/bin/bash
source /home/[username]/.bashrc
curl -L http://www.canfar.phys.uvic.ca/data/pub/CFHT/${1} | funpack -O ${1}.fits -
cp /usr/share/sextractor/default* .
echo 'NUMBER
MAG_AUTO
X_IMAGE
Y_IMAGE' > default.param
sextractor ${1}.fits -CATALOG_NAME ${1}.cat
getCert
vcp ${1}.cat vos:[username]
{% endhighlight %}

</div>

Remember to substitute [username] with your CANFAR user account.

This script runs all the commands, one after the other, and takes only one parameter represented by by the shell variable `${1}`, the file ID of the CFHT exposure. Save your script and set it as executable:

<div class="shell">

{% highlight bash %}
$ chmod +x ~/mytutorial.bash
{% endhighlight %}

</div>

Now let's test the newly created script with a different file ID. The ```docatalog.bash``` script will run on the local directory where it is launched from. Let's emulate a batch job and launch it from the ephemeral disk:

<div class="shell">

{% highlight bash %}
$ cd /ephemeral/work
$ ~/docatalog.bash 1056214p
{% endhighlight %}

</div>

Just as we did in the previous manual test, verify the output, and check with the VOSpace web interface that the catalogue has been uploaded.

Finally, make a copy of the script on your local machine so that it will be available for submitting batch jobs once the VM is shut down, e.g.,

<div class="shell">

{% highlight bash %}
$ scp [username]@[floating_ip]:docatalog.bash .
{% endhighlight %}

</div>

### Install HTCondor for Batch

Batch jobs are scheduled using a software package called [HTCondor](http://www.htcondor.org). HTCondor will dynamically launch jobs on the VMs (workers), connecting to the batch processing head node (the central manager). In order to install HTCondor (which provides a minimal HTCondor daemon to execute jobs) run this script on your VM instance:

<div class="shell">

{% highlight bash %}
$ curl https://raw.githubusercontent.com/canfar/openstack-sandbox/master/vm_config/canfar_batch_setup.bash -o canfar_batch_setup.bash
$ sudo bash canfar_batch_setup.bash
{% endhighlight %}

</div>

### Snapshot (save) the VM Instance

Now we want to save our work. Return to your browser on the OpenStack dashboard.

* Save the state of your VM by navigating to the **Instances** window of the dashboard, and click on the **Create Snapshot** button to the right of your VM instance's name. After selecting a name for the snapshot of the VM instance, e.g., ```my_vm_image```, click the **Create Snapshot** button. It will eventually be saved and listed in the VM **Images** window, and will be available next time you launch an instance of that VM image.

### Shutdown the VM Instance

* In the **Instances** window, select ```Terminate Instance``` in the **More** pull-down menu, and confirm.

{% include backToTop.html %}

## Batch Processing

We are now are ready to launch batch processing jobs creating catalogues of many CFHT Megacam images and uploading the catalogues to VOSpace.

### Write your batch processing job submission

Assuming you have the `docatalog.bash` script written above on your local desktop, copy it to the CANFAR batch host, and then log into the batch host:

<div class="shell">

{% highlight bash %}
$ scp docatalog.bash [username]@batch.canfar.net:
$ ssh [username]@batch.canfar.net
{% endhighlight %}

</div>

Let's write a submission file that will transfer the `docatalog.bash` script to the execution host. The execution host will be an instance of your snapshot VM image with 4 cores, and for each given CADC CFHT file id, will run a job on one of the core. The job will consist of running your script for 4 CFHT images with the file IDs 1056215p, 1056216p, 1056217p, and 1056218p. For this tutorial you will modify the configuration file listed below. Fire up your favorite editor and paste the following text into a submission file:

<div class="shell">

{% highlight text %}
Universe   = vanilla
should_transfer_files = YES
when_to_transfer_output = ON_EXIT_OR_EVICT
environment = "HOME=/home/[username]"
RunAsOwner = True

transfer_output_files = /dev/null

Executable = docatalog.bash

Arguments = 1056215p
Log = 1056215p.log
Output = 1056215p.out
Error = 1056215p.err
Queue

Arguments = 1056216p
Log = 1056216p.log
Output = 1056216p.out
Error = 1056216p.err
Queue

Arguments = 1056217p
Log = 1056217p.log
Output = 1056217p.out
Error = 1056217p.err
Queue

Arguments = 1056218p
Log = 1056218p.log
Output = 1056218p.out
Error = 1056218p.err
Queue
{% endhighlight %}

</div>

Again, be sure to substitue the correct value for `[username]`. It is important to set this ```HOME``` environment variable so that the running job will be able to locate the ```.netrc``` file with VOSpace credentials.

Save the submission file as `mytutorial.sub`.

### Launch the batch jobs

Source the OpenStack RC tenant file, and enter your CANFAR password. This sets environment variables used by OpenStack (only required once per login session):

<div class="shell">

{% highlight bash %}
$ . canfar-[tenant]-openrc.sh
{% endhighlight %}

<code class="output">
Please enter your OpenStack Password:
</code>
</div>

You can then submit your jobs to the condor job pool:

<div class="shell">

{% highlight bash %}
$ canfar_submit mytutorial.sub my_vm_image c4-15gb-83
{% endhighlight %}

</div>

```my_vm_image``` is the name of the snapshot you used during the VM configuration above, and ```c4-15gb-83``` is the flavor for the VM(s) that will execute the jobs. If you wish to use a different flavor, they are visible through the dashboard when [launching an instance](#launch-a-vm-instance), or using the [nova command-line client](../cli/#launch-the-instance).

After submitting, wait a couple of minutes. Check where your jobs stand in the queue:

<div class="shell">

{% highlight bash %}
$ condor_q [username]
{% endhighlight %}

</div>

Check the status of the VMs and jobs running on the cloud:

<div class="shell">

{% highlight bash %}
$ condor_status -submitter
{% endhighlight %}

</div>

Once you have no more jobs in the queue, check the logs and output files `mytutorial.*` on the batch host, and check on your VOSpace browser. All 4 of the generated catalogues should have been uploaded.

You are done!

{% include backToTop.html %}


{% include backToTop.html %}
