---
layout: pages_left_nav

lang: en
namespace: docs.digital_object_identifiers
permalink: /en/docs/digital_object_identifiers/
---

<!-- Content start -->


### The CANFAR Data Publication Service


#### Purpose
The purpose of the CANFAR Data Publication Service (DPS) is to support linking a research paper to the actual 
data that were used to produce the conclusions of that paper. The DPS provides storage space and 
the ability to register (publish) a Digital Object Identifier (DOI) with the DataCite system. That 
DOI will point to the published data on a permanent basis.


#### Access
There are 2 ways to access the DPS: 
1.  From the CANFAR portal (select 'Data Publication' at https://www.canfar.net/)

2. Through direct link - https://www.canfar.net/citation/


#### Account Requirements
The author of the paper will need to have a CADC account. This will allow you to access the CANFAR Data 
Publication Service (DPS) interface and, later, to access the user-managed storage service where the author 
will deposit the data to be published.

### How to Publish a DOI using the CANFAR Data Publication Service (DPS)
#### Overview

Steps to follow to publish data using the DPS:
1. Request a DOI
2. Upload the data package
3. Refereeing
4. Publish DOI with Data Cite

##### 1. Request a DOI
In this step: 
- a DOI number is reserved for the data package associated with the paper - ie. 10.11570/20.0006
- a Data Directory is made to house the data package. This is a VOSPace folder
that can be accessed using the User Storage UI or using vos python tools - 
ie. https://www.canfar.net/storage/list/AstroDataCitationDOI/CISTI.CANFAR/20.0006/data
- a landing page is generated for the doi: 
ie. https://www.canfar.net/citation/landing?doi=20.0006

##### 2. Upload the data package
How this is done depends on both the size and volume of files that are
part of the data package. See 'Uploading a Data Package' later in this document
for more details.

##### 3. Refereeing
At the request of the DOI owner a CADC account is generated that has read-only access to 
the data package. The author can share it with a journal editor or other referee. 
The account is disabled after refereeing is complete.

##### 4. Publish DOI with Data Cite
Though the CANFAR DPS, the DOI is 'Published' with DataCite and the Data
Directory is locked. Any further changes to the data package or the DOI 
metadata (such as adding a Publication DOI) requires a request to CANFAR support.

Post-publication steps can include:
- Addition of publication DOI to landing page


### How to use the CANFAR Data Publication Service (DPS)
#### Listing current DOIs
The full list of CANFAR-hosted DOIs the currently authenticated user has access to can be found at https://www.canfar.net/citation/ 
This page displays DOI details including status, name, title, links to landing page and data directory.

From here a DOI can be requested, selected for viewing, editing or publishing, depending on the DOI status.

#### Requesting a new DOI
From either the DOI list or request page, a 'New' button will be available. Click this to generate a new DOI 
request. The request form should be displayed at this link: https://www.canfar.net/citation/request.

Minimum information needed:
- First Author
- Title

Optional: 
(Both of these can be added later, prior to publishing the DOI.)
- The journal reference information (journal name, volume page) can be entered but is typically not known initially
- Additional Authors

Once the information is entered, push the Request button. The DOI Reference number is assigned automatically 
and is displayed once the page refreshes. 

#### Viewing DOI details
From the DOI list page, select the number or title to see more details on the 
DOI request page. 

ie. https://www.canfar.net/citation/request?doi=20.0016 (requires authentication)

Details on the page include:
- DOI number
- Title
- First and Additional Authors
- Journal Reference
- DOI status
- Landing page link
- Data Directory link (lock icon displayed if is locked)


#### Editing DOI details
On the DOI request page, if a DOI is NOT published details can be edited 
by an authenticated user. 

Modify any of the values in the form that are available, then press 'Update'. The new values
are displayed when the page refreshes.

If a DOI IS published, a request to edit it must be made through support@canfar.net.


#### Viewing DOI landing page
The landing page provides the outside world with all the pertinent information about your 
journal paper and related data. It's the document DataCite links your DOI to.

exmample: http://doi.org/10.11570/20.0016
links to: https://www.canfar.net/citation/landing?doi=20.0016

The page contains information about the paper, links to the published data and related publications.

For DOIs that are published, the page is available anonymously.


#### Publishing a DOI
On the DOI request page, if a DOI is NOT already published, there is a 'Publish' button in
the upper right hand corner of the page. When you are satisfied that all necessary information is
shown and the data package is complete, press 'Publish' and the system will do the following:
- complete registration of your DOI with DataCite
- lock the Data Directory.

Related publication information can be added manually after this step, through contacting support@canfar.net.


#### Deleting Unpublished DOIs
If for some reason a DOI is created in error, it can be deleted prior to publication from 
the request page. In the upper right of the page, press the 'Delete' button. 

NOTE: for PUBLISHED DOIs, no 'Delete' button is available.


### DOI Data Package
DPS provides a Data Directory for the data package to reside in. It's hosted by CANFAR in the Vault VOSpace impelmentation. 
A folder (literally called 'data') is created in the main folder for a DOI. The structure below that point is up to 
the DOI owner. 

example: https://www.canfar.net/storage/vault/list/AstroDataCitationDOI/CISTI.CANFAR/21.0002/data

The amount of data that can be stored there depends on the quota for the authenticated user.

NOTE: after a DOI is published, this folder is locked and can no longer be modified without assistance
from support@canfar.net. 


#### Content of the data package
The author has complete control of the content of the data package. It may contain data, figures, software, or any 
other material that is important to the paper. We recommend that a README file be placed at the top-level directory that 
explains the content (including the structure) of the data package.

#### Uploading a data package
There are two ways to upload a data package. Which method you use depends on the size and complexity of the 
data being uploaded.
 
- For a smaller number of small-sized files, the User Storage UI is a good choice. 
See it's documentation here: https://www.canfar.net/en/docs/storage/ 

- For very large files, or for large numbers of files, the Python vcp tools are a better choice.
Full instructions for using vcp can also be found in the User Storage documentation, 
under 'The vos Python module and command line client'
: https://www.canfar.net/en/docs/storage/


#### Refereeing: Sharing the data package with the journal editor and referee
Sharing the data package with the science community enhances and supplements the journal publication process. 
Furthermore, evaluation and assessment of the data package by the journal editors and referees is an 
additional enhancement to the value of data publication.

Authors should contact support@canfar.net to obtain a user name and password for an account that can access (in readonly mode) 
the folder hosting the data package. The author can share this account information with the journal editor. 
The editor can then pass that account information on to the referee. 

The referee and journal editor can examine the data package and may require revisions to the data prior to publication.

The journal editor and referee may examine and approve the revisions or modifications.


#### Revising the Content of the data package

The author retains the ability to modify the data package and may do so at any point prior to publishing their DOI.
After publication, the DOI owner needs to contact support@canfar.net for assistance.


### Publishing (minting) the DOI

Once the refereeing process is complete and the paper is accepted the author can use the Publish button to “mint” 
(register the DOI with DataCite). This will lock the folder hosting the data package and the
DOI information itself (author list, journal reference, etc.) so 
that the author can no longer make changes. The data will be visible by the world using 
the DOI. The data will be discoverable through the DataCite search interface (with very 
limited discovery metadata).

### Revising and finalising publication and data package information

The final step is to link the data package DOI with the journal DOI. This is not currently automated.

The author should contact support@canfar.net to:
- include the journal paper DOI in the data package information 
- update the journal reference (title, volume, page) 

It's the responsibility of the author to provide the data package DOI to the 
journal editor to have it included in the journal paper.
 

### Need further assistance?

Please contact support@canfar.net if you need any assistance. 

Comments and feedback from users is greatly valued.


<!-- Content end -->
