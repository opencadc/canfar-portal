---
layout: default
---

{% include _page_header.html %}

<div class="container-fluid">
  <div class="row">
    <div id="sidebar_nav" role="navigation" class="col-sm-3 col-md-2 sidebar">
      <h3>{{ parent_item.name }}</h3>
      <ul class="nav nav-sidebar">
        {% capture html_check %}index_{{ page.lang }}.html{% endcapture %}
        {% assign path_items = page.path | split: html_check %}

        {% for menu_item_namespace in site.data.menudata[parent_namespace] %}
          {% assign menu_item_namespace_items = menu_item_namespace | split: "." %}

          {% assign child_menu_item = parent_item %}
          {% assign menu_item_url = parent_item.link %}

          {% if menu_item_namespace_items.size > 0 %}
            {% for hier_menu_item in menu_item_namespace_items %}
              {% assign child_menu_item = child_menu_item[hier_menu_item] %}
              {% capture menu_item_url %}{{menu_item_url}}{{child_menu_item.link}}{% endcapture %}
            {% endfor %}
          {% else %}
            {% assign menu_item_url = parent_item.link %}
          {% endif %}

        <li><a href="{{ page_lang_link | prepend: site.baseurl }}{{ menu_item_url }}">{{ child_menu_item.name }} </a></li>
        {% endfor %}

        <li role="separator" class="divider"></li>
        <li><a href="{{ page_lang_link | prepend: site.baseurl }}{{ parent_item.link }}">{{ parent_item.name }} </a></li>
      </ul>
    </div>
    <div role="main" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div class="inner">
        <section id="main_content">
          <h2><a id="canfar-beta" class="anchor" href="#canfar-beta" aria-hidden="true">
            <span aria-hidden="true" class="octicon octicon-link"></span></a>{{ child_item.name }}</h2>

          {{ content }}

        </section>
      </div>
    </div>
  </div>
</div>
{% include _page_footer.html %}
