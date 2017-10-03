---
layout: pages_no_left_nav_no_footer
lang: en
permalink: /en/status/
---

<!-- Content starts -->

<h2>Service Availability Status</h2>
<table id="status" class="table table-bordered table-status">
  <thead>
    <th>Service Name</th>
    <th>Available</th>
    <th>Availability Message</th>
    <th>Last Check Time</th>
  </thead>
</table>

<!-- Content ends -->

{% include _page_footer.html %}
<script type="application/javascript" src="http://www.canfar.net/js/status.js">
</script>
<script type="application/javascript">
  $(document).ready(function ()
                    {
                      $('head').append('<link href="http://www.canfar.net/css/status.css" rel="stylesheet" media="screen">');
                      var statusApp = new StatusApp({
                        'resourceCapsURL': 'https://apps.canfar.net/reg/resource-caps'
                      });

                      statusApp.start();
                    });
</script>
