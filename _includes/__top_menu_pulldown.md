<li class="dropdown{% if parent_namespace == include.name %} active{% endif %}">
  <a href="{{ page_lang_link }}{{ t[include.name].link }}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ t[include.name].name }} <span class="caret"></span></a>
  <ul class="dropdown-menu list-unstyled">
    {% for menudataitem in site.data.menudata[include.name] %}
      {% assign menu_pulldown_parent_item = t[include.name] %}
      {% assign menu_pulldown_item = menu_pulldown_parent_item[menudataitem] %}
      {% capture menu_beginning_portion %}{{ menu_pulldown_item.link | slice: 0, 4 }}{% endcapture %}
      {% capture menu_pulldown_link %}{% if menu_beginning_portion == "http" %}{{ menu_pulldown_item.link }}{% else %}{{ page_lang_link }}{{ menu_pulldown_parent_item.link }}{{ menu_pulldown_item.link }}{% endif %}{% endcapture%}
    <li><a href="{{ menu_pulldown_link }}">{{ menu_pulldown_item.name }} </a></li>
    {% endfor %}

    <li role="separator" class="divider"></li>
    {% assign mainitem = t[include.name] %}
    <li><a href="{{ page_lang_link }}{{ mainitem.link }}">{{ mainitem.name }} </a></li>
  </ul>
</li>
