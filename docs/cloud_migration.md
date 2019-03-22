# Cloud Migration

This document summarizes what you need to do to migrate your project on the CANFAR OpenStack cloud hosted on Compute Canada.

## Cleanup the old cloud
   - Login into [west.cloud](https://west.cloud.computecanada.ca/)
   - For each project (upper-left next to the west cloud logo), navigate to:
	   - **Volumes**
		   - Delete all volumes not attached that you do not need anymore
		   - All volumes  *Attached to instance_name on /dev/vda* are volume-based images. You may want to rename them something associated with the *instance_name* if you have not already
		   - In the **Volume Snapshots** tab delete snapshots you do not need anymore

	   - **Images**
		   - Select all VM images / snapshots you do not need anymore, and delete them

	   - **Instances**
		   - Terminate all your instances associated to a volume if you have any
		   - Snapshot all the other instances, and terminate them

## Check the new cloud
   - Login into [arbutus](https://arbutus-canfar.cloud.computecanada.ca/)
   - For each project, navigate to:
	 - **Compute -> Overview** 
	 	- Check the new quotas are similar to quotas in the old cloud
	 - **Network->Security Groups**
	 	- Check your security groups are similar to your old groups in the west cloud. You'll find them under **Compute -> Access & Security**
	 
   - Navigate to **Compute -> Key Pairs**
	 - The easiest and safest is to recreate ssh keys in the new cloud: **Create Key Pair** or **Import Public Key**
	 - If you want to use the old ones:
		 - On west.cloud go to **Compute -> Access & Security -> Key Pairs**. Click on the name of the key pair you want and copy the public key value
		 - On arbutus, click **Import Public Key**: give your Key Pair a name and paste in the public key from west cloud
		 - Your Key Pair should now be imported into Arbutus Cloud. Repeat the above steps for as many keys as you need

## Finalizing the Migration- Inform us
If you want us to migrate everything else for you, send us an [email](mailto:support@canfar.net) containing "Project \<*your_project_name*\> is ready for final migration." We will do the rest!
If you really know what you are doing and want to migrate everything yourself, please let us know via [email](mailto:support@canfar.net), and then refer to [this guide](https://docs.computecanada.ca/wiki/Arbutus_Migration_Guide).
In either case, feel free to hop in the [slack channel](http://www.canfar.net/slack) to get help.
