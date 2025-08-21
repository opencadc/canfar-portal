---
layout: default
---

{% include _page_header.html %} {% include bs_maintenance_message_en.html %}
{% assign pagetitle = "Account Request" %}
{% assign LAST_MOD = "$LastChangeDate$" %}
{% assign formName = "register" %}
{% assign formAction = "/ac/userRequests" %}
{% assign form_error_title = "Unable to process" %}
{% assign form_error_message = "All fields are required" %}
{% assign successURI = "/en/register/requestSubmitted.html" %}

<div id="stars"></div>
<div class="container">
  <div class="py-3 pb-md-5">
    <div class="row">
      <div class="col-md-12 order-1 mb-4 text-center">
        <h2 class="mt-5 h4 text-left font-weight-light">Canadian Advanced Network for Astronomical Research</h2>
        <div role="toolbar" aria-label="Action button toolbar" class="pt-2 text-left">
          <a href="docs/overview/" class="btn btn-outline-info mr-3 font-weight-bold">Check what CANFAR offers</a>
        </div>
        <br />
        <div class="mt-md-5">
          <div class="row text-center mb-3">
            <div class="mx-1 col">
              <a href="{{ t['services']['storage'].link }}" class="text-secondary">
                <i class="fas fa-hdd service-link" data-toggle="tooltip" data-placement="top" title="Manage your VOSpace"></i>
              </a>
              <div>
                <span>{{ t['services']['storage'].name }}</span>
              </div>
            </div>
            <div class="mx-1 col">
              <a href="" target="_blank" id="gmui_link" class="text-secondary">
                <i class="fas fa-users service-link" data-toggle="tooltip" data-placement="top" title="Manage your CADC groups"></i>
              </a>
              <div>
                <span>Group Management</span>
              </div>
            </div>
            <div class="mx-1 col">
              <a href="/citation" class="text-secondary">
                <i class="fas fa-link service-link" data-toggle="tooltip" data-placement="top" title="Publish your data using VOSpace and Digital Object Identifiers"></i>
              </a>
              <div>
                <span>Data Publication</span>
              </div>
            </div>
          </div>
          <br />
          <div class="row text-center mb-3">
            <div class="mx-1 col">
              <a href="https://arbutus-canfar.cloud.computecanada.ca" class="text-secondary" rel="external">
                <i class="fas fa-power-off service-link" data-toggle="tooltip" data-placement="top" title="Interactive Virtual Machines"></i>
              </a>
              <div>
                <span>Open Stack</span>
              </div>
            </div>
            <div class="mx-1 col">
                <a href="{{ cadc_url }}/en/search/" class="text-secondary">
                  <i class="fas fa-star service-link" data-toggle="tooltip" data-placement="right" title="Search data collections at the Canadian Astronomy Data Centre"></i>
                </a>
                <div>
                  <span>CADC Search</span>
                </div>
            </div>
            <div class="mx-1 col">
                <a href="/science-portal" class="text-secondary">
                  <i class="fas fa-cubes service-link " data-toggle="tooltip" data-placement="top" title="Science Portal sessions"></i>
                </a>
                <div>
                  <span>Science Portal</span>
                </div>
              </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="my-md-5 pt-md-3 border-top container">
    <div class="row">
      <small class="d-block mb-3 text-muted col-md">&copy; 2022-{{ 'now' | date: "%Y" }}</small>
    </div>
    <div class="row">
      <div class="col-3 col-md">
        <h5>Download</h5>
        <ul class="list-unstyled text-small">
          <li><a class="text-muted" href="https://www.opencadc.org/canfar/latest/client/home/">Science Platform Client</a></li>
          <li><a class="text-muted" href="https://www.opencadc.org/canfar/latest/platform/guides/storage/vospace-api/">VOSpace Client</a></li>
        </ul>
      </div>
      <div class="col-3 col-md">
        <h5 hidden>Resources</h5>
        <div class="social-link-toolbar" role="toolbar">
          <a href="https://github.com/opencadc" class="social-link pl-sm-1" aria-label="Center Align">
            <i class="fab fa-brands fa-github fa-3x" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="See the OpenCADC GitHub page"></i>
          </a>
          <a href="https://discord.gg/vcCQ8QBvBa" class="social-link pl-sm-1" aria-label="Center Align">
            <i class="fab fa-brands fa-discord fa-3x" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Join the CANFAR Discord"></i>
          </a>
        </div>
      </div>
      <div class="col-3 col-md">
        <h5>About</h5>
        <ul class="list-unstyled text-small">
          <li><a class="text-muted" href="{{ page_lang_link }}{{ t['about'].link }}{{ t['about']['organization'].link }}">CANFAR</a></li>
          <li><a class="text-muted" href="about/terms-of-reference">Terms</a></li>
        </ul>
      </div>
    </div>
  </footer>
  {% include _page_footer.html %}
</div>
<script>
  $(document).ready(function() {
    // Change the user-related menu items to point to
    // URLs provided via /reg/applications
    var redirectUtil = new ca.nrc.cadc.RedirectUtil()
    redirectUtil.setHrefToUri(ca.nrc.cadc.accountURI.gmui, ['gmui_link'])
  })
</script>
