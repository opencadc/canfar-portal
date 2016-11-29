---
layout: pages_left_nav

namespace: resources.services
lang: en
permalink: /en/resources/services/
---

{% include __vars.md %}

<!-- Content starts -->

{% assign all_services = t['resources']['services'] %}

<div class="row">
  <div class="col-sm-6">
    <div class="list-group {{all_services.size}}">
      {% for s in all_services %}
        {% assign mod = forloop.index | modulo: 2 %}
        {% if mod == 0 %}
          {% assign service_key = s[0] %}
          {% if service_key != 'name' and service_key != 'link' %}
            {% capture service_name %}{{ page.namespace }}.{{ service_key }}{% endcapture %}
              <div class="list-group-item">
                <h3 class="list-group-item-heading">{% include _link_item.md namespace=service_name link_only=true %} <a class="btn btn-lg" href="{{ s.doclink }}"> <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></a></h3>
                <p class="list-group-item-text">Lorem ipsum</p>
              </div>
          {% endif %}
        {% endif %}
      {% endfor %}
    </div>
  </div>
  <div class="col-sm-6">
    <div class="list-group">
      {% for service in all_services %}
        {% assign mod2 = forloop.index | modulo: 2 %}
        {% if mod2 != 0 %}
          {% assign service_key = service[0] %}
          {% if service_key != 'name' and service_key != 'link' %}
            {% capture service_name %}{{ page.namespace }}.{{ service_key }}{% endcapture %}
              <div class="list-group-item">
                <h3 class="list-group-item-heading">{% include _link_item.md namespace=service_name link_only=true %} <a class="btn btn-lg" href="{{ service.doclink }}"> <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></a></h3>
                <p class="list-group-item-text">Lorem ipsum</p>
              </div>
          {% endif %}
        {% endif %}
      {% endfor %}
    </div>
  </div>
</div>

<!-- Content ends -->
