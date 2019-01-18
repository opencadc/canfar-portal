//
// arcade.js
//
// Controller for Arcade VNC Session launching app.
//

$(document).ready(function() {
  getDatabenchSession()
})

// ---------------- Page load functions ---------------

// #auth_modal is in _page_header.html
// the other items are expected to be in index_en.md
function setNotAuthenticated() {

  // parameters here prevent closing the modal by clicking on the background
  // or using esc key
  $('#authen_modal').modal({
    backdrop: 'static',
    keyboard: false
  })

  $('.arcade-authenticated').addClass('d-none')
  $('.arcade-not-authenticated').removeClass('d-none')

  $('#arcade_login_button').click(function() {
    $('#authen_modal').modal('show')}
  )

  // hide and disable the close button on the authentication
  // modal because authentication
  // is required for using this page
  $('#authen_modal button.close').addClass('disabled')
  $('#authen_modal button.close').addClass('d-none')

}

// ---------------- arcade.canfar.net ajax functions & response handlers ---------------

function handleAjaxFail(message) {
  setProgressBar(false)
  // Clear entire modal plus backdrop so they don't stack
  $('#infoModal').modal('hide')
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  $('.session-failed').removeClass('d-none')
  $('.session-started').addClass('d-none')
  $('.session-starting').addClass('d-none')

  var errorMsg = ''
  switch (message.status) {
    case 401:
    case 403:
      setNotAuthenticated()
      break
    default:
      errorMsg =
        'Unable to list sessions: ' +
        message.status +
        ':  ' +
        message.responseText
      setInfoModal('Error', errorMsg, false, true)
      break
  }
}

function forwardTo(sessionName) {
  // Forward to the session
  if (typeof sessionName !== 'undefined' && sessionName !== '') {
    setInfoModal(
        'Forwarded to session ',
        'Please refresh page to access...',
        false,
        true
    )
    // Close modal, leave message about refreshing this page to access the session.
    $('#infoModal').modal('hide')
    $('.session-starting').addClass('d-none')
    $('.session-started').removeClass('d-none')
    setProgressBar('okay')
    window.open(sessionName, '_self')
  }
}

function postSession(formData) {
  setInfoModal(
      'Please wait ',
      'Establishing session.. (may take up to 10 seconds)',
      true,
      false
  )

  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest()

    // 'load' is the XMLHttpRequest 'finished' event
    request.addEventListener(
        'load',
        function () {
          if (request.status == '200') {
              // forward to the session
            setProgressBar(true)
            setInfoModal(
                'Please wait ',
                'Forwarding to session...',
                false,
                false
            )
            resolve(request.responseURL)
          } else {
            reject(request)
          }
        },
        false
    )
    request.withCredentials = true
    request.open('POST', 'http://arcade.canfar.net/quarry/session')
    request.send(formData)
  })
}

function getDatabenchSession() {
  getSession().then(sessionURL => forwardTo(sessionURL))
      .catch(message => handleAjaxFail(message))
}

function getSession() {
  setProgressBar(true)
  setInfoModal(
      'Please wait ',
      'Checking for existing session...',
      true,
      false
  )
  
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest()

    // 'load' is the XMLHttpRequest 'finished' event
    request.addEventListener(
        'load',
        function () {
          if (request.status == '200') {
            if (request.responseText === '') {
              // request a session
              // have to put another embedded promise in here, I think... not sure
              // how that will play out with the outer ones, though. :(

              var params = new FormData()
              params.append( 'name', 'hjeeves-test')
              postSession(params).then(sessionName => forwardTo(sessionName))
                  .catch(message => handleAjaxFail(message))
            } else {
              // Get URL to forward to
              var dataArray = request.responseText.split('\n')

              var sessionURL = ''
              for (i = 0; i < dataArray.length - 1; i++) {
                var rowData = dataArray[i].split('\t')
                sessionURL = rowData[2]
              }

              setInfoModal(
                  'Please wait ',
                  'Session found, forwarding...',
                  false,
                  false
              )
            }
            resolve(sessionURL)
          } else {
            reject(request)
          }
        },
        false
        )
    request.withCredentials = true
    request.open('GET', 'http://arcade.canfar.net/quarry/session')
    request.send(null)
  })
}

// ------------ Panel & modal management functions --------------

function setProgressBar(busy) {
  if (busy === true) {
    $('.session-table-progress').addClass('progress-bar-striped')
  } else {
    $('.session-table-progress').removeClass('progress-bar-striped')
  }
}

function setInfoModal(title, msg, hideThanks, hideSpinner) {
  $('.info-span').html(msg)
  $('#infoModalLongTitle').html(title)
  $('#infoModal').modal('show')

  if (hideThanks === true) {
    $('#infoThanks').addClass('d-none')
  } else {
    $('#infoThanks').removeClass('d-none')
  }

  if (hideSpinner === true) {
    $('.fa-spin').addClass('d-none')
  } else {
    $('.fa-spin').removeClass('d-none')
  }
}
