---
layout: default
---

{% include _page_header.html %}

<div class="container-fluid">
  <div class="row">
  <div class="col-12 col-md-3-col-xl-2 bd-sidebar">
    <nav id="sidebar_nav" role="navigation" class="">
      <ul class="nav nav-sidebar list-group">
        {% include _menudata_list.md namespace=parent_namespace %}
      </ul>
    </nav>
    <div role="main" class="col-sm-9 col-md-10 main">
    {% include bs_maintenance_message_en.html %}
      <div class="inner">
        <section id="main_content">
          {% comment %}
            Use the no-wrap in your page content to prevent a newline after the header.
            Useful to make use of the space beside the 'Improve this page' link.
          {% endcomment %}
          <h2 {% if page.no-wrap == true %}style="display: inline-block;"{% endif %}><a id="canfar-beta" class="anchor" href="#canfar-beta" aria-hidden="true">
                <span aria-hidden="true" class="octicon octicon-link"></span></a>{{ child_item.name }}</h2>
          {{ content }}
        </section>
      </div>
    </div>
  </div>
  </div>
</div>
{% include _page_footer.html %}
