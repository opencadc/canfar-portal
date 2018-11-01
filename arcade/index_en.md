---
layout: pages_no_left_nav_no_footer_wide
lang: en
permalink: /en/arcade/
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

<div class="databench-anonymous">
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
<script type="text/javascript" src="/arcade/arcade.js"></script>
