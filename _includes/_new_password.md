<div class="row">
  <div class="col-4"></div>
  <div class="col-6">
  <form name="newPasswordForm" id="newPasswordForm" action="/access/control/resetPassword" method="POST">
      <div class="form-group">
        <label for="newPasswordReset" id="newPasswordLabel">New password:</label>
        <input type="password" id="newPasswordReset"
              name="new_password" size="60" class="form-control" required="required" />
        <small id="required_text" class="text-danger">* required</small>
      </div>
      <div class="form-group">
        <label for="confirmPasswordReset" id="confirmPasswordLabel">Confirm password:</label>
        <input type="password" id="confirmPasswordReset"
              name="confirmPassword"
              class="form-control"
              size="60" tabindex="2" required="required" />
      </div>
      <button type="submit" name="submit_new_pass" id="submit_new_pass_button" value='Submit' tabindex="3" class="btn btn-primary">Submit</button>
      <button type="reset" name="reset_new_pass" id="reset_new_pass_button" value='Reset' tabindex="4" class="btn">Reset</button>
  </form>
  </div>
  <div class="col"></div>
</div>
<script type="text/javascript">
$(document).on('pageinit', function() {
  var resetPasswordFeature = (function() {
    var $form = $('#newPasswordForm')
    var currentURI = cadc.web.util.currentURI()
    var newPasswordFieldID = 'newPasswordReset'
    var tokenValue = currentURI.getQueryValue('token')
    var $newPassword = $form.find("[id='" + newPasswordFieldID + "']")
    var $newPasswordLabel = $form.find('#newPasswordLabel')
    var $langLink = $('#gcwu-gcnb-lang').find('a')

    $form.find('input').change(function() {
      var fieldID = $(this).attr('id')
      var $fieldLabel = $form.find("label[for='" + fieldID + "']")
      clearErrors($form, $fieldLabel, fieldID + '-error')
    })

    var appendError = function(_$fieldLabel, _errorID, _message) {
      if (_$fieldLabel.children("[id='" + _errorID + "']").length === 0) {
        _$fieldLabel.append(
          '<strong id="' +
            _errorID +
            '" class="error custom"><span class="prefix"></span>' +
            _message +
            '</strong>'
        )
      }
    }

    if (tokenValue) {
      $langLink.attr(
        'href',
        $langLink.attr('href') + '?token=' + encodeURIComponent(tokenValue)
      )
    } else {
      appendError(
        $newPasswordLabel,
        newPasswordFieldID + '-error',
        $.i18n('invalid_reset_password_link')
      )
      $form.find(':submit').prop('disabled', true)
    }

    var clearErrors = function(_$form, _$fieldLabel, _errorID) {
      _$form.find('#errors-' + _$form.attr('id')).remove()
      _$fieldLabel.children("[id='" + _errorID + "']").remove()
    }

    var ready = function(_loginRedirectLocation) {
      $form.submit(function(e) {
        var $thisForm = $(this)
        clearErrors($thisForm, $newPasswordLabel, newPasswordFieldID + '-error')
        e.preventDefault()

        $thisForm.validate()

        if ($thisForm.valid()) {
          $.ajax({
            url: '/access/control/resetPassword',
            method: 'post',
            data: {
              token: decodeURIComponent(tokenValue),
              password: $newPassword.val()
            }
          })
            .done(function() {
              window.location.replace(
                _loginRedirectLocation + '#PASSWORD_RESET_SUCCESS'
              )
            })
            .fail(function(request, status, error) {
              var statusCode = request.status
              var message = $.i18n(
                statusCode === 401 || statusCode === 403
                  ? 'invalid_reset_password_link'
                  : 'unknown_error'
              )

              appendError(
                $newPasswordLabel,
                newPasswordFieldID + '-error',
                message
              )
            })
        }

        return false
      })
    }

    return {
      ready: ready
    }

})()

resetPasswordFeature.ready('<!--#echo encoding="none" var="loginURI"-->')
})

</script>
