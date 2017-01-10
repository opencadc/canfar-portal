---
layout: pages_left_nav

namespace: resources.services.storage
lang: en
permalink: /en/resources/docs/storage/
---

## Introduction

VOSpace is the CANFAR storage system , an implementation of	the [Virtual Observatory Specification](http://www.ivoa.net/Documents/VOSpace/). It is intended to be used for storing the output of the CANFAR processing system and also for sharing files between members of a collaboration. If the data you want to process is not already on a CADC archive, you can stage it on a VOSpace for further processing. Files in VOSpace are mirrored in four physical locations, so they are secure against disk failure.

You will need to [register](http://apps.canfar.net/canfar/login.html).

There are two ways to interact with VOspace. The first is with your browser via the web user interface. The web interface is familiar for most people to use and interactive. To access your VOSpace in scripts, a command line client is available.

## The web user interface

The web user interface should be fairly easy to use. The only part that is not completely obvious to a new user might be the permissions system.

- To upload a file, click on **Upload File**. In the pop-up, click on **Browse**. Navigate to the file you want to upload and click on it (this behavior is slightly browser dependent). Click **Upload**. After a pause (expect about 2 seconds + 1 second per MB of file size) the screen will refresh and your file will uploaded.
- To download one file, click on a link and save it like you would a normal link.
- To download multiple files, tick off on the appropriate boxes on the leftmost column, or click on the top box to select all the files. Click on **Download**. You will be redirected to CADC download manager. You can now use a Java interface to download files simultaneously.
- To delete files, tick off their boxes and click on **Delete**.
- To set permissions on files tick off their boxes and click on **Set Permissions**.

## The command line client

The VOspace can also be accessed via some commands on a terminal or a script. They are part of the [vos](https://github.com/canfar/vos) command line client.

### Installation

#### CANFAR computers and VMs

The latest version of the vos command line client should be already installed on the CANFAR login host and all the template VMs. If not, either file a bug. You can also install it yourself following the docs below.

#### Linux based systems (fairly recent)

The `vos` command line client is most likely not part of any Linux distribution packages, but it is part of [PyPi](https://pypi.python.org/pypi/vos). You then to install a Python installer such as PIP or easy_install. It is usually called `pip` or `python-pip` depending on your distribution. Example on Ubuntu:

<div class="shell">

{% highlight bash %}
# If you have root or sudo access:
$ sudo apt install python-pip
$ sudo pip install -U vos

# If you don't have root or sudo access (but you still need pip):
$ pip install --user -U vos
$ export PATH="${HOME}/.local/bin:${PATH}"

{% endhighlight %}

</div>

#### RHEL 5 / CentOS 5 / Scientific Linux 5

The default Python version on these antique distributions is Python 2.4, so you need to install dependencies and Python 2.6:

<div class="shell">

{% highlight bash %}
$ sudo yum install python26 python26-distribute fuse fuse-devel
$ sudo /usr/sbin/usermod -a  -G fuse `whoami`
{% endhighlight %}

</div>

Then install or update the vos client on Python 2.6:

<div class="shell">

{% highlight bash %}
$ sudo easy_install-2.6 -U vos
{% endhighlight %}

</div>

#### OS-X

You will need to install [OSX-FUSE](http://osxfuse.github.com/ OSX-FUSE) first (you will need to install this package in 'MacFUSE Compatibility' mode, there is a selection box for this during the install) and then follow the instructions for installing the mountvofs python package (see below).

<div class="shell">

{% highlight bash %}
$ sudo easy_install vos
{% endhighlight %}

</div>

On some OS-X installations the mountvofs command will result in an error like 'libfuse.dylib' not found. Setting the environment variable `DYLD_FALLBACK_LIBRARY_PATH` can help resolve this issue:

<div class="shell">

{% highlight bash %}
$ export DYLD_FALLBACK_LIBRARY_PATH=/usr/local/lib
{% endhighlight %}

</div>

### Using the VOSpace client command line tools (recommended)

Try the following commands, substituting your CANFAR VOSpace in for VOSPACE (most CANFAR users have VOSpace that is the same name as their CANFAR user name. There are also project VOSpaces):

<div class="shell">

{% highlight bash %}
# lists the contents to the root directory of VOSPACE
$ vls vos:VOSPACE

# copies the bar file to the root node of VOSPACE
$ vcp ${HOME}/bar vos:VOSPACE

# wildcards also work
$ vcp vos:VOSPACE/foo/*.txt .

# Our you can do FITS cutouts at the service side
$ vcp vos:VOSPACE/image.fits[1:100,1:100] .

# removes the bar file from VOSPACE
$ vrm vos:VOSPACE/foo

# creates a new container node (directory) called foo in VOSPACE
$ vmkdir vos:VOSPACE/bar

# moves the file bar into the container node foo
$ vmv vos:VOSPACE/bar vos:VOSPACE/foo/

# changes the name of file bar to bar2 on the VOSpace
$ vmv vos:VOSPACE/foo/bar vos:VOSPACE/foo/bar2

# provide group write permission on a VOSpace location (can be a dirtory or file). Can due up-to 4 groups
$ vchmod g+w vos:VOSPACE/foo/bar.txt 'GROUP1, GROUP2, GROUP3'

# For a list of GROUP names visit the [Group Managemnet Service](http://www.canfar.phys.uvic.ca/canfar/groups/)
{% endhighlight %}

</div>

Details on these commands can be found via the `--help` option, e.g. `vls --help`. And if you want to see a more verbose output, try `vls -v vos:USER`.  Currently the following commands are defined: `vcat` `vchmod` `vcp` `vln` `vlock` `vls` `vmkdir` `vmv` `vrm` `vrmdir` `vsync`  `vtag`

### Using the VOSpace FUSE file system (experimental)

One can also access to VOSpace as a filesystem. This technique uses a [FUSE](http://en.wikipedia.org/wiki/Filesystem_in_Userspace) layer between file-system actions and the VOSpace storage system. Using the VOFS makes your VOSpace appear like a regular filesystem.

To mount all available VOSpaces use the command:

<div class="shell">

{% highlight bash %}
$ mountvofs
{% endhighlight %}

</div>

Now looking in `/tmp/vospace` you should see a listing of all available VOSpaces that you have read access.

To mount a specific VOSpace use commands like:

<div class="shell">

{% highlight bash %}
$ mountvofs --vospace vos:USER --mountpoint /path/to/a/directory
{% endhighlight %}

</div>


The `mountvofs` command creates a cache directory where local copies of files from the VOSpace are kept, as needed. If the cached version is older than the copy on VOSpace then a new version is pulled. You can specify the size of the cache (default is 50 GBytes) and the location (default is `${HOME}/vos:USER`) on the command line.

When a file is opened in a mounted directory, mountvofs gets the remote copy from VOspace, if the local copy is out of date. When the file is written to disk and closed, the VOSpace file system puts the file back into VOspace.  With most science software, these operations typically occur rarely and the illusion of a local disk is maintained.  Most editors, however, tend to write temporary versions of a file frequently.  In this case, the file is frequently written to VOspace. Performance may suffer in this case, or not even being compatible with the application.

<div class="shell">

{% highlight bash %}
$ mountvofs --help
{% endhighlight %}

</div>

for more details.

To unmount the VOSpace, use the following command:

<div class="shell">

{% highlight bash %}
$ fusermount -u /path/to/a/directory   # Linux
$ umount /path/to/a/directory          # OS-X
{% endhighlight %}

</div>


### Retrieving your CANFAR X509 certificates

To access a VOSpace, the command line client needs a certificate. These certificates are created for you when you request an account, and you can get a short-lived proxy of this certificate to access your data with the "getCert" command line, distributed with the vos client:

<div class="shell">

{% highlight bash %}
$ getCert
{% endhighlight %}

</div>

In batch processing, you might want to use the getCert at the start of every job. To avoid interactivity asking for your CANFAR username/password, add a `$HOME/.netrc` file containing these lines:

<div class="shell">

{% highlight bash %}
$ machine www.canfar.phys.uvic.ca USER password PASSWORD
{% endhighlight %}

</div>

WARNING: this is not a fully secure solution.
