$(document).ready(function() {
  var sessionTable = $('#session_table').dataTable({
    ajax: {
      type: 'GET',
      url: 'http://arcade.canfar.net/quarry/session',
      xhrFields: { withCredentials: true },
      dataType: 'text',
      error: function(message) {
        if (
          $('.databench-authenticated').hasClass('d-none') ||
          message.status === 0
        ) {
          // not logged in, shouldn't have performed this call so quietly continue
        } else {
          handleAjaxFail(0, message)
        }
      },
      dataSrc: function(data) {
        var jsonTableData = []
        var dataArray = data.split('\n')
        for (i = 0; i < dataArray.length - 1; i++) {
          var rowData = dataArray[i].split('\t')
          var tmpJson = {
            Name:
              '<a href="' +
              rowData[2] +
              '" target="_blank">' +
              rowData[1] +
              '</a>',
            ID: rowData[0],
            Uptime: rowData[3],
            Action:
              '<i class="fas fa-ban" sessionid="' +
              rowData[0] +
              '" sessionname="' +
              rowData[1] +
              '"></i>'
          }
          jsonTableData.push(tmpJson)
        }
        setProgressBar(false)
        return jsonTableData
      }
    },
    columns: [
      { data: 'Name' },
      { data: 'ID' },
      { data: 'Uptime' },
      { data: 'Action' }
    ],
    columnDefs: [{ width: 20, targets: 3 }]
  })

  // Add listeners

  // Required so that delete icon function works after ajax data refresh
  // https://datatables.net/reference/event/init
  $('#session_table').on('init.dt', function() {
    setProgressBar(false)
    addDeleteListeners()
  })

  // From cadc.user.js. Listens for when user logs in
  // userManager.subscribe(cadc.web.events.onUserLoad, function(event, data) {
  $(document).on('onUserLoad', function(event, data) {
    // Check to see if user is logged in or not
    if (typeof data.error != 'undefined') {
      var errorMsg = ''
      if (data.errorStatus === 401) {
        errorMsg =
          '<em>' +
          data.errorStatus +
          ' ' +
          data.error +
          '</em>. Please log in to use Databench.'
      } else {
        errorMsg =
          'Unable to list sessions: ' + data.errorStatus + ' ' + data.error
      }
      setInfoPanel(errorMsg)
    } else {
      setSessionPanel()
    }
  })

  $('.table-refresh').click(function() {
    $('#refreshButton').click(function() {
      $(this).addClass('fa-spin')
      var el = $(this)
      fleetTable.ajax.reload(function() {
        el.removeClass('fa-spin')
      })
    })

    reloadSessionTable()
  })

  $('.session-add').submit(function() {
    var $_form = $(this)
    var formData = $_form.serialize()
    addDatabenchSession(formData)

    // allow form submit to be ajax, performed in addDatabenchSession
    return false
  })

  // From delete modal
  $('#delete_ok').click(function() {
    rmDatabenchSession($('.delete-session-id').text())

    // Leave panel up until ajax call returns
    false
  })
}) // end $(document).ready...

// ---------------- arcade.canfar.net ajax functions & response handlers ---------------

function reloadSessionTable() {
  // Pass in addDeleteListeners() as the callback so the
  // delete icons will work
  setProgressBar(true)
  $('#session_table')
    .DataTable()
    .ajax.reload(addDeleteListeners)
}

function setProgressBar(busy) {
  if (busy === true) {
    $('.session-table-progress').addClass('progress-bar-striped')
  } else {
    $('.session-table-progress').removeClass('progress-bar-striped')
  }
}

function handleAjaxFail(callType, message) {
  setProgressBar(false)

  //Option: to make sure error messages are correct,
  // can add specific messages here
  switch (callType) {
    case 1:
    case 2:
      //  $('#deleteModal').modal('hide');
      break
    case 0:
    default:
      break
  }

  var errorMsg = ''
  switch (message.status) {
    case 401:
      errorMsg =
        '<em>' +
        message.status +
        ' ' +
        message.responseText +
        '</em>. Please log in to use Databench.'
      setInfoPanel(errorMsg)
      break
    default:
      errorMsg =
        'Unable to list sessions: ' +
        message.status +
        ':  ' +
        message.responseText
      setInfoModal('Error', errorMsg, false)
      break
  }
}

function addDatabenchSession(formData) {
  setProgressBar(true)
  setInfoModal(
    'Pease wait ',
    'Processing request... (may take up to 10 seconds)',
    true
  )
  $.ajax({
    xhrFields: { withCredentials: true },
    url: 'http://arcade.canfar.net/quarry/session',
    method: 'POST',
    data: formData
  })
    .done(function(data) {
      $('#infoModal').modal('hide')
      // clear form
      $('.session-add input').val('')
      // Refresh session list
      reloadSessionTable()
    })
    .fail(function(message) {
      // Option: possibly put error beside form
      // setFormError(message.status, "Unable to add session: " + message.status + ": " + message.responseText);
      handleAjaxFail(1, message)
    })
}

function rmDatabenchSession(sessionID) {
  setProgressBar(true)
  clearDeleteModal()
  setInfoModal('Pease wait ', 'Processing request...', true)
  $.ajax({
    xhrFields: { withCredentials: true },
    url: 'http://arcade.canfar.net/quarry/session/' + sessionID,
    method: 'DELETE'
  })
    .done(function(data) {
      // Refresh session list
      $('#infoModal').modal('hide')
      reloadSessionTable()
    })
    .fail(function(message) {
      handleAjaxFail(2, message)
    })
}

function addDeleteListeners() {
  $('.fa-ban').click(function() {
    setDeleteModal(
      this.getAttribute('sessionid'),
      this.getAttribute('sessionname')
    )
  })
}

// ------------ Panel & modal management functions --------------

function setInfoPanel(errorMsg) {
  $('.info-span').html(errorMsg)
  $('.databench-authenticated').addClass('d-none')
  $('.databench-anonymous').removeClass('d-none')
}

function setSessionPanel() {
  $('.databench-authenticated').removeClass('d-none')
  $('.databench-anonymous').addClass('d-none')
  reloadSessionTable()
}

function setInfoModal(title, msg, hideThanks) {
  $('.info-span').html(msg)
  $('#infoModalLongTitle').html(title)
  $('#infoModal').modal('show')

  if (hideThanks === true) {
    $('#infoThanks').addClass('d-none')
  } else {
    $('#infoThanks').removeClass('d-none')
  }
}

function setDeleteModal(sessionId, sessionName) {
  $('#deleteModal').modal('show')
  $('.delete-name').html(sessionName)
  $('.delete-session-id').html(sessionId)
}

function clearDeleteModal() {
  $('#deleteModal').modal('hide')
  $('.delete-name').html('')
  $('.delete-session-id').html('')
}

function setFormError(title, msg) {
  $('.error-span').html(msg)
}
