---
layout: pages_left_nav

namespace: docs.storage
lang: en
permalink: /en/docs/storage/
---

## Introduction

VOSpace is the CANFAR storage system , an implementation of	the [Virtual Observatory Specification](http://www.ivoa.net/Documents/VOSpace/).
It is intended to be used for storing the output of the CANFAR processing system and also for sharing files between members of a collaboration.
If the data you want to process is not already on a CADC archive, you can stage it on a VOSpace for further processing. Files in VOSpace are mirrored in four physical locations, so they are secure against disk failure.

You will need to [register](http://apps.canfar.net/canfar/auth/request.html).

There are two ways to interact with VOspace. The first is with your browser via the [web user interface](http://apps.canfar.net/storage/list).
The web interface is familiar for most people to use and interactive.
To access your VOSpace in scripts, the Python based [vos](https://pypi.python.org/pypi/vos) modules and command line clients are available.
Some users might also find the VOSpace filesystem [vofs](https://pypi.python.org/pypi/vofs), the FS view is based on FUSE and not recommended for serious data processing, but does provide a convenient interactive interface for exploring a respository.

## The web user interface

The web user interface should be fairly easy to use. The only part that is not completely obvious to a new user might be the permissions system.

- To upload a file, click on **Upload File**. In the pop-up, click on **Browse**. Navigate to the file you want to upload and click on it (this behavior is slightly browser dependent). Click **Upload**. After a pause (expect about 2 seconds + 1 second per MB of file size) the screen will refresh and your file will uploaded.
- To download one file, click on a link and save it like you would a normal link.
- To download multiple files, tick off on the appropriate boxes on the leftmost column, or click on the top box to select all the files. Click on **Download**. You will be redirected to CADC download manager. You can now use a Java interface to download files simultaneously.
- To delete files, tick off their boxes and click on **Delete**.
- To set permissions on files tick off their boxes and click on **Set Permissions**.

## The *vos* Python module and *nix command line client

The VOspace can also be accessed via some commands on a terminal or a script. They are part of the [vos](https://github.com/canfar/vos) command line client.

### Installation

#### CANFAR computers and VMs

The latest version of the vos command line client should be already installed on the CANFAR login host and all the template VMs. If not, either file a bug. You can also install it yourself following the docs below.

#### Python

For Python we recommend that users download and install the [Anaconda](https://www.anaconda.com/download/#download) Python distribution.  The `vos` and `vofs` packages have been extensively tested with this variant of python.  Regardless, you will need a least Python 2.7.2.

#### PyPI based install.

The `vos` command line client is most likely not part of any Linux distribution packages, but it is part of [PyPi](https://pypi.python.org/pypi/vos). You then to install a Python installer such as PIP or easy_install. It is usually called `pip` or `python-pip` depending on your distribution. Example on Ubuntu:
Once you have a recent version of Python installed the `pip` tool is the most direct way to install `vos`.


<div class="shell">

{% highlight bash %}
**If you have root or sudo access:**
sudo pip install -U vos

**If you don't have root or sudo access (but you still need pip):**
pip install --user -U vos
export PATH="${HOME}/.local/bin:${PATH}"
{% endhighlight %}
</div>

If you don't have `pip` installed with your Python distrobution you can attempt to use easy_install:

<div class="shell">

{% highlight bash %}
sudo easy_install -U vos
{% endhighlight %}

</div>

#### OS-X

As with Linux, we recommend installing a non-system version of Python.
[Anaconda](http://anaconda.org) is recommended, and [astroconda](https://astroconda.readthedocs.io/en/latest/#) is particularly useful.
Once you have a working version of Python installed you can install **vos** using pip.

<div class="shell">
{% highlight bash %}
pip install vos -U
{% endhighlight %}
</div>

### Using the client command line tools (recommended)

Try the following commands, substituting your CANFAR VOSpace in for VOSPACE (most CANFAR users have VOSpace that is the same name as their CANFAR user name. There are also project VOSpaces):

<div class="shell">

{% highlight bash %}
# lists the contents to the root directory of VOSPACE
vls vos:VOSPACE

# copies the bar file to the root node of VOSPACE
vcp ${HOME}/bar vos:VOSPACE

# wildcards also work
vcp vos:VOSPACE/foo/*.txt .

# Our you can do FITS cutouts at the service side
vcp vos:VOSPACE/image.fits[1:100,1:100] .

# removes the bar file from VOSPACE
vrm vos:VOSPACE/foo

# creates a new container node (directory) called foo in VOSPACE
vmkdir vos:VOSPACE/bar

# moves the file bar into the container node foo
vmv vos:VOSPACE/bar vos:VOSPACE/foo/

# changes the name of file bar to bar2 on the VOSpace
vmv vos:VOSPACE/foo/bar vos:VOSPACE/foo/bar2

# provide group write permission on a VOSpace location (can be a dirtory or file). Can due up-to 4 groups
vchmod g+w vos:VOSPACE/foo/bar.txt 'GROUP1, GROUP2, GROUP3'

# For a list of GROUP names visit the [Group Managemnet Service](http://www.canfar.phys.uvic.ca/canfar/groups/)
{% endhighlight %}

</div>

Details on these commands can be found via the `--help` option, e.g. `vls --help`. And if you want to see a more verbose output, try `vls -v vos:USER`.  Currently the following commands are defined: `vcat` `vchmod` `vcp` `vln` `vlock` `vls` `vmkdir` `vmv` `vrm` `vrmdir` `vsync`  `vtag`

### Using the **vos** python module directly

There is documentation built into the libary `pydoc vos`.  Here we provide a very basic example usage.

<div class="shell">
{% highlight bash %}
python
>>> from vos import Client
>>> directory_listing = Client().listdir('vos:MyVOSpace')
>>> Client().copy('vos:MyVOSpace/Filename', '/local/filename')
{% endhighlight %}
</div>


## The VOSpace FUSE based file system

One can also access to VOSpace as a filesystem using [vofs](https://pypi.python.org/pypi/vofs).
This technique uses a [FUSE](http://en.wikipedia.org/wiki/Filesystem_in_Userspace) layer between file-system actions and the VOSpace storage system. Using **vofs** makes your VOSpace appear like a regular filesystem.

**vofs is not recommended for batch processing or i/o heavy applications**

### Installation

First, follow the instructions for installing `vos`.  Then follow the instructions below.

The `vofs` python module is not part of any distribution packages, but it is part of [PyPi](https://pypi.python.org/pypi/vofs).

#### Linux

* On some ditros (RHEL 5, CentOS 5, Scientific Linux 5) you may need to add the fuse library:

<div class="shell">

{% highlight bash %}
sudo yum install fuse fuse-devel
{% endhighlight %}

</div>

* On all distros you will also need to add your accout to the 'fuse' group of users, to be allowed to make filesystem mounts work:

<div class="shell">

{% highlight bash %}
sudo /usr/sbin/usermod -a  -G fuse `whoami`
{% endhighlight %}

</div>


* Then instally the **vofs** python module

**If you have root or sudo access:**

<div class="shell">

{% highlight bash %}
sudo pip install -U vofs
{% endhighlight %}

</div>

**If you don't have root or sudo access (but you still need pip):**

<div class="shell">

{% highlight bash %}
pip install --user -U vofs
export PATH="${HOME}/.local/bin:${PATH}"
{% endhighlight %}

</div>


##### OS-X

* Install [OSX-FUSE](http://osxfuse.github.com/) first (you will need to install this package in 'MacFUSE Compatibility' mode, there is a selection box for this during the install).

* Install the `vofs` python package:

<div class="shell">

{% highlight bash %}
sudo pip install vofs
{% endhighlight %}

</div>

* On some OS-X installations the mountvofs command will result in an error like 'libfuse.dylib' not found. Setting the environment variable `DYLD_FALLBACK_LIBRARY_PATH` can help resolve this issue:

<div class="shell">

{% highlight bash %}
export DYLD_FALLBACK_LIBRARY_PATH=/usr/local/lib
{% endhighlight %}

</div>


#### Usage

* Mount all available VOSpaces:

<div class="shell">

{% highlight bash %}
mountvofs
{% endhighlight %}

</div>

Now looking in `/tmp/vospace` you should see a listing of all available VOSpaces that you have read access.

* Unmount the VOSpace:

<div class="shell">

{% highlight bash %}
fusermount -u /tmp/vospace   # Linux
umount /tmp/vospace          # OS-X
{% endhighlight %}

</div>


* Mount a specific VOSpace:

<div class="shell">

{% highlight bash %}
mountvofs --vospace vos:USER --mountpoint /path/to/a/directory
{% endhighlight %}

</div>

The `mountvofs` command creates a cache directory where local copies of files from the VOSpace are kept, as needed. If the cached version is older than the copy on VOSpace then a new version is pulled. You can specify the size of the cache (default is 50 GBytes) and the location (default is `${HOME}/vos:USER`) on the command line.

When a file is opened in a mounted directory, mountvofs gets the remote copy from VOspace, if the local copy is out of date. When the file is written to disk and closed, the VOSpace file system puts the file back into VOspace.  With most science software, these operations typically occur rarely and the illusion of a local disk is maintained.  Most editors, however, tend to write temporary versions of a file frequently.  In this case, the file is frequently written to VOspace. Performance may suffer in this case, or not even being compatible with the application.

* Options

There are many options that can help improve your vofs experience (in particular vofs is most useful in --readonly mode).
To see all the possible options use the --help flag.

<div class="shell">

{% highlight bash %}
mountvofs --help
{% endhighlight %}

</div>


### Retrieving your CANFAR X509 certificates

To access a VOSpace, the command line client needs a certificate. These certificates are created for you when you request an account, and you can get a short-lived proxy of this certificate to access your data with the "getCert" command line, distributed with the vos client:

<div class="shell">

{% highlight bash %}
getCert
{% endhighlight %}

</div>

In batch processing, you might want to use the getCert at the start of every job. To avoid interactivity asking for your CANFAR username/password, add a `$HOME/.netrc` file containing these lines:

<div class="shell">

{% highlight bash %}
machine www.canfar.phys.uvic.ca USER password PASSWORD
{% endhighlight %}
and do:
{% highlight bash %}
chmod 600 $HOME/.netrc
{% endhighlight %}
</div>

WARNING: this is not a fully secure solution.
