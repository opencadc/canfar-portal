---

layout: default
---

{% include _page_header.html %} {% include bs_maintenance_message_en.html %}

<div class="container">
  <div class="row">
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
    <section id="information_section">
      <div class="row">
        <div class="col-md-4">
          <h3 class="text-info information_section_capture">Research cyberinfrastructure for the Canadian astronomical community</h3>
          <p>The Canadian Advanced Network for Astronomy Research is a national platform
            for data-intensive scientific computing.</p>
          <p>CANFAR is a consortium of Canadian university astronomers, Compute Canada,
            and the National Research Council Canada’s Canadian Astronomy Data Centre
            with support from CANARIE and the Canadian Space Agency.</p>
          <p>CANFAR services include:</p>
          <ul>
            <li>Archival data storage for major Canadian and international observatories
              and projects
            </li>
            <li>Cloud processing</li>
            <li>Infrastructure for visualization and analytics on massive datasets</li>
            <li>User-managed storage for research teams</li>
            <li>Innovative development to keep Canadian science at the leading edge</li>
          </ul>
        </div>
        <!-- 
          Information modules 
        -->
        <div id="information_content" class="col-md-8">
          <div class="col-md-4">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">{{ t['nodes'].name }} </h3>
              </div>
              <div class="panel-body">
                {% assign nodes_posts = site.posts | where: 'category', 'nodes' %}
                {% for node in site.data.menudata.nodes %}
                {% capture node_post_url %}{{ t[node].link | prepend: site.baseurl }}{% endcapture %}
                {% capture node_namespace %}nodes.{{ node }}{% endcapture %}
                <div class="media">
                  <div class="media-body">
                    <h4 class="media-heading"><span class="glyphicon glyphicon-chevron-right"></span>{% include _link_item.md namespace=node_namespace link_only=true %}</h4>
                  </div>
                </div>
                {% endfor %}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">{{ t['science'].name }} </h3>
              </div>
              <div class="panel-body">
                {% assign science_posts = site.posts | where: 'category', 'science' %}
                {% for post in science_posts limit: 7 %}
                <div class="media">
                  <div class="media-body">
                    {% if post.external_url %}
                      {% assign post_url = post.external_url %}
                    {% else %}
                      {% assign post_url = post.url | prepend: site.baseurl %}
                    {% endif %}
                    <h4 class="media-heading"><span class="glyphicon glyphicon-chevron-right"></span>&nbsp;<a href="{{ post_url }}">{{ post.title }}{% if post.author %} by {{ post.author }}{% endif %}</a></h4>
                    <time datetime="{{ post.date }}">{{ post.date | date: '%B %d, %Y' }}</time>
                    {{ post.excerpt | strip_html | truncatewords:10 }}
                  </div>
                </div>
                {% endfor %}
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="panel panel-default">
              {% assign translated_services = t['resources']['services'] %}
              <div class="panel-heading">
                <h3 class="panel-title">{{ translated_services.name }} </h3>
              </div>
              <div class="panel-body">
                {% assign services_posts = site.posts | where: 'category', 'services' %}
                {% comment %}Only the first four service posts (latest) are used.{% endcomment %}
                {% for post in services_posts %}
                {% assign translated_item = translated_services[post.local_name] %}
                {% capture service_post_url %}{{ translated_item.link | prepend: site.baseurl }}{% endcapture %}
                <div class="media">
                  <div class="media-body">
                    <h4 class="media-heading"><span class="glyphicon glyphicon-chevron-right"></span>{% include _link_item.md namespace=post.namespace link_only=true %}</h4>
                    {{ post.excerpt | strip_html | truncatewords:10 }}
                  </div>
                </div>
              {% endfor %}
              </div>
            </div>
          </div>
        </div>
        <!-- 
          End information modules 
        -->
      </div>
    </section>
    <hr />
    <div id="partner_links">
      {% assign translated_partners = t['partners'] %}
      {% for partner_key in translated_partners %}
      {% assign pk = partner_key[0] %}
      {% assign partner = translated_partners[pk] %}
      <div class="col-md-{{ partner.size }} {{ pk }}_logo">
        <a href="{{ partner.url }}" title="{{ partner.name }} {{ t['home'].name }}"><img alt="{{ partner.name }}" src="{{ partner.img | prepend: site.baseurl }}" /></a>
      </div>
      {% endfor %}
    </div>
    {% include _page_footer.html %}
  </div>
</div>
