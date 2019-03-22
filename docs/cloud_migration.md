If you are in sync how CC does stuff and know what you are doing, follow the [CC migraton guide](https://docs.computecanada.ca/wiki/Arbutus_Migration_Guide)

If not, follow this guide

1. Cleanup the old cloud
   - Login into  [west.cloud](https://west.cloud.computecanada.ca/).
   - For each project (upper-left next to the west cloud logo):
	   - Go to Volumes
		   - Delete all volumes not attached that you do not need anymore
		   - Go to the Volume Snapshots tab, and delete snapshots you do not need anymore
		   - All volumes saying Attached to <name> on /dev/vda are volume-based images. You may want to rename them something associated with the <name> if you have not already, such as <name>-root to specify this is the root partition of your image.


	   - Go to Images
		   - Select all VM images / snapshots you do not need anymore, and delete them

	   - Go to Instances
		   - Snapshot the other instances, then terminate them
		   - Terminate all your instances associated to a volume

2. Check the new cloud
   - Login into [arbutus](https://arbutus-canfar.cloud.computecanada.ca/).
   - For each project:
	 - Check your quotas in Compute->Overview as similar as in the old cloud
	 - Check your security groups in Network->Security Groups are similar as in the old cloud which was under Compute->Access & Security
	 
   - Check your ssh keys:
	 - Go to  Compute -> Key Pairs
	 - The easiest and safest is to recreate ssh keys in the new cloud:  Create Key Pair or Import Public Key.
	 - If you want to use the old ones:
		 - On west.cloud go to Compute -> Access & Security -> Key Pairs. Click on the name of the key pair you want and copy the public key value.
		 - On arbutus, click Import Public Key: give your Key Pair a name and paste in the public key from west cloud.
		 - Your Key Pair should now be imported into Arbutus Cloud. Repeat the above steps for as many keys as you need.

3. Send us an (email)[mailto:support@canfar.net] with : project <name> is ready for finalizing migration.
4. If you really know what you are doing, check [this guide](https://docs.computecanada.ca/wiki/Arbutus_Migration_Guide).
