---
layout: pages_left_nav

namespace: docs.group_management
lang: en
permalink: /en/docs/group_management/
---


The Group Management system is shared between CADC and CANFAR. This system provides the ability to limit access to particular archive and VOSpace datasets to particular groups of users.

## Group Management Tasks

### Creating a new group

* Go to the [Group Management](https://www.canfar.net/canfar/groups) page and click the **Create Group** button
* Fill in the dialog.  Adding a description can help keep you group names organized.
* Click **Create**

### Adding members to a group

To add a CADC users to a group to allow them access privileges associated with that group.

* Go to the [Group Management](https://www.canfar.net/canfar/groups) page and find the desired group or create a new one.  Note that the the text boxes at the top of the table listing all the groups you are in can provide text based pattern filtering on the table contents.
* Click the **View** link in the 'Members' column.
* Type the name of the user you want to add to the group in the textbox at the bottom of the dialogue.  <em>If no textbox appears then you do not have permission to add members to this group.
* Once you have selected the member you want to add, click the **Add member** button.
* Add additional members if needed
* Click the **Done** botton when you have finished adding members.

### Removing members from a group

* Select the 'View' link in the Members column for the group of interest
* Click the red **X** next to the name of the user you wish to remove
* Click **Done**

### Adding and Removing Administrators

Group owners and group administrators may add and remove CADC users group the groups member listing and the groups administrators listing. Administrators are added and removed in the same way as group members are added and removed.

### Groups of Groups

The CADC/CANFAR [Group Management](https://www.canfar.net/canfar/groups) system allows you to add groups as members of other groups.  This can be a useful aid in efficient management of groups.  For example, you might create a group that is allowed to have write access to a VOSpace and another group that is allowed to have read access.  You can then add the 'write' group to the 'read' group so that any files that the 'read' group is given access to the 'write' group will automatically also have read access to. Where ever the term 'CADC Users' is used in the description of management task below, a Group Name could be substituted.

## VOSpace Groups

Any user can create a new group, provided that the group name is unique in the CADC/CANFAR group space.  These user created groups can have members added to them and those groups of users can be granted privilege access to particular files within VOSpace.

### Granting VOSpace Access

To assign privileged access to a directory of file within VOSpace the users must do the following:

* Create a group with the CANFAR [Group Management](https://www.canfar.net/canfar/groups) system
* Add CADC/CANFAR users to that group
* Assign that group READ or READ/WRITE access to the VOSpace file or directory

To assign READ or READ/WRITE access to a VOSpace file or directory use the VOSpace browser to select the object (checkbox next to the file or directory of interest) then click **Edit Permissions** and then click **Add Group** in the permissions dialog box.


## Archive Groups

For each Program/Run ID within a telescope data collection a special group with a name matching the pattern ${ARCHIVE}-${PROGRAMID} is created.  For example JCMT-M02AC32 group members have access to all JCMT observations registered against the M02AC32 Program ID.  Archive groups are automatically created and are owned by the telescope organization that is providing the data

### Granting Data Access

The PI of a particular program can use the [Group Management](https://www.canfar.net/canfar/groups) page to view/edit the CADC users who are in the group, providing access to team members during the proprietary period.
