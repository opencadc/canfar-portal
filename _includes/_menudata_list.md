{% for menu_item_namespace in site.data.menudata[include.namespace] %}
{% assign menu_item_namespace_items = menu_item_namespace | split: "." %}

{% assign menu_parent_item = t[include.namespace] %}
{% assign child_menu_item = menu_parent_item %}
{% assign menu_item_url = menu_parent_item.link %}

{% if menu_item_namespace_items.size > 0 %}
{% for hier_menu_item in menu_item_namespace_items %}
{% assign child_menu_item = child_menu_item[hier_menu_item] %}
{% capture menu_item_url %}{{menu_item_url}}{{child_menu_item.link}}{% endcapture %}
{% endfor %}
{% else %}
{% assign menu_item_url = menu_parent_item.link %}
{% endif %}

{% capture link_url %}{{ page_lang_link }}{{ menu_item_url }}/{% endcapture %}
{% capture child_menu_item_beginning %}{{child_menu_item.link | slice: 0, 4}}{% endcapture %}
{% capture menu_link_url_side %}{% if child_menu_item_beginning == "http" %}{{ child_menu_item.link }}{% else %}{{ link_url }}{% endif %}{% endcapture %}
<li{% if page.url == link_url %} class="active"{% endif %}><a href="{{ menu_link_url_side }}">{{ child_menu_item.name }} </a></li>
{% endfor %}