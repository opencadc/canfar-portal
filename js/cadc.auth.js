;(function($) {
  // Register namespace
  $.extend(true, window, {
    cadc: {
      auth: {
        UserDetailsForm: UserDetailsForm,
        i18n: {
          en: {
            USER_FIELDS_REQUIRED: 'All fields are required.',
            BOT_ERROR_HTML:
              '<p>Request Denied: bot error. Please contact us at <a href=mailto:cadc@nrc.ca>cadc@nrc.ca</a> to correct the problem</p>',
            USER_CREATE_GREET: 'Dear prospective user,',
            USER_CREATE_INFO_1:
              'Before we create an account for you we require certain information in order to provide current services and to assist in planning our future services. After reading the notice below, please complete the form below to begin your registration process.',
            USER_CREATE_INFO_2:
              'We take industry standard precautions to safeguard your personal information.  Under no circumstances is this information distributed.',
            USER_CREATE_IMPORTANT_INFO: 'Important information',
            USER_CREATE_INFO_3:
              'Registration is free but, because of our limited resources, is usually restricted to professional astronomers.  Data products are generally of little interest to the casual user. Registration is only required to search and retrieve proprietary archival data.',
            USER_CREATE_INFO_4:
              'Since we do try to reserve access to our archives to active researchers, our registration procedure is not automatic. New users are manually added to our database and are normally sent account information by e-mail within one business day of the submission of the registration form. If you do not receive this notice in a timely fashion please do not hesitate to contact us by phone or e-mail. Contact information is provided by the links below.',
            USER_UPDATE_DETAILS_INFO_1:
              'Edit the information shown below, and then click "Update" to update your Profile.',
            USER_UPDATE_DETAILS_INFO_2:
              'To change your Username please submit a request via the Contact Us link.',
            USER_DETAILS_VALIDATE_ALPHANUMERIC:
              'Alphanumeric characters only (a-z)(A-Z)(0-9)',
            USER_DETAILS_HEADER: 'Edit Profile for $1 ($2)',
            USER_DETAILS_ERROR_MESSAGE:
              'Error: unable to retrieve your Profile\nMessage from server: ',
            USER_EXISTS_ERROR_MESSAGE: 'Error: User already exists.',
            EMAIL_EXISTS_ERROR_MESSAGE:
              'There is already an account associated with this email address. Please contact us to resolve this situation <a href="mailto:cadc@nrc.ca">cadc@nrc.ca</a>.',
            UNKNOWN_ERROR: 'Unknown error.',
            USER_DETAILS_REQUIRED: '(required)',
            USER_DETAILS_USERNAME: 'Username: ',
            USER_DETAILS_PASSWORD: 'Password: ',
            USER_DETAILS_FIRST_NAME: 'First name(s): ',
            USER_DETAILS_LAST_NAME: 'Last name: ',
            USER_DETAILS_EMAIL: 'Email: ',
            USER_DETAILS_INSTITUTE: 'Institute: ',
            USER_DETAILS_ADDRESS: 'Address: ',
            USER_DETAILS_CITY: 'City: ',
            USER_DETAILS_COUNTRY: 'Country: ',
            USER_DETAILS_SUBMITUPDATE: 'Update',
            USER_DETAILS_SUBMITCREATE: 'Register',
            USER_DETAILS_CANCEL: 'Cancel',
            USER_DETAILS_RESET: 'Clear'
          },
          fr: {
            USER_FIELDS_REQUIRED: 'Tous les champs sont requis.',
            BOT_ERROR_HTML:
              '<p>Demande refusée: erreur bot. S\'il vous plaît nous contacter à l\'adresse <a href="mailto:ccda@cnrc.gc.ca">ccda@cnrc.gc.ca</a> pour corriger le problème.</p>',
            USER_CREATE_GREET: 'Cher utilisateur éventuel',
            USER_CREATE_INFO_1:
              "Avant de créer un compte pour vous, nous avons besoin de certaines informations pour notre base de données afin de fournir des services actuels et d'aider à la planification de nos futurs services.  Après avoir lu l'avis ci-dessous, s'il vous plaît compléter le formulaire ci-dessous pour commencer votre processus d'inscription.",
            USER_CREATE_INFO_2:
              "Nous prenons les précautions standards de l'industrie pour protéger vos renseignements personnels. Ces renseignements personnels ne seront pas disséminés à l'extérieur.",
            USER_CREATE_IMPORTANT_INFO: 'Informations importantes',
            USER_CREATE_INFO_3:
              "L'inscription est gratuite, mais, en raison de nos ressources limitées, est généralement limitée à des astronomes professionnels. Les données sont généralement de peu d'intérêt pour l'utilisateur occasionnel. L'inscription est requise uniquement pour rechercher et récupérer des données d'archives exclusives.",
            USER_CREATE_INFO_4:
              "Puisque nous essayons de réserver un accès à nos archives aux chercheurs actifs, notre procédure d'inscription n'est pas automatique. Les nouveaux utilisateurs sont ajoutés manuellement à notre base de données et sont normalement envoyées les informations du compte par courriel dans un délai d'un jour ouvrable de la soumission du formulaire d'inscription. Si vous ne recevez pas cet avis dans un délai raisonnable, n'hésitez pas à nous contacter par téléphone ou par courriel.  L'information pour nous contacter est fournie par les liens ci-dessous.",
            USER_UPDATE_DETAILS_INFO_1:
              'Modifiez les informations ci-dessous et cliquez "Actualiser" pour actualiser votre profil.',
            USER_UPDATE_DETAILS_INFO_2:
              "Pour changer votre nom d'utilisateur, veuillez soumettre une demande via le lien Contactez-nous.",
            USER_DETAILS_VALIDATE_ALPHANUMERIC:
              'Uniquement des caractères alphanumériques (a-z)(A-Z)(0-9)',
            USER_DETAILS_HEADER: 'Modifier le profil pour $1 ($2)',
            USER_DETAILS_ERROR_MESSAGE:
              'Erreur: impossible de récupérer votre profil.',
            USER_EXISTS_ERROR_MESSAGE: 'Erreur: Le profil existe déja.',
            EMAIL_EXISTS_ERROR_MESSAGE:
              'Il existe déjà un compte associé à cette adresse courriel. S\'il vous plaît communiquez avec nous afin de résoudre cette situation <a href="mailto:ccda@cnrc.gc.ca">ccda@cnrc.gc.ca</a>.',
            UNKNOWN_ERROR: 'Erreur inconnue.',
            USER_DETAILS_REQUIRED: '(obligatoire)',
            USER_DETAILS_USERNAME: "Nom d'utilisateur: ",
            USER_DETAILS_PASSWORD: 'Mot de passe: ',
            USER_DETAILS_FIRST_NAME: 'Prénom(s): ',
            USER_DETAILS_LAST_NAME: 'Nom de famille: ',
            USER_DETAILS_EMAIL: 'Courriel: ',
            USER_DETAILS_INSTITUTE: 'Institut: ',
            USER_DETAILS_ADDRESS: 'Addresse: ',
            USER_DETAILS_CITY: 'Ville: ',
            USER_DETAILS_COUNTRY: 'Pays: ',
            USER_DETAILS_SUBMITUPDATE: 'Actualiser',
            USER_DETAILS_SUBMITCREATE: 'Soumettre la demande',
            USER_DETAILS_CANCEL: 'Annuler',
            USER_DETAILS_RESET: 'Effacer le formulaire'
          }
        }
      }
    }
  })

  /**
   * Construct a new User Details Form.  This depends on cadc.user.js for the
   * UserManager object.
   *
   * @param _$form          The jQuery form object.
   * @param _updateFlag     Flag to indicate this is an update form.
   * @param _autoInitFlag   Flag to initialize on creation.
   * @param _successURI     The URI destination on success.
   * @constructor
   */
  function UserDetailsForm(_$form, _updateFlag, _autoInitFlag, _successURI) {
    var _self = this

    this.$form = _$form
    this.updateFlag = _updateFlag
    this.successURI = _successURI

    function isUpdate() {
      return _self.updateFlag
    }

    /**
     * Tune the form to the user.
     *
     * @param _$user  The User information.
     */
    function populateForm(_$user) {
      var formAction = new org.opencadc.StringUtil().format(
        cadc.web.USER_ACCOUNT_ENDPOINT,
        [_$user.getUserID()]
      )

      _self.$form.attr('action', formAction)

      $('h2.align-center').text(
        $.i18n('USER_DETAILS_HEADER', _$user.getFullName(), _$user.getUserID())
      )

      $('#firstName').val(_$user.getFirstName())
      $('#lastName').val(_$user.getLastName())
      $('#email').val(_$user.getEmail())
      $('#institute').val(_$user.getInstitute())
      $('#address').val(_$user.getAddress())
      $('#city').val(_$user.getCity())
      $('#country').val(_$user.getCountry())
    }

    function formBusy() {
      _self.$form.addClass('form_busy')
    }

    function formReady() {
      _self.$form.removeClass('form_busy')
    }

    /**
     * Show error panel.
     * @param {String} message  String message.
     * @param {[]]}   fields    Array of jQuery input fields.
     */
    function error(message, fields) {
      var $errContainer = $('#request_form_error')
      $errContainer.find('.panel-body').text(message)
      $errContainer.removeClass('hidden')

      if (fields) {
        fields.each(function($field) {
          $field.parents('.form-group').addClass('has-error')
        })
      }
    }

    function clearError() {
      var $errContainer = $('#request_form_error')
      $errContainer.addClass('hidden')
      $errContainer.find('.panel-body').empty()
      _self.$form
        .find('input')
        .parents('.form-group')
        .removeClass('has-error')
    }

    function formIsValid() {
      var returnVal = true

/*
      if (_self.$form.find('#blank').val() !== '') {
        error($.i18n('BOT_ERROR_HTML'))
        returnVal = false
      }
*/

      var hasError = false

      _self.$form.find('input[required="required"]').each(function() {
        var $input = $(this)
        var val = $.trim($input.val()) + ''

        // Empty or null
        if (!val) {
          hasError = true
        }

        if (hasError) {
          error($.i18n('USER_FIELDS_REQUIRED'))
          return false
        }
      })

      return returnVal && hasError === false
    }

    function initUpdate(event, args) {
      var $user = args.user
      var userManager = args.userManager

      if (!$user) {
        var message = $.i18n('USER_DETAILS_ERROR_MESSAGE')

        if (args.errorStatus === 401) {
          message = 'Login required.'
        } else {
          message = args.errorMessage
        }

        error(message)
      } else {
        var $submitButton = _self.$form.find('input:submit')
        var $cancelButton = _self.$form.find('input#cancel')

        // Update some form elements.
        var updateLabel = $.i18n('USER_DETAILS_SUBMITUPDATE')
        var cancelLabel = $.i18n('USER_DETAILS_CANCEL')
        $submitButton.attr('name', updateLabel)
        $submitButton.attr('value', updateLabel)

        $cancelButton.attr('name', cancelLabel)
        $cancelButton.attr('value', cancelLabel)

        populateForm($user)
      }

      formReady()

      // return to the previous page
      $('#cancel').click(function() {
        window.location.replace(document.referrer)
      })

      // turn the form submission into an ajax request
      _self.$form.submit(function() {
        clearError()

        if (formIsValid()) {
          userManager.updateUser(
            _self.$form.find("[data-personal-detail='true']")
          )
        }

        return false
      })
    }

    /**
     * Serialize the form data in appropriate JSON format.  This is used for
     * a CREATE operation as it sends the username and password as a user
     * request.
     * @returns {String}
     */
    function serializeFormDataAsJSON() {
      var userManager = new cadc.web.UserManager()

      var userJSON = userManager.serializeFormDataAsJSON(
        _self.$form.find('#username').val(),
        _self.$form.find("[data-personal-detail='true']")
      )

      var formDataJSON = {}

      formDataJSON.userRequest = {}
      formDataJSON.userRequest.user = JSON.parse(userJSON).user

      formDataJSON.userRequest.password = {
        $: _self.$form.find('#password').val()
      }

      return JSON.stringify(formDataJSON)
    }

    function initCreate() {
      $('input#cancel').remove()

      var submitButtonLabel = $.i18n('USER_DETAILS_SUBMITCREATE')
      var resetButtonLabel = $.i18n('USER_DETAILS_RESET')
      var $submitButton = _self.$form.find('input:submit')
      var $resetButton = _self.$form.find('input#reset')

      $submitButton.attr('name', submitButtonLabel)
      $submitButton.attr('value', submitButtonLabel)

      $resetButton.attr('name', resetButtonLabel)
      $resetButton.attr('value', resetButtonLabel)

      $resetButton.click(function() {
        clearError()
      })

      _self.$form.submit(function(event) {
        event.preventDefault()
        clearError()

        if (formIsValid()) {
          var formDataJSON = serializeFormDataAsJSON()
          var emailValue = $(this)
            .find('#email')
            .val()

          $.ajax({
            url: cadc.web.USER_CREATE_ENDPOINT,
            method: 'PUT',
            headers: { Accept: 'application/json' },
            data: formDataJSON
          })
            .done(function() {
              // send the user to the URL in the
              // response message
              window.location.replace(_self.successURI)
            })
            .fail(function(xhr) {
              // clear the password field
              // and show an error message
              var message
              if (xhr.status === 409) {
                var responseText = xhr.responseText
                message = $.i18n('USER_EXISTS_ERROR_MESSAGE')
                _self.$form.find('#email-form-group').addClass('has-error')
                _self.$form.find('#username-form-group').addClass('has-error')
              } else {
                message = $.i18n('UNKNOWN_ERROR')
              }

              error(message)
            })
        }

        return false
      })
    }

    function init() {
      // Initialize, using the lang attribute of the html document.
      var i18n = $.i18n()
      i18n.locale = "en"  // TODO: set the default language 'en' somewhere else
      i18n.load(cadc.auth.i18n[i18n.locale], i18n.locale)

      _self.$form
        .find('input')
        .change(function() {
          clearError()
        })
        .change()

      $("input[name='language']").val(i18n.locale.toUpperCase())

      if (isUpdate()) {
        formBusy()
        var $userManager = new cadc.web.UserManager()

        // When the user is done loading, show it.
        $userManager.subscribe(cadc.web.events.onUserLoad, initUpdate)

        // When a user is successfully updated, redirect.
        $userManager.subscribe(cadc.web.events.onUserUpdate, function(
          eventData,
          args
        ) {
          if (args.errorMessage) {
            error(args.errorMessage)
          } else {
            // send the user to the URL in the response
            // message.
            window.location.replace(_self.successURI)
          }
        })

        // Start the loading process.
        $userManager.loadCurrent()
      } else {
        initCreate()
      }
    }

    if (_autoInitFlag) {
      init()
    }

    $.extend(this, {
      init: init,

      serializeFormDataAsJSON: serializeFormDataAsJSON
    })
  }
})(jQuery)
