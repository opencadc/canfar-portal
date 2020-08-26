---
layout: pages_no_left_nav_no_footer_wide
lang: en
permalink: /en/carta/
---

<!-- Content starts -->

<section>
  <h2 class="arcade-title">Arcade CARTA</h2>
</section>
<div class="arcade-authenticated">
<section id="main_section">
    <div class="session-list card panel-default">
      <div class="panel-heading doi-panel-heading">
        <h4 class="arcade-modal-title session-starting">Starting session</h4>
        <h4 class="arcade-modal-title session-started d-none">Session started</h4>
        <h4 class="arcade-modal-title session-failed d-none">Could not start session</h4>
      </div>
      <div class="progress session-table-progress progress-bar-striped">
        <div class="cadc-progress progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="100" aria-valuemax="100">
        </div>
      </div>
      <div class="panel-body doi-panel-body">
        <div class="arcade-not-authenticated d-none">
          <button type="submit" class="btn btn-primary" id="arcade_login_button">
            <i>Login Required</i>
          </button>
        </div>
        <div class="forwarded session-started d-none">
          <i>Please refresh page to access current session.</i>
        </div>
        <div class="forwarded session-failed d-none">
          <i>Try reloading page to refresh session, or contact a CANFAR adminitrator.</i>
        </div>
      </div>
    </div>
</section>
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
        <span class="arcade-spinner fas fa-spinner fa-spin"></span>
      </div>
      <div id="infoThanks" class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Thanks</button>
      </div>
    </div>
  </div>
</div>

<!-- Content ends -->

{% include _page_footer.html %}

<script type="text/javascript" src="/carta/carta.js"></script>
