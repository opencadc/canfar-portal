---
layout: pages_left_nav

lang: en
namespace: nodes.taos_ii
permalink: /en/nodes/taos-ii
---

<!-- Content start -->

TAOS II, the Transneptunian Automated Occultation Survey II, will measure the size distribution of small objects (down to 1 km diameter) in the Kuiper Belt and beyond. The Kuiper Belt size distribution is of scientific interest because it provides important information on the formation and dynamical evolution of the Solar System. Furthermore, the Kuiper Belt is thought to be the source of the short period comets, and an accurate census of these small objects can help us understand the mechanism by which an object in the Kuiper Belt Is perturbed into a cometary orbit. Such objects are impossible to detect directly because they are too faint to be seen with even the largest telescopes. However, when such an object passes in front of a star, the star will "blink out" for a small fraction of a second. The detection and characterization of these occultation events are the primary science goals of this survey.


### CANFAR current activities

An itemized list of CANFAR activities or  CANFAR services that are heavily used


* Data storage for archiving and reprocessing
* Computing for bulk reprocessing of TAOS-II survey data.
*

### Data & software needs and future plans

* **Machine Learning techniques for time-series analysis**

The shape of the time-series produced by an occultation event is complex function of mulitple geometry parameters, some of which produce redunant signatures within the data stream. We will explore the use of ML ANN as an approach to the classification timeseries sets to estimate the intrinsic geometric parameters associated with the event. 

* **Time-series searches via micro-service deployment on storage**

Each star monitored by  the TAOS-II project will be measured millions of times during the survey.  We will develope a analysis process that will allow the execution cross-correlation analysis of the time series as a micro-service running on the storage node containing the data stream.  This approach will collapse the network bandwith to near zero, keeping the data in place and moving the code to the data.

### About

* **Project web page:** [TAOS-II](https://taos2.asiaa.sinica.edu.tw)
* **Node lead and contact:** JJ Kavelaars
* **People:**
  * Matthew Lehner (ASIAA): Principle Investigator
  * Shiang-Yu Wang (ASIAA): Co-PI, Project Manager
  * Mauricio Reyes-Ruiz (UNAM): UNAM PI
  * Charles Alcock (CfA): CfA PI
  * JJ Kavelaars (NRC HAA): Data archve storage.




<!-- Content end -->
