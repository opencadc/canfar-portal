---
layout: pages_left_nav

namespace: resources.services
lang: en
permalink: /en/resources/services/
---

{% include __vars.md %}

<!-- Content starts -->

{% assign all_services = site.data.translations[page.lang]['resources']['services'] %}

<div class="row">
  <div class="col-sm-6">
  {% include _service_list.md services=all_services menu_side='left' %}
  </div>
  <div class="col-sm-6">
  {% include _service_list.md services=all_services menu_side='right' %}
  </div>
</div>

<!-- Content ends -->
