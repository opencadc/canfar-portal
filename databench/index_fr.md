---
layout: pages_no_left_nav_no_footer
lang: en
permalink: /en/databench/
---

<!-- Content starts -->

<h2>Session list</h2>
<table id="sessions" class="table table-sm table-hover table-responsive-md">
  <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Session Name</th>
        <th scope="col">Uptime</th>
    </tr>
  </thead>
  <tbody>
    <tr id="firstrow">
        <th scope="row">..</th>
        <td></td>
        <td></td>
    </tr>
    </tbody>
</table>

<!-- Content ends -->

{% include _page_footer.html %}
<script type="application/javascript">
  $(document).ready(function ()
                    {
                      $("#firstrow").html("<th scope=\"row\">1</th><td>-</td><td>-</td>");
                    });
</script>
