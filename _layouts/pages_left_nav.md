---
layout: default
---
{% include _page_header.html %}
<div class="container-fluid">
  <div class="row">
    <div id="sidebar_nav" role="navigation" class="col-sm-3 col-md-2 sidebar">
      <h3>{{ t[page.namespace].name }}</h3>
      <ul class="nav nav-sidebar">
        {% capture html_check %}index_{{ page.lang }}.html{% endcapture %}
        {% assign path_items = page.path | split: html_check %}

        {% for menudataitem in site.data.menudata[page.namespace] %}
        {% assign parent_item = t[page.namespace] %}
        {% assign item = parent_item[menudataitem] %}
        <li><a href="/{{ page.lang | prepend: site.baseurl }}{{ parent_item.link }}{{ item.link }}">{{ item.name }} </a></li>
        {% endfor %}

        <li role="separator" class="divider"></li>
        {% assign mainitem = t[page.namespace] %}
        <li><a href="/{{ page.lang | prepend: site.baseurl }}{{ mainitem.link }}">{{ mainitem.name }} </a></li>
      </ul>
    </div>
    <div role="main" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div class="inner">
        <section id="main_content">
          <h2><a id="canfar-beta" class="anchor" href="#canfar-beta" aria-hidden="true">
            <span aria-hidden="true" class="octicon octicon-link"></span></a>{{ t[page.namespace].name }}</h2>

          {{ content }}

        </section>
      </div>
    </div>
  </div>
</div>
{% include _page_footer.html %}