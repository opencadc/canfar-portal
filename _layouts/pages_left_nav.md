---
layout: default
---

{% include _page_header.html %}

<div class="container-fluid">
  <div class="row">
    <div id="sidebar_nav" role="navigation" class="col-sm-3 col-md-2 sidebar">
      <ul class="nav nav-sidebar">
        {% include _menudata_list.md namespace=parent_namespace %}
      </ul>
    </div>
    <div role="main" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    {% include bs_maintenance_message_en.html %}
      <div class="inner">
        <section id="main_content">
          {% comment %}
            Use the no-wrap in your page content to prevent a newline after the header.
            Useful to make use of the space beside the 'Improve this page' link.
          {% endcomment %}
          <h2 {% if page.no-wrap == true %}style="display: inline-block;"{% endif %}><a id="canfar-beta" class="anchor" href="#canfar-beta" aria-hidden="true">
                <span aria-hidden="true" class="octicon octicon-link"></span></a>{{ child_item.name }} <a class="btn btn-sm btn-warning" href="{{site.github_url}}/blob/gh-pages/{{page.path}}">
                <span class="glyphicon glyphicon-pencil"></span> Improve this page</a></h2>
          {{ content }}
        </section>
      </div>
    </div>
  </div>
</div>
{% include _page_footer.html %}
