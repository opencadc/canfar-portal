---
layout: pages_no_left_nav_no_footer
lang: en
permalink: /en/databench/
---

<!-- Content starts -->

<div class="databench-authenticated">
    <div class="session-list card panel-default">
        <div class="card-body">
            <h3>Quarry Session list</h3>
            <form class="session-add form-inline">
              <div class="form-group mx-sm-3 mb-2">
                <label for="sessionName" class="sr-only">Session Name</label>
                <input class="form-control" id="sessionName" name="name" placeholder="Session Name">
              </div>
              <button type="submit" class="fa fa-plus btn btn-primary mb-2"></button>
              <div class="form-group" id="errorDiv"><span class="error-span"></span></div>
            </form>
            <table id="sessions" class="table table-sm table-hover table-responsive-md">
              <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Uptime</th>
                    <th scope="col"></th>
                </tr>
              </thead>
              <tbody class="session-table">
                <tr id="firstrow">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <i class="table-refresh fa fa-sync"></i>
        </div>
    </div> 
</div>

<div class="databench-anonymous d-none">
    <div class="info-panel card panel-default">
        <div class="card-body">
            <span class="info-span"></span>
        </div>
    </div>
</div>


<!-- Info/Error Modal -->
<!-- Displayed when anything other than a 401 or 200 is returned -->
<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="infoModalLongTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <span class="info-span"></span>
      </div>
      <div id="infoThanks" class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Thanks</button>
      </div>
    </div>
  </div>
</div>


<!-- Confirm Modal -->
<!-- Displayed on delete for confirmation -->
<div class="modal" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="deleteModalLongTitle">Confirm Delete</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete session <span class="delete-name"></span> (<span class="delete-session-id"></span>)?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" id="delete_ok" class="btn btn-secondary" data-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>

<!-- Content ends -->

{% include _page_footer.html %}

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">        

<script type="application/javascript">
      
  var closeModal = true;
    
  $(document).ready(function () {
       
    // Add listeners
    userManager.subscribe(cadc.web.events.onUserLoad,
      function (event, data)
      {
        // Check to see if user is logged in or not        
        if (typeof(data.error) != "undefined") {                
            var errorMsg = "";
            if (data.errorStatus === 401) {
                errorMsg = "<em>" + data.errorStatus + " " + data.error + "</em>. Please log in to use Databench.";
            } else {
                errorMsg = "Unable to list sessions: " + data.errorStatus + " " + data.error ;
            }
            setInfoPanel(errorMsg);        
        } else {
            setSessionPanel();
            loadDatabenchSessions();
         }          
    });
      
    $('.table-refresh').click(function() {
        clearSessionTable();
        loadDatabenchSessions();
    });
        
    $('.session-add').submit(function () {
      var $_form = $(this);
      var formData = $_form.serialize();
      addDatabenchSession(formData); 
      
      // allow this to be an ajax session, in addDatabenchSession
      return false;
    });
    
    $('#delete_ok').click(function () {
      rmDatabenchSession($('.delete-session-id').text());     
      // Leave panel up until ajax call returns
      false;
    });
            
  });  // end $(document).ready... 
  
    
  // ---------------- databench.canfar.net ajax functions & response handlers ---------------
  
  function handleAjaxFail(callType, message) {
   
    //Option: to make sure error messages are correct, 
    // can add specific messages here
    switch (callType) {
      case 1:
      case 2:
      //  $('#deleteModal').modal('hide');
        break;
      case 0:
        default:
          break;
    };
      
    var errorMsg = "";    
    switch (message.status) {
      case 401:
        errorMsg = "<em>" + message.status + " " + message.responseText + "</em>. Please log in to use Databench.";
        setInfoPanel(errorMsg);
        break;
      default:
        errorMsg = "Unable to list sessions: " + message.status + ":  " + message.responseText;
        setInfoModal("Error", errorMsg, false);     
        break;
    };
  };
  
  function loadDatabenchSessions() {
    $.ajax({
      method: "GET",
       url: "http://databench.canfar.net/quarry/session",
       xhrFields: { withCredentials:true }
     }).done(function (data) {
        // Load data into table
       refreshSessionTable(data);
     }).fail(function (message, m2) {
       handleAjaxFail(0, message);
     });  
  };
  
  function addDatabenchSession(formData) {
    setInfoModal("Pease wait ", "Processing request... (may take up to 10 seconds)", true);
    $.ajax({ 
       xhrFields: { withCredentials: true },
       url: "http://databench.canfar.net/quarry/session",
       method: "POST",
       data: formData
     }).done(function (data) {
        $('#infoModal').modal('hide');
        // clear form
        $(".session-add input").val("");
        // Refresh session list
       loadDatabenchSessions();
     }).fail(function (message) {
       // Option: possibly put error beside form
       // setFormError(message.status, "Unable to add session: " + message.status + ": " + message.responseText);
       handleAjaxFail(1, message);
     });  
  };
  
  function rmDatabenchSession(sessionID) {
    clearDeleteModal();
    setInfoModal("Pease wait ", "Processing request...", true);
    $.ajax({ 
       xhrFields: { withCredentials: true },
       url: "http://databench.canfar.net/quarry/session/" + sessionID,
       method: "DELETE"
     }).done(function (data) {
       // Refresh session list
       $('#infoModal').modal('hide');
       loadDatabenchSessions();
     }).fail(function (message) {
       handleAjaxFail(2, message);
     });  
  };
  
  function addDeleteListeners() {
      $('.fa-minus-circle').click(function () {
        setDeleteModal(this.getAttribute("sessionid"), this.getAttribute("sessionname"));
      });
  };
  
  
  // --------------- Table management functions----------------
  
  function clearSessionTable() {
    var tableEl = $('.session-table');
    tableEl.html("<tr><td>-</td><td>-</td><td>-</td><td></td></tr>");
  };
    
  function mkRowHtml(rowData) { 
      var rHtml = "<tr><td><a href=\"" + rowData[2] + "\" target=\"_blank\">" + 
      rowData[1] + "</a></td><td>" + rowData[0] + "</td><td>" + rowData[3] + 
      "</td><td><i class=\"fas fa-minus-circle\" sessionid=\"" + rowData[0] + "\" sessionname=\"" + rowData[1] + 
      "\"></i></td></tr>";
      return rHtml;
  };
    
  function refreshSessionTable(tableData) {
    var tableEl = $('.session-table');
    var rowHtml = "";
   
    var dataArray = tableData.split("\n");
    for (i=0; i< dataArray.length - 1; i++) {
        rowHtml = rowHtml + mkRowHtml(dataArray[i].split("\t"));
    };
   
    tableEl.html(rowHtml);
    // May need to clear listeners? or does jquery handle this well?
    addDeleteListeners();
  };

    
  // ------------ Panel & modal management functions --------------
  
  function setInfoPanel(errorMsg) {
    $(".info-span").html(errorMsg);
    $('.databench-authenticated').addClass('d-none');
    $('.databench-anonymous').removeClass('d-none');
  };
  
  function setSessionPanel() {
    $('.databench-authenticated').removeClass('d-none');
    $('.databench-anonymous').addClass('d-none');
  };
  
  function setInfoModal(title, msg, hideThanks) {    
    $(".info-span").html(msg);
    $("#infoModalLongTitle").html(title);
    $('#infoModal').modal('show');
    
    if (hideThanks === true) {
      $("#infoThanks").addClass('d-none');
    } else {
      $("#infoThanks").removeClass('d-none');
    }
  };
  
  function setDeleteModal(sessionId, sessionName) {
    $('#deleteModal').modal('show');
    $(".delete-name").html(sessionName);
    $(".delete-session-id").html(sessionId);
  };
  
  function clearDeleteModal() {
    $('#deleteModal').modal('hide');
    $(".delete-name").html("");
    $(".delete-session-id").html("");
  };

  function setFormError(title, msg) {    
    $(".error-span").html(msg);
  };

</script>
