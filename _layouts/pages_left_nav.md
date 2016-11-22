---
layout: default
---

{% include _page_header.html %}

<div class="container-fluid">
  <div class="row">
    <div id="sidebar_nav" role="navigation" class="col-sm-3 col-md-2 sidebar">
      <h3>{{ parent_item.name }}</h3>
      <ul class="nav nav-sidebar">
        {% include _menudata_list.md namespace=parent_namespace %}
        <li role="separator" class="divider"></li>
        {% capture main_link_url %}{{ page_lang_link }}{{ parent_item.link }}/{% endcapture %}
        {% capture main_page_url %}{{ page.url | prepend: site.baseurl }}{% endcapture %}
        <li{% if main_page_url == main_link_url %} class="active"{% endif %}><a href="{{main_link_url}}">{{ parent_item.name }} </a></li>
      </ul>
    </div>
    <div role="main" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div class="inner">
        <section id="main_content">
          <h2><a id="canfar-beta" class="anchor" href="#canfar-beta" aria-hidden="true">
            <span aria-hidden="true" class="octicon octicon-link"></span></a>{{ child_item.name }} <a class="btn btn-sm btn-warning" href="{{site.github.repository_url}}/blob/gh-pages/{{page.path}}"><span class="glyphicon glyphicon-pencil"></span> Improve this page</a></h2>
          {{ content }}
        </section>
      </div>
    </div>
  </div>
</div>
{% include _page_footer.html %}
