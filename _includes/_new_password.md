<div class="row">
  <div class="col-4"></div>
  <div class="col-6">
    <div class="alert alert-success d-none" role="alert" id="success"></div>
    <div class="alert alert-danger d-none" role="alert" id="fail"></div>
    <form name="newPasswordForm" id="newPasswordForm" class="needs-validation" action="/access/control/resetPassword" method="POST">
        <div class="form-group">
          <label for="newPasswordReset" id="newPasswordLabel">New password:</label>
          <input type="password" id="newPasswordReset"
                name="new_password" class="form-control" required="required" />
        </div>
        <div class="form-group">
          <label for="confirmPasswordReset" id="confirmPasswordLabel">Confirm password:</label>
          <input type="password" id="confirmPasswordReset"
                name="confirmPassword"
                class="form-control" required="required" />
          <div id="validate" class="valid-feedback text-danger">Passwords should match.</div>
        </div>
        <button type="submit" name="submit_new_pass" id="submit_new_pass_button" value='Submit' tabindex="3" class="btn btn-primary">Submit</button>
        <button type="reset" name="reset_new_pass" id="reset_new_pass_button" value='Reset' tabindex="4" class="btn">Reset</button>
    </form>
  </div>
  <div class="col"></div>
</div>
<script type="text/javascript" src="/js/cadc.newpassword.js"></script>
