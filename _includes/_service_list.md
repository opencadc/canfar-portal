<div class="list-group list-group-services">
  {% for s in include.services %}
    {% assign service_key = s[0] %}
    {% if service_key != 'name' and service_key != 'link' and service_key != 'storage_beta' %}
      {% if include.menu_side == 'left' %}
        {% assign mod_check = 1 %}
      {% else %}
        {% assign mod_check = 0 %}
      {% endif %}    
      {% assign mod = forloop.index | modulo: 2 %}
      {% if mod == mod_check %}
        {% capture service_name %}{{ page.namespace }}.{{ service_key }}{% endcapture %}
          <div class="list-group-item">
            <h3 class="list-group-item-heading">{{ include.services[service_key].name }}</h3>
            <div class="list-group-item-text">
              <p>{{ include.services[service_key].description }}</p>
              {% capture _service_doclink %}{{ include.services[service_key].doclink | slice: 0, 4 }}{% endcapture %}
              {% if _service_doclink == 'http' %}
              <p><a href="{{ include.services[service_key].doclink }}">User Documentation <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></a></p>
              {% else %}
              <p><a href="{{ include.services[service_key].doclink | prepend: site.baseurl }}">User Documentation <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></a></p>
              {% endif %}
              {% if include.services[service_key].api_link %}
              <p><a href="{{ include.services[service_key].api_link }}">Reference API <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></a></p>
              {% endif %}
              {% if include.services[service_key].capacity %}
              <p>{{ include.services[service_key].capacity }}</p>
              {% endif %}
              <p>{% include _link_item.md namespace=service_name link_only=true label='Go to service portal' glyphicon='glyphicon-play-circle' %}</p>
              {% if service_key == 'storage' %}
              <p><a href="{{ include.services.storage_beta.link }}">Go to service portal (Beta version) <span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span></a></p>
              {% endif %}
            </div>
          </div>
      {% endif %}
    {% endif %}
  {% endfor %}
</div>
