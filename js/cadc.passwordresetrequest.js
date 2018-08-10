$(document).ready(function()
                  {
                    var $forgotForm = $("#forgotForm");
                    var emailFieldID = "emailAddress";
                    var errorMessageID = "email_help_block";
                    var $emailFieldLabel = $forgotForm.find("label[for='"
                                                            + emailFieldID + "']");
                    var $emailField = $forgotForm.find("[id='" + emailFieldID
                                                      + "']");
                    var $submitButton = $forgotForm.find("input:submit");

                    var clearErrors = function(event)
                    {
                      $('[id="' + errorMessageID + '"]').empty();
                      $('#email_form_group').removeClass('has-error');
                    };

                    $emailField.change(function(e)
                                       {
                                         clearErrors(e);
                                         formReady();
                                       }).change();

                    function appendErrorIfNotPresent(_message)
                    {
                      $('[id="' + errorMessageID + '"]').text(_message);
                      $('#email_form_group').addClass('has-error');
                    }

                    function formBusy()
                    {
                      $emailField.addClass("input-");
                      $emailField.prop("disabled", true);
                      $submitButton.prop("disabled", true);
                    }

                    function formReady()
                    {
                      $emailField.removeClass("busy");
                      $emailField.prop("disabled", false);
                      $submitButton.prop("disabled", false);
                    }

                    $forgotForm.submit(function(e)
                                       {
                                         clearErrors(e);
                                         e.preventDefault();

                                         $.ajax({
                                                  url: "/access/passwordResetRequest",
                                                  method: "POST",
                                                  data: $forgotForm.serialize()
                                                })
                                           .done(function(redirectLocation)
                                                 {
                                                   window.location.replace(redirectLocation);
                                                 })
                                           .fail(function(request)
                                                 {
                                                   appendErrorIfNotPresent(request.responseText);
                                                 })
                                           .always(function()
                                                   {
                                                     formReady();
                                                   });

                                         formBusy();

                                         return false;
                                       });
                  });