---
layout: pages_left_nav

namespace: resources.services
lang: en
permalink: /en/resources/services/
---

{% include __vars.md %}

<!-- Content starts -->

<ul class="list-unstyled">
  {% for service in t['resources']['services'] %}
    {% capture service_name %}{{ page.namespace }}.{{ service }}{% endcapture %}
    {% include _link_item namespace=service_name %}
  {% endfor %}
</ul>

<!-- Content ends -->