---
layout: default
---

<div id="container" class="container-fluid">
  <div class="row">
    {% include _page_header.html %}

    <div class="inner">
      <section id="main_content">
        <h3><a id="canfar-beta" class="anchor" href="#canfar-beta" aria-hidden="true">
          <span aria-hidden="true" class="octicon octicon-link"></span></a>{{ t[page.namespace].name }}</h3>

        {{ content }}

      </section>
    </div>

    {% include _page_footer.html %}

  </div>
</div>