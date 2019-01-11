<div class="col-sm-12">
  <div class="card">
    <p class="card-header bg-warning">
      {{ forgot_passwd_instructions }}
    </p>
    <div class="card-body">
      <form name="forgotForm" id="forgotForm" method="post" action="#" class="form-horizontal">
        <div class="row">
          <div id="email_form_group" class="form-group col-sm-12">
            <label for="emailAddress" style="margin-top: 0.4rem" id="emailAddressLabel" class="col-sm-2 control-label float-left text-right">
              {{ forgot_passwd_email_label }}
            </label>
            <div class="col-sm-9 float-left">
              <input class="form-control" type="email" id="emailAddress" name="emailAddress" required="required" tabindex="1"
                     placeholder="{{ forgot_passwd_email_help_block }}" />
              <span id="email_help_block" class="help-block text-danger"></span>
            </div>
          </div>

          <!-- Hidden items that need to be carried to the server. -->
          <div class="d-none form-group">
            <input class="form-input" type="d-none" id="loginURI" name="loginURI" tabindex="-1" value="{{ forgot_passwd_login_uri }}" />
            <input class="form-input" type="d-none" id="role" name="role" tabindex="-1" value="{{ forgot_passwd_role }}" />
            <input class="form-input" type="d-none" id="pageLanguage" name="pageLanguage" tabindex="-1" value="{{ forgot_passwd_page_language }}" />
          </div>
          <!-- End hidden items. -->

          <div class="form-group col-sm-12">
            <div class="offset-sm-2 col-sm-9">
              <input type="submit" name="forgot" id="forgot_button"
                     value="{{ forgot_passwd_submit_button_label }}" tabindex="2"
              class="btn btn-primary"/>
            </div>
          </div>

          <div class="col-sm-12">
            <div class="offset-sm-2 col-sm-9 ">
              <a href="{{ requestAccountURI }}" tabindex="6"
              title="{{ forgot_passwd_request_label }}" id="register_cadc">{{ forgot_passwd_request_label }}</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
