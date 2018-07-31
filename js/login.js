(function($, window) {
  'use strict';

  $.extend(true, window, {
    'Login': Login
  });

  function Login() {
    function authorizationComplete(redirectURL) {
      window.location.replace(redirectURL);
    }

    var $loginForm = $("form.access-control");
    var requestURI = new cadc.web.util.currentURI();
    var hashValue = requestURI.getHash();

    var $_logout = $('#logout');
    if ($_logout) {
      $_logout.attr('href', $_logout.attr('href') + "?target="
        + encodeURI(requestURI.getURI()));
    }

    if (hashValue.indexOf("PASSWORD_RESET_SUCCESS") >= 0) {
      var $successMessageContainer = $("#success_message_container");
      $successMessageContainer.parent().removeClass("wb-invisible");
    }

    $("#cancel_login_button").click(function () {
      parent.history.back();
      return false;
    });

    // turn the form submission into an ajax request
    $loginForm.submit(function () {
      var $_form = $(this);
      var formData = $_form.serialize();
      if (formData.indexOf('target=') < 0) {
        formData += "&target="
          +
          encodeURI(requestURI.getURI());
      }

      $.ajax(
        {
          url: $_form.attr('action'),
          method: 'POST',
          data: formData
        }).done(function (message) {
          authorizationComplete(message);
        }).fail(function () {
          // clear the password field and show an error message
          $_form.find("#login_fail").text(
            "The username or password you entered is incorrect.");
        });

      return false;
    });
  }

  // In case this is imported directly into a page...
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Login;
})(jQuery);
