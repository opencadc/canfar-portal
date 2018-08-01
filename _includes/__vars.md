{% assign t = site.data.translations[page.lang] %}
{% assign page_namespace_items = page.namespace | split: "." %}
{% assign parent_namespace = page_namespace_items[0] %}
{% assign parent_item = t[parent_namespace] %}
{% capture page_lang_link %}/{{ page.lang }}{% endcapture %}
{% capture page_lang_link %}{{ page_lang_link | prepend: site.baseurl }}{% endcapture %}

{% comment %}The child_item is used to track the current page with left menus{% endcomment %}
{% assign child_item = t %}

{% if page_namespace_items.size > 0 %}
  {% for hier_item in page_namespace_items %}
    {% assign child_item = child_item[hier_item] %}
  {% endfor %}
{% else %}
  {% assign child_item = parent_item %}
{% endif %}

{% assign host_name = "NRC-008897.cadc.dao.nrc.ca:4000" %}
