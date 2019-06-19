---
layout: pages_left_nav

namespace: docs.group_management
lang: en
permalink: /en/docs/group_management/
---


The Group Management system is a CADC service providing the ability to limit access to particular archive and VOSpace datasets to particular groups of CADC users.

## Group Management Tasks

### Creating a new group

* Go to the [Group Management](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/groups/) page and click the **New Group** button.
* Fill in the dialog.  Adding a description can help keep you group names organized.
* Click **Create**.

### Adding members to a group

To add a CADC users to a group to allow them access role-based privileges associated with that group.

* Go to the [Group Management](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/groups/) page and find the desired group or create a new one.  Note that the the text boxes at the top of the table listing all the groups you are in can provide text based pattern filtering on the table contents.
* Click the **Edit** link in the 'Members' column. A modal dialog will be displayed with a list of current group members. The bottom of the panel may have input boxes to enter user and group names. <em>If no textboxes appear then you do not have permission to add members to this group.</em>
* Start typing the name of the CADC user or group you want to add into the input box. After 2 characters a list of possible matches is displayed. Select one, then click **Add member**.
* Add additional members if needed.
* Click the **X** (close) button in the upper right of the dialog when you have finished adding members. You will be returned to the main list of your groups.

### Removing members from a group

* Select the **Edit** link in the 'Members' column for the group of interest.
* Click the red **X** next to the name of the user you wish to remove.
* Click the **X** (close) button in the upper right of the dialog when you have finished adding members. You will be returned to the main list of your groups.

### Adding and Removing Administrators

Group owners and group administrators may add and remove group administrators. Administrators are added and removed in a similar way to how group members are added and removed, using instead links in the 'Administrators' column in the main list of groups.
 
### Groups of Groups

The [Group Management](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/groups/) system allows you to add groups as members of other groups.  This can be a useful aid in efficient management of groups.  For example, you might create a group that is allowed to have write access to a VOSpace and another group that is allowed to have read access.  You can then add the 'write' group to the 'read' group so that any files that the 'read' group is given access to the 'write' group will automatically also have read access to. Where ever the term 'CADC User' is used in the description of management task below, a Group Name could be substituted.

### Viewing Member Lists

#### For group members:

To protect the privacy of individuals involved with CADC groups, the list of names of group members is only available to group owners and administrators. As a CADC group member you can view the Administrators list.
* Select the **View** link in the 'Administrators' column for the group of interest.
* The list of current administrators will be displayed.
* Click the **X** (close) button in the upper right of the dialog when you are finished viewing. You will be returned to the main list of your groups.

#### For group administrators:

Access to the group list is through the **Edit** links in both the 'Members' and 'Administrators' columns.
 

## VOSpace Groups

Any user can create a new group, provided that the group name is unique in the CADC group space.  These user created groups can have members added to them and those groups of users can be granted privilege access to particular files within VOSpace.

### Granting VOSpace Access

To assign privileged access to a directory of file within VOSpace the users must do the following:

* Create a CADC group with the [Group Management](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/groups/) system
* Add CADC users to that group
* Assign that group READ or READ/WRITE access to the VOSpace file or directory

To assign READ or READ/WRITE access to a VOSpace file or directory use the VOSpace browser to select the object (checkbox next to the file or directory of interest) then click **Edit Permissions** and then click **Add Group** in the permissions dialog box.


## Archive Groups

For each Program/Run ID within a telescope data collection a special group with a name matching the pattern ${ARCHIVE}-${PROGRAMID} is created.  For example JCMT-M02AC32 group members have access to all JCMT observations registered against the M02AC32 Program ID.  Archive groups are automatically created and are owned by the telescope organization that is providing the data

### Granting Data Access

The PI of a particular program can use the [Group Management](https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/en/groups/) page to view/edit the CADC users who are in the group, providing access to team members during the proprietary period.
