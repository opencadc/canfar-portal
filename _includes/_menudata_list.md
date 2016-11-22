{% for menu_item_namespace in site.data.menudata[include.namespace] %}
  {% capture item_ns %}{{ include.namespace}}.{{ menu_item_namespace }}{% endcapture %}
  {% include _link_item.md namespace=item_ns %}
{% endfor %}
