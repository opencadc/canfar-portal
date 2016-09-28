---
layout: default

info_panels:
  - name: news
    max: 3
  - name: events
    max: 3
  - name: featured
    max: 1
---

<div id="container" class="container">
  <div class="row">

    {% include _page_header.html %}

    <section id="main_content">
      <div id="canfar-carousel" class="carousel slide"
           data-ride="carousel" data-keyboard="true">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          {% for showcase in site.data.showcases %}
          {% assign idx = forloop.index | minus: 1 %}
          <li data-target="#canfar-carousel" data-slide-to="{{ idx }}" {% if idx == 0 %}class="active"{% endif %}></li>
          {% endfor %}
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
          {% for showcase in site.data.showcases %}
          {% assign tagindex = forloop.index | minus: 1 %}
          <div class="item {% if forloop.index == 1 %}active{% endif %}" style="background-image: url('{{ showcase.img | prepend: site.baseurl }}');">
            <div class="carousel-caption">
              <h3>{{ showcase.title }}</h3>
              <p>{{ t.showcase_taglines[tagindex] }}</p>
            </div>
          </div>
          {% endfor %}
        </div>

        <!-- Controls -->
        <a class="left carousel-control" href="#canfar-carousel"
           role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"
                aria-hidden="true"></span>
          <span class="sr-only">{{ t.previous }}</span>
        </a>
        <a class="right carousel-control" href="#canfar-carousel"
           role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"
                aria-hidden="true"></span>
          <span class="sr-only">{{ t.next }}</span>
        </a>
      </div>

    </section>

    <section id="information_content">
      <div class="row">
        <div class="col-md-9 col-md-offset-3">

          {% for info_panel in layout.info_panels %}
          {% assign info_panel_name = info_panel.name %}
          <div class="col-md-4">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="text-primary panel-title"><a href="/{{ page.lang | prepend: site.baseurl }}{{ t[info_panel_name].link }}">{{ t[info_panel_name].name }} </a></h3>
              </div>
              <div class="panel-body">
                <ul class="media-list">
                {% assign count = 0 %}
                {% for post in site.posts %}
                  {% if post.category == info_panel_name and count < info_panel.max %}
                  {% assign count = count | plus: 1 %}
                  <li class="media">
                    <div class="media-left">
                      <a href="#"></a>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">{{ post.title }} </h4>
                      {{ post.excerpt }}
                    </div>
                  </li>
                  {% endif %}
                {% endfor %}
                </ul>
              </div>
            </div>
          </div>
          {% endfor %}
        </div>
      </div>
    </section>

    {% include _page_footer.html %}

  </div>
</div>