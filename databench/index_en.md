---
layout: pages_no_left_nav_no_footer_wide
lang: en
permalink: /en/databench/
---

<!-- Content starts -->

<div class="databench-authenticated">
<section>
  <h2 class="databench-title">Sessions</h2>
</section>
<section id="main_section">
    <div class="session-list card panel-default">
      <nav class="navbar navbar-expand-sm" id="navbar-functions">
        <ul class="nav navbar-nav">
            <li class="nav-item dataTables_filter">
              <form class="session-add form-inline">
                <div class="form-group mx-sm-3 mb-2">
                  Create new session: 
                  <label for="sessionName" class="sr-only">Session Name</label>
                  <input class="form-control session-add-control" id="sessionName" name="name" placeholder="Session Name">
                </div>
                <button type="submit" class="fa fa-plus btn btn-primary mb-2"></button>
                <div class="form-group" id="errorDiv"><span class="error-span"></span></div>
              </form>
            </li>
            <li class="nav-item">
              <button type="submit" class="fa fa-sync table-refresh btn btn-light"></button>
            </li>
        </ul>
      </nav>
      <div class="progress session-table-progress progress-bar-striped">
        <div class="cadc-progress progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100">
        </div>
      </div>
      <div id="sessions" class="table-responsive">
        <div class="card-body">
           <table id="session_table" class="table table-sm table-hover table-responsive-md dataTable">
             <thead>
               <tr>
                 <th>Name</th>
                 <th>ID</th>
                 <th>Uptime</th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
             </tbody>
           </table>          
        </div>
    </div> 
    </div></section>
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

<!-- fontawesome *should* be included in the header -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">        

<!-- DataTables includes this page requires -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" integrity="sha384-EkHEUZ6lErauT712zSr0DZ2uuCmi3DoQj6ecNdHQXpMpFNGAQ48WjfXCE5n20W+R" crossorigin="anonymous">
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js" integrity="sha384-rgWRqC0OFPisxlUvl332tiM/qmaNxnlY46eksSZD84t+s2vZlqGeHrncwIRX7CGp" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js" integrity="sha384-uiSTMvD1kcI19sAHJDVf68medP9HA2E2PzGis9Efmfsdb8p9+mvbQNgFhzii1MEX" crossorigin="anonymous"></script>


<script type="application/javascript">
        
  $(document).ready(function () {
 
     var sessionTable = $("#session_table").dataTable({
          ajax: {
            type   : "GET",
            url    : 'http://databench.canfar.net/quarry/session',
            xhrFields : { withCredentials:true },
            dataType: "text",  
            dataSrc: function( data ) {
             var jsonTableData = [];
              var dataArray = data.split("\n");
              for (i=0; i< dataArray.length - 1; i++) {
                 var rowData = dataArray[i].split("\t");
                  var tmpJson = {
                    "Name": "<a href=\"" + rowData[2] + "\" target=\"_blank\">" + rowData[1] + "</a>",
                    "ID": rowData[0],
                    "Uptime": rowData[3],
                    "Action": "<i class=\"fas fa-ban\" sessionid=\"" + rowData[0] + "\" sessionname=\"" + rowData[1] + "\"></i>"
                  };
                  jsonTableData.push(tmpJson);
              };
              
            setProgressBar(false);
            return jsonTableData;
          }
        },
        order: [[ 2, "asc" ]],
        columns: [
          {"data" : "Name"},
          {"data" : "ID"},
          {"data" : "Uptime"},
          {"data" : "Action"}
        ],
        columnDefs: [
            { width: 20, targets: 3 }
        ],
      });
         
     // Add listeners
     
     // Required so that delete icon function works after ajax data refresh
     // https://datatables.net/reference/event/init
     $('#session_table').on( 'init.dt', function () {
        setProgressBar(false);
        addDeleteListeners();
     } );
         
    // From cadc.user.js. Listens for when user logs in
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
         }          
    });
      
    $('.table-refresh').click(function() {
    
     $('#refreshButton').click(function(){
       $(this).addClass('fa-spin');
       var el = $(this);
       fleetTable.ajax.reload(function() {
           el.removeClass('fa-spin');
       });
    });
    
    
        reloadSessionTable();
    });
        
    $('.session-add').submit(function () {
      var $_form = $(this);
      var formData = $_form.serialize();
      addDatabenchSession(formData); 
      
      // allow form submit to be ajax, performed in addDatabenchSession
      return false;
    });
    
    // From delete modal
    $('#delete_ok').click(function () {
      rmDatabenchSession($('.delete-session-id').text());    
       
      // Leave panel up until ajax call returns
      false;
    });
                      
  });  // end $(document).ready... 
  
    
  // ---------------- databench.canfar.net ajax functions & response handlers ---------------
  
  function reloadSessionTable() {
    // Pass in addDeleteListeners() as the callback so the 
    // delete icons will work
    setProgressBar(true);
    $('#session_table').DataTable().ajax.reload(addDeleteListeners);
  };
  
  function setProgressBar(busy) {
    if (busy === true) {
      $('.session-table-progress').addClass('progress-bar-striped');
   } else {
      $('.session-table-progress').removeClass('progress-bar-striped');
   }
  };
  
  
  function handleAjaxFail(callType, message) {
    setProgressBar(false);
    
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
  
  function addDatabenchSession(formData) {
    setProgressBar(true);
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
        reloadSessionTable();
     }).fail(function (message) {
       // Option: possibly put error beside form
       // setFormError(message.status, "Unable to add session: " + message.status + ": " + message.responseText);
       handleAjaxFail(1, message);
     });  
  };
  
  function rmDatabenchSession(sessionID) {
    setProgressBar(true);
    clearDeleteModal();
    setInfoModal("Pease wait ", "Processing request...", true);
    $.ajax({ 
       xhrFields: { withCredentials: true },
       url: "http://databench.canfar.net/quarry/session/" + sessionID,
       method: "DELETE"
     }).done(function (data) {
       // Refresh session list
       $('#infoModal').modal('hide');
       reloadSessionTable();
     }).fail(function (message) {
       handleAjaxFail(2, message);
     });  
  };
  
  function addDeleteListeners() {
      $('.fa-ban').click(function () {
        setDeleteModal(this.getAttribute("sessionid"), this.getAttribute("sessionname"));
      });
  };
    
  // ------------ Panel & modal management functions --------------
  
  function setInfoPanel(errorMsg) {
    $('.info-span').html(errorMsg);
    $('.databench-authenticated').addClass('d-none');
    $('.databench-anonymous').removeClass('d-none');
  };
  
  function setSessionPanel() {
    $('.databench-authenticated').removeClass('d-none');
    $('.databench-anonymous').addClass('d-none');
  };
  
  function setInfoModal(title, msg, hideThanks) {    
    $('.info-span').html(msg);
    $('#infoModalLongTitle').html(title);
    $('#infoModal').modal('show');
    
    if (hideThanks === true) {
      $('#infoThanks').addClass('d-none');
    } else {
      $('#infoThanks').removeClass('d-none');
    }
  };
  
  function setDeleteModal(sessionId, sessionName) {
    $('#deleteModal').modal('show');
    $('.delete-name').html(sessionName);
    $('.delete-session-id').html(sessionId);
  };
  
  function clearDeleteModal() {
    $('#deleteModal').modal('hide');
    $('.delete-name').html("");
    $('.delete-session-id').html("");
  };

  function setFormError(title, msg) {    
    $('.error-span').html(msg);
  };

</script>
