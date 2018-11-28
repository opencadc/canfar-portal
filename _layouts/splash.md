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
{% assign cadc_url = site.env[site.site_env].cadc %}
{% assign canfar_url = site.env[site.site_env].canfar %}
{% assign apps_url = site.env[site.site_env].apps %}

<div id="stars"></div>
<div class="container">
  <div class="py-3 pb-md-5">
    <div class="row">
      <!-- <div class="col-md-7 mb-4 text-center"> -->
      <div class="col-md-12 order-1 mb-4 text-center">
        <h2 class="mt-5 h4 text-left font-weight-light">Canadian Advanced Network for Astronomical Research</h2>
        <div role="toolbar" aria-label="Action button toolbar" class="pt-2 text-left">
          <a href="docs/quick_start/" class="btn btn-outline-info mr-3 font-weight-bold">Take the tour</a>
          <a href="docs/" class="btn btn-primary">Documentation</a>
        </div>
        <br />
        <div class="mt-md-5">
          <div class="row text-center mb-3">
            <div class="mx-1 col">
              <a href="http://{{ apps_url }}/storage/list" class="text-secondary" data-toggle="tooltip" data-placement="top" title="Manage your VOSpace">
                <i class="fas fa-hdd service-link"></i>
              </a>
              <div>
                <span>Storage Management</span>
              </div>
            </div>
            <div class="mx-1 col">
              <a href="http://{{ apps_url }}/gmui" class="text-secondary" data-toggle="tooltip" data-placement="top" title="Manage your CANFAR teams">
                <i class="fas fa-users service-link"></i>
              </a>
              <div>
                <span>Team Management</span>
              </div>
            </div>
            <div class="mx-1 col">
              <a href="http://{{ apps_url }}/citation" class="text-secondary" data-toggle="tooltip" data-placement="top" title="Manager your Digital Object Identifiers">
                <i class="fas fa-link service-link"></i>
              </a>
              <div>
                <span>DOI Management</span>
              </div>
            </div>
          </div>
          <br />
          <div class="row text-center mb-3">
            <div class="mx-1 col">
              <a href="http://{{ apps_url }}/processing/batchjobs" class="text-secondary" data-toggle="tooltip" data-placement="top" title="Cloud processing on CANFAR resources">
                <i class="fas fa-microchip service-link"></i>
              </a>
              <div>
                <span>Batch Processing</span>
              </div>
            </div>
            <div class="mx-1 col">
              <a href="http://demo.canfar.net/en/arcade" class="text-secondary" data-toggle="tooltip" data-placement="top" title="Cloud user sessions">
                <i class="fas fa-desktop service-link"></i>
              </a>
              <div>
                <span>Arcade</span>
              </div>
            </div>
            <div class="mx-1 col">
              <a href="http://{{ apps_url }}/processing/vmod" class="text-secondary" data-toggle="tooltip" data-placement="top" title="Interactive Virtual Machines">
                <i class="fas fa-power-off service-link"></i>
              </a>
              <div>
                <span>Open Stack</span>
              </div>
            </div>
          </div>
          <br />
          <div class="row text-center mt-3">
            <div class="mx-1 offset-mx-1 col">
              <a href="http://{{ cadc_url }}/en/search/" class="text-secondary" data-toggle="tooltip" data-placement="right" title="Search data collections at the Canadian Astronomy Data Centre">
                <i class="fas fa-archive service-link"></i>
              </a>
              <div>
                <span>CADC Search</span>
              </div>
            </div>
          </div>
        </div>
        <div class="d-none" id="request_form_error">
          <div class="card bg-transparent">
            <p class="card-header bg-danger">{{ form_error_title }}<br></p>
            <div class="card-body">
              <small class="card-text"></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="my-md-5 pt-md-3 border-top">
    <div class="row">
      <div class="col-12 col-md">
        <small class="d-block mb-3 text-muted">© 2018-2019</small>
      </div>
      <div class="col-6 col-md">
        <h5>Download</h5>
        <ul class="list-unstyled text-small">
          <li><a class="text-muted" href="https://pypi.org/search/?q=caom2%7Ccadc">Python applications</a></li>
          <!-- <li><a class="text-muted" href="#">Web services</a></li> -->
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5 hidden>Resources</h5>
        <div class="social-link-toolbar" role="toolbar">
          <a href="https://github.com/opencadc" class="social-link pl-sm-1" aria-label="Center Align">
            <i class="fab fa-github fa-3x" aria-hidden="true"></i>
          </a>
          <a href="https://twitter.com/astro_canfar" class="social-link" aria-label="Center Align">
            <i class="fab fa-twitter fa-3x" aria-hidden="true"></i>
          </a>
          <a href="/en/slack" class="social-link" aria-label="Center Align">
            <i class="fab fa-slack fa-3x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div class="col-6 col-md">
        <h5>About</h5>
        <ul class="list-unstyled text-small">
          <li><a class="text-muted" href="about/">CANFAR</a></li>
          <!-- <li><a class="text-muted" href="#">Astronomy</a></li> -->
          <li><a class="text-muted" href="https://www.nrc-cnrc.gc.ca/eng/notices/index.html#pr">Privacy</a></li>
          <li><a class="text-muted" href="about/terms-of-reference">Terms</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>Acknowledgements</h5>
        <ul class="list-unstyled text-small">
          <li><a class="text-muted" href="http://www.asc-csa.gc.ca/eng/">Canadian Space Agency</a></li>
          <li><a class="text-muted" href="http://www.nrc-cnrc.gc.ca/eng/">National Research Council</a></li>
          <li><a class="text-muted" href="https://www.canarie.ca/language/?lang_default=en">Canarie</a></li>
          <li><a class="text-muted" href="https://www.computecanada.ca/">Compute Canada</a></li>
        </ul>
      </div>
    </div>
  </footer>
  {% include _page_footer.html %}
</div>
<!-- Internationalization libraries -->
<script type="text/javascript" src="/js/jquery.i18n.js"></script>
<script type="text/javascript" src="/js/jquery.i18n.messagestore.js"></script>
<script type="text/javascript" src="/js/jquery.i18n.fallbacks.js"></script>
<script type="text/javascript" src="/js/jquery.i18n.parser.js"></script>
<script type="text/javascript" src="/js/jquery.i18n.emitter.js"></script>
<script type="text/javascript" src="/js/jquery.i18n.language.js"></script>
<script type="text/javascript" src="/js/cadc.auth.js"></script>
<script type="text/javascript">
  $(document).ready(function () {
    var successURI = '{{ successURI }}';
    var formName = '{{ formName }}';
    new cadc.auth.UserDetailsForm($('#' + formName), false,
      true, successURI);
  });
</script>
