#!/bin/bash -i
export HOME=/home/jkavelaars

source ${HOME}/.bashrc

echo ${PATH}
env
hostname

destination_vospace=vos:jkavelaars/JCMT_UM18_DR/

vmkdir -p ${destination_vospace}

vtag ${destination_vospace} ivo:scuba.jcmt.edu/oracdr#started=$1

echo $@ > `hostname`.log
vcp `hostname`.log ${destination_vospace}

[ -f cadcproxy.pem ] && cp cadcproxy.pem ${HOME}/.ssl/

# Create a clean directory to download data into
mkdir data
cd data
cadc_plane_download.sh  $1

# Only file in here is the tar ball I just downloaded, unpack and then delete the .tar
tar_file=`ls *.tar`
tar xf ${tar_file}
rm ${tar_file}

# setup variables to keep track of which directory is which 
cd *
raw_dir=`pwd`
reduced_dir=`echo ${raw_dir} | sed -e 's/raw/reduced/'`
mkdir ${reduced_dir}

# now build the input list for oracdr
cd ${raw_dir}
gunzip *.gz
ls *.sdf > ${reduced_dir}/mylist

# setup oracdr  (basic tutorial)
cd ${reduced_dir}
oracdr_scuba2_850 -cwd
export ORAC_DATA_IN=${raw_dir}

# execute
oracdr -loop file -files mylist -nodisplay

# save the results
vcp ${reduced_dir} ${destination_vospace} --verbose

vtag ${destination_vospace} ivo:scuba.jcmt.edu/oracdr#finished=$1
