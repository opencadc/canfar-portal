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
            <table id="sessions" class="table table-sm table-hover table-responsive-md">
              <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Uptime</th>
                    <th></th>
                </tr>
              </thead>
              <tbody class="session-table">
                <tr id="firstrow">
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
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

<!-- Content ends -->

{% include _page_footer.html %}

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">        

<script type="application/javascript">
  $(document).ready(function () {
        $("#firstrow").html("<td>-</td><td>-</td>");

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
  });
    
  function loadDatabenchSessions() {
      $.ajax(
       {
         xhrFields: { withCredentials: true },
         url: "http://databench.canfar.net/quarry/session"
       }).done(function (data) {
         // alert("got databench data"   + data );
         updateSessionTable(data);
       }).fail(function (message, m2) {
         // clear the password field and show an error message
         //alert("Failed to get databench data: " + message.status + ": " + message.responseText);
         setSessionPanel("Unable to list sessions: " + message.status + ": " + message.responseText);
       });  
  };
    
  function setInfoPanel(errorMsg) {
    $('.databench-authenticated').addClass('d-none');
    $('.databench-anonymous').removeClass('d-none');
    
    $(".info-span").html(errorMsg);
  };
  
  function setSessionPanel() {
      $('.databench-authenticated').removeClass('d-none');
      $('.databench-anonymous').addClass('d-none');
  };
  
  function mkRowHtml(rowData) {
      //var rowData = unsplitRowData.split("\t");   
      var rHtml = "<tr><td><a href=\"" + rowData[2] + "\" target=\"_blank\">" + rowData[1] + "</a></td><td>" + rowData[3] + "</td></tr>";
      return rHtml;
  };
  
  function updateSessionTable(tableData) {
    var tableEl = $('.session-table');
    var rowHtml = "";
   
    var dataArray = tableData.split("\n");
    for (i=0; i< dataArray.length - 1; i++) {
        rowHtml = rowHtml + mkRowHtml(dataArray[i].split("\t"));
     };
     
     tableEl.html(rowHtml);
  };
  
  
  function addTableRow() {
       
  };
  
  
  function createSession(name) {
  
  
  
  
  }

</script>
