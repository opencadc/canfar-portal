window.addEventListener('load', function() {
  'use strict'
  $(document).ready(function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')
    var $confirmPassword = $('#confirmPasswordReset')
    var $password = $('#newPasswordReset')
    var $validate = $('#validate')
    // check match

    $confirmPassword.off().change(function(event) {
      $confirmPassword.parents('form').removeClass('was-validated')
      if ($password.val() !== $confirmPassword.val()) {
        $validate.html('Passwords Should Match').show()
        $confirmPassword.addClass('is-invalid')
      } else {
        $validate.html('').hide()
        $confirmPassword.removeClass('is-invalid')
      }
    })

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function(form) {
      form.addEventListener(
        'submit',
        function(event) {
          $validate.html('')
          var currentURI = cadc.web.util.currentURI()
          var tokenValue = currentURI.getQueryValue('token')
          $confirmPassword.removeClass('is-invalid')
          if (form.checkValidity() === true) {
            if ($password.val() !== $confirmPassword.val()) {
              $validate.html('Passwords Should Match')
              $confirmPassword.addClass('is-invalid')
            } else {
              $validate.html('')
              form.classList.add('was-validated')
              $confirmPassword.removeClass('is-invalid')

              $.ajax({
                url: '/access/control/resetPassword',
                method: 'post',
                data: {
                  token: decodeURIComponent(tokenValue),
                  password: $password.val()
                }
              })
                .done(function() {
                  $('#success')
                    .text('Password changed successfully!')
                    .removeClass('d-none')
                })
                .fail(function(request, status, error) {
                  var statusCode = request.status
                  var message = ''
                  switch (statusCode) {
                    case 404: {
                      message = 'Unable to access CANFAR services.'
                      break
                    }

                    case 403:
                    case 401: {
                      message = 'Bad token or invalid link.'
                      break
                    }

                    default: {
                      message = `Unknown error occurred.  Reponse code ${statusCode}`
                    }
                  }

                  $('#fail')
                    .text(message)
                    .removeClass('d-none')
                })
            }
          }
          event.preventDefault()
          event.stopPropagation()
        },
        false
      )
    })
  })
})
