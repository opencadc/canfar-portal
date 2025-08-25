{% include __vars.md %} {% assign cadc_url = site.env[site.site_env].cadc %}

<nav id="top_nav" class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#canfar_navbar_collapse"
              aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
      </button>
      <a class="navbar-brand" href="{{ page_lang_link }}">
        <img src="{{ '/css/images/logo.png' | prepend: site.baseurl }}">
      </a>
    </div>
    <div id="canfar_navbar_collapse" class="collapse navbar-collapse">
      <ul id="navbar_list" class="nav navbar-nav pull-right">
        <li>
          <a class="p-2 text-dark" href="{{ t['docs'].link }}">{{ t['docs'].name }}</a>
        </li>
        <li class="dropdown">
          <a title="Services" id="services_dropdown" class="dropdown-toggle p-2 text-dark" data-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="">{{ t['_services'].name }}</a>
          <ul class="dropdown-menu list-unstyled">
            <li><a href="{{ t['services']['storage'].link }}" class="dropdown-item">{{ t['services']['storage'].name }}</a></li>
            <li><a href="{{ t['services']['group_management'].link }}" class="dropdown-item" id="gmui_redirect">{{ t['services']['group_management'].name }}</a></li>
            <li><a href="{{ t['services']['digital_object_identifiers'].link }}" class="dropdown-item">{{ t['services']['digital_object_identifiers'].name }}</a></li>
            <li><a href="{{ t['services']['openstack_cloud_portal'].link }}" class="dropdown-item">{{ t['services']['openstack_cloud_portal'].name }}</a></li>
            <li><a href="{{ t['services']['science_portal'].link }}" class="dropdown-item">{{ t['services']['science_portal'].name }}</a></li>
            <li><a href="{{ cadc_url }}{{ t['services']['caom_query_service'].link }}" class="dropdown-item">{{ t['services']['caom_query_service'].name }}</a></li>
          </ul>
        </li>
        <li>
            <a class="p-2 text-dark" href="{{ t['about'].link }}">{{ t['about'].name }}</a>
        </li>
        <li>
            <a class="p-2 text-dark" href="{{ t['open_source'].link }}" ref="external">{{ t['open_source'].name }}</a>
        </li>
        <li>
            <a title="Support" id="support_dropdown" class="dropdown-toggle p-2 text-dark" data-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="">{{ t['support'].name }}</a>
            <div class="dropdown-menu" aria-labelledby="support_dropdown">
                <a href="mailto:{{ t['support']['help_desk'].link }}" class="dropdown-item">{{ t['support']['help_desk'].name }}</a>
            </div>
        </li>
        <li class="dropdown canfar-access-control canfar-authenticated user-authenticated hidden">
          <a title="User actions." class="dropdown-toggle access-actions user-actions" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">
            <span class="auth-username canfar-auth-username"></span>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu list-unstyled">
            <li>
              <a href="" tabindex="2" title="Update profile"
                 class="dropdown-item account_access_info"
                 id="updateProfile">Update profile
              </a>
            </li>
            <li>
              <a href="" tabindex="3" title="Reset password"
                 class="dropdown-item account_access_info"
                 id="changePassword">Reset password
              </a>
            </li>
            <li>
              <a href="https://www.cadc-ccda.hia-iha.nrc-cnrc.gc.ca/cred/generate?daysValid=30" tabindex="4" title="Obtain a certificate" class="account_access_info"
                 id="obtainCert">Obtain a Certificate
              </a>
            </li>
            <li>
              <a id="logout" title="Logout." class="access-control" href="/access/logout">
                <span class="glyphicon glyphicon-log-out"></span> Logout</a>
            </li>
          </ul>
        </li>
        <li class="dropdown canfar-access-control canfar-anonymous user-anonymous hidden">
          <a title="Login form" class="dropdown-toggle access-actions login-form" role="button" aria-haspopup="true"
             aria-expanded="false" data-toggle="dropdown">Login
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu list-unstyled pull-right login-container">
            <li>
              <form class="form-inline access-control" id="loginForm" role="form" method="post" action="/access/login">
                <span id="login_fail" class="help-block text-danger pull-left"></span>
                <div class="form-group">
                  <label for="username" class="hidden" id="usernameLabel">Username</label>
                  <input type="text" id="username" name="username" class="form-control" tabindex="1" required="required"
                         placeholder="Username" />
                </div>
                <div class="form-group">
                  <label for="password" class="hidden" id="passwordLabel">Password</label>
                  <input type="password" id="password" name="password" class="form-control" tabindex="2" required="required"
                         placeholder="Password" />
                </div>
                <button type="submit" id="submitLogin" tabindex="2" class="btn btn-success">
                  <span class="glyphicon glyphicon-log-in"></span> Login
                </button>
              </form>
              <a href=""
                 class="account_access_info"
                 tabindex="5" title="Forgot Username" id="forgot_username_1">
                Forgot your Account information?</a>
              <a href=""
                 class="account_access_info"
                 tabindex="6" title="Register" id="register_cadc_1">
                Request a CADC Account</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- end .navbar-collapse -->
  </div>
  <!-- end .container -->
</nav>
<!-- Modal -->
<div class="modal fade" id="auth_modal" tabindex="-1" role="dialog" aria-labelledby="auth_modal_label">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="auth_modal_label">Authentication required
        </h4>
      </div>
      <form class="access-control" id="modalloginForm" role="form" method="post" action="/access/login">
        <div class="modal-body">
          <span id="modal_login_fail" class="text-danger help-block pull-left"></span>
          <div class="form-group">
            <label for="modalUsername" class="hidden" id="modalUsernameLabel">Username</label>
            <input type="text" id="modalUsername" name="username" class="form-control"
                   tabindex="1" required="required"
                   placeholder="CADC Username" />
          </div>
          <div class="form-group">
            <label for="modalPassword" class="hidden" id="modalPasswordLabel">Password</label>
            <input type="password" id="modalPassword" name="password" class="form-control" tabindex="2" required="required"
                   placeholder="Password" />
          </div>
          <a href="" tabindex="5" class="account_access_info" title="Forgot Username" id="forgot_username_2">
            Forgot your Account information?</a>
          <br />
          <a href=""
             class="account_access_info"
             tabindex="6" title="Register" id="register_cadc_2">
            Request a CADC Account</a>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-success">
            <span class="glyphicon glyphicon-log-in"></span> Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- BANNER WARNING -->
<!-- <div class="panel panel-warning">
  <div class="panel-heading"></div>
  <div class="panel-body">
    <p>Due to a planned power outage, CADC and CANFAR services will be unavailable from June 24, 1600PDT to June 25, 1600PDT.</p>
  </div>
</div> -->
<!-- END BANNER WARNING -->

<!-- Add Promises if missing/broken. -->
<script type="application/javascript" src="https://cdn.jsdelivr.net/npm/es6-promise/dist/es6-promise.auto.js"></script>
<!-- Found in canfar-root: tomcat(-canfar)/webapps/ROOT unless an absolue URL -->
<script type="text/javascript" src="/cadcJS/javascript/cadc.registry-client.js"></script>
<script type="text/javascript" src='/cadcJS/javascript/org.opencadc.js'></script>
<script type="text/javascript" src='/cadcJS/javascript/cadc.uri.js'></script>
<script type="text/javascript" src="/cadcJS/javascript/cadc.user.js"></script>
<script type="text/javascript" src="/cadcJS/javascript/login.js"></script>
<script type="text/javascript" src="/canfar/javascript/cadc.redirect.util.js"></script>

<!-- Adding gdpr cookie banner -->
<script type="text/javascript" src="/cadcJS/javascript/cadc.gdpr.cookie.js"></script>
<link  type="text/css" href="/canfar/css/cadc.gdpr.cookie.css" rel="stylesheet" media="screen">

<script>
  $(document).ready(function() {
    // Change the user-related menu items to point to
    // URLs provided via /reg/applications
    var redirectUtil = new ca.nrc.cadc.RedirectUtil()
    redirectUtil.setHrefToUri(ca.nrc.cadc.accountURI.gmui, ['gmui_redirect'])
  })
</script>
