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
<script
type="application/javascript" src="/js/status.js">
</script>
<script type="application/javascript">
  $(document).ready(function ()
                    {
                      var statusApp = new StatusApp({
                        "images": "../../images/"
                      });

                      statusApp.printStatus();
                    });
</script>
