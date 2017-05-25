---
layout: pages_left_nav

namespace: resources.docs.api
lang: en
permalink: /en/docs/api
---

## Introduction

This page documents the set of services that make up the CANFAR cloud ecosystem.  Click on the services for more information.

## Web Service API Documentation

{% for api in site.data.apis %}<a href="{{ api.location }}" target="_blank">{{ api.title }}</a>  | {{ api.description }}  |
{% endfor %}

### Authentication

The CANFAR web services support the following authentication mechanisms:

  - Anonymous access
  - User ID / Password authenticated access
  - X.509 Client Certificate access
  - API Tokens and cookies

All endpoints described in the web service API docs support both HTTP and HTTPS (SSL).  Currently, all SSL connections require X.509 client certificates, so there is no support for anonymous connections over SSL.  API Tokens should be sent on the HTTP connections.  For each of the web service endpoints, there is a mirrored endpoint for userid/password authentication that has 'auth' included in the path directly after the base resource.  For example, for the Access Control endpoint /ac/groups, the associated userid/password endpoint is /ac/auth/groups.

### Authorization

User's must be authorized to access proprietary resources.  Proprietary resources are normally protected by allowing only members of a particular group access to that resource.  Each service has a different mechanism for assigning the granting group, but they all share the group management facilities of the Access Control web service to manage group membership and to check whether an authenticated user is a member of that granting group.

### Credential Delegation

In the CANFAR service oriented architecture, many of the services make calls to the public or private APIs of other services to accomplish a task.  This is illustrated in the architecture diagram below with the calling arrows on the right side of the services.  On these types of calls, it is important that the identity of the initial user is preserved so that authorization may be applied correctly.  This is accomplished by using an X.509 proxy certificate of the initial user for secondary support service calls.  This requires that users authorize our services to make calls on their behalf when necessary.  The credential delegation web service is integral to this process:  It allows users to 'delegate' their identity in the form of an X.509 proxy certificate and allows services access to this proxy certificate for use in secondary service calls.

### Web Service Architecture
<img src="/img/cadcAndCanfarWebServices.gif" alt="Web Service Architecture Diagram"/>
