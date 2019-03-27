---
layout: pages_left_nav

namespace: docs.cloud_migration
lang: en
permalink: /en/docs/cloud_migration/
---

## Introduction

This document summarizes what you need to do to migrate your project on the CANFAR OpenStack cloud hosted on Compute Canada from the old cloud (west.cloud) to the new cloud (arbutus). It is also a good time for spring cleaning!
You may want to open two web windows or tab: one for for the old [West Cloud](https://west.cloud.computecanada.ca/), and one for the new [Arbutus Cloud](https://arbutus-canfar.cloud.computecanada.ca/) .

## Cleanup the old cloud
   - Login into [West Cloud](https://west.cloud.computecanada.ca/)
   - For each project (upper-left next to the west cloud logo), navigate to:
	   - **Volumes**
		   - Delete all volumes not attached to any instance that you know you do not need anymore. This will delete all data on the volume.
		   - For all the volumes attached to an instance (except the ones on /dev/vda), ssh to the instance and clean up the volume as much as you can. It will really speed up the transfer. 
		   - All volumes claiming *Attached to instance_name on /dev/vda* are volume-based images. You may want to rename them something associated with the *instance_name* if you have not already. To rename, click on **Edit** for the volume.
		   - In the **Volume Snapshots** tab delete snapshots you do not need anymore

	   - **Images**
		   - Select all VM images / snapshots you do not need anymore, and delete them

	   - **Instances**
		   - When you are ready, terminate all your instances associated to a volume if you have any
		   - Snapshot all the other instances, and terminate them
		   
   - If you have access to batch processing, ssh to batch.canfar.net and cleanup as much as you can your home directory.


## Check the new cloud
   - Login into [Arbutus](https://arbutus-canfar.cloud.computecanada.ca/) with your CADC username and password. You do not need the `-canfar` suffix anymore
   - For each project, navigate to:
	 - **Compute -> Overview** 
	 	- Check the new quotas are similar to quotas in the old cloud
	 - **Network -> Security Groups**
	 	- Check your security groups are similar to your old groups in the west cloud. In the west cloud, you will find them under **Compute -> Access & Security**
	 
   - Navigate to **Compute -> Key Pairs**
	 - The easiest and safest is to recreate ssh keys in the new cloud: **Create Key Pair** or **Import Public Key**
	 - If you want to use the old ones:
		 - On west.cloud go to **Compute -> Access & Security -> Key Pairs**. Click on the name of the key pair you want and copy the public key value
		 - On arbutus, click **Import Public Key**: give your Key Pair a name and paste in the public key from west cloud
		 - Your Key Pair should now be imported into Arbutus Cloud. Repeat the above steps for as many keys as you need

## Finalizing the Migration
- If you want us to migrate everything else for you, send us an [email](mailto:support@canfar.net) containing "Project \<*your_project_name*\> is ready for final migration." We will do the rest!
- If you really know what you are doing and want to migrate everything yourself, please let us know via [email](mailto:support@canfar.net), and then refer to [this guide](https://docs.computecanada.ca/wiki/Arbutus_Migration_Guide)
- In either case, feel free to hop in the [Slack channel](https://www.canfar.net/slack) to get help
