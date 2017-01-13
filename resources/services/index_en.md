---
layout: pages_left_nav

namespace: resources.services
lang: en
permalink: /en/resources/services/
no-wrap: true
---

{% include __vars.md %}

<!-- Content starts -->

{% assign all_services = site.data.translations[page.lang]['resources']['services'] %}

<div class="row">
  <div id="quick_start_btn_container" class="col-sm-4 col-sm-offset-4">
    {% assign quick_start = t['resources']['docs']['quick_start'] %}
    {% include _link_item.md namespace='resources.docs.quick_start' link_only=true link_css='btn btn-success btn-lg' label=quick_start.label glyphicon='glyphicon-arrow-right' %}
  </div>
</div>

<div class="row">
  <div class="col-sm-6">
  {% include _service_list.md services=all_services menu_side='left' %}
  </div>
  <div class="col-sm-6">
  {% include _service_list.md services=all_services menu_side='right' %}
  </div>
</div>

<!-- Content ends -->
