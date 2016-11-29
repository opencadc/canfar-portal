{% assign namespace_items = include.namespace | split: "." %}
{% assign link_parent_namespace = namespace_items[0] %}
{% assign link_parent_item = t[link_parent_namespace] %}
{% assign link_child_item = t %}
{% assign item_url = '' %}

{% if namespace_items.size > 0 %}
  {% for hier_item in namespace_items %}
    {% assign link_child_item = link_child_item[hier_item] %}
    {% capture item_url %}{{ item_url }}{{ link_child_item.link }}{% endcapture %}
  {% endfor %}
{% else %}
  {% assign item_url = link_parent_item.link %}
{% endif %}

{% capture link_url %}{{ page_lang_link }}{{ item_url }}{% endcapture %}
{% capture page_url %}{{ page.url | prepend: site.baseurl }}{% endcapture %}
{% capture link_child_item_beginning %}{{link_child_item.link | slice: 0, 4}}{% endcapture %}
{% capture link_url_side %}{% if link_child_item_beginning == "http" %}{{ link_child_item.link }}{% else %}{{ link_url }}{% endif %}{% endcapture %}
{% capture link_html %}<a href="{{ link_url_side }}" {% if link_child_item_beginning == "http" %}rel="external"{% endif %} class="{{include.namespace}} menu-item-indent-{{ namespace_items.size | minus: 1 }} {{ include.link_css }}">{{ link_child_item.name }} </a>{% endcapture %}

{% if include.link_only %}
  {{ link_html }}
{% else %}
  <li{% if page_url == link_url %} class="active"{% endif %}>{{ link_html }}</li>
{% endif %}
