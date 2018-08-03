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
                    <th></th>
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
        <h5 class="modal-title" id="infoModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <span class="info-span"></span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Thanks</button>
      </div>
    </div>
  </div>
</div>


<!-- Confirm Modal -->
<!-- Displayed on delete for confirmation -->
<div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <span class="info-span"></span>
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
      addDatabenchSession(formData) 
      return false;
    });
            
  });  // end $(document).ready... 
  
    
  // Databench ajax functions
  
  function loadDatabenchSessions() {
    $.ajax({  
       xhrFields: { withCredentials: true },
       url: "http://databench.canfar.net/quarry/session"
     }).done(function (data) {
        // Load data into table
       refreshSessionTable(data);
     }).fail(function (message, m2) {
       setSessionPanel("Unable to list sessions: " + message.status + ": " + message.responseText);
     });  
  };
  
  function addDatabenchSession(formData) {
    $.ajax({ 
       xhrFields: { withCredentials: true },
       url: "http://databench.canfar.net/quarry/session",
       method: "POST",
       data: formData
     }).done(function (data) {
       // Refresh session list
       loadDatabenchSessions();
     }).fail(function (message) {
       // setFormError(message.status, "Unable to add session: " + message.status + ": " + message.responseText);
       setInfoModal(message.status, "Unable to add session: " + message.status + ": " + message.responseText);
     });  
  };
  
  
  function rmDatabenchSession(formData) {
    $.ajax({ 
       xhrFields: { withCredentials: true },
       url: "http://databench.canfar.net/quarry/session",
       method: "POST",
       data: formData
     }).done(function (data) {
       // Refresh session list
       loadDatabenchSessions();
     }).fail(function (message) {
       setInfoModal(message.status, "Unable to delete sessions: " + message.status + ": " + message.responseText);
     });  
  };
  
  // Table management functions
  function clearSessionTable() {
    var tableEl = $('.session-table');
    tableEl.html("<tr><td>-</td><td>-</td><td>-</td></tr>");
  };
    
  function mkRowHtml(rowData) { 
      var rHtml = "<tr><td><a href=\"" + rowData[2] + "\" target=\"_blank\">" + rowData[1] + "</a></td><td>" + rowData[0] + "</td><td>" + rowData[3] + "</td></tr>";
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
  };

    
  // Page management functions
  
  function setInfoPanel(errorMsg) {
    $(".info-span").html(errorMsg);
    $('.databench-authenticated').addClass('d-none');
    $('.databench-anonymous').removeClass('d-none');
  };
  
  function setSessionPanel() {
    $('.databench-authenticated').removeClass('d-none');
    $('.databench-anonymous').addClass('d-none');
  };
  
  function setInfoModal(title, msg) {    
    $(".info-span").html(msg);
    $(".infoModalLongTitle").html(title);
    $('#infoModal').modal('show');
  };
  
  function setFormError(title, msg) {    
    $(".error-span").html(msg);
  };

</script>
