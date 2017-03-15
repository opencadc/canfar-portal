---
layout: pages_left_nav

namespace: resources.expertise
lang: en
permalink: /en/resources/expertise/
---

{% include __vars.md %}

<!-- Content starts -->

<table id="nrc_cadc_experts" class="table table-bordered table-experts">
  <thead>
    <tr>
      <th>Name</th>
      <th>Member</th>
      <th>Member Role</th>
      <th>CANFAR Role</th>
      <th>Expertise</th>
      <th>Responsibilities</th>
    </tr>
  </thead>
  <tbody>
    {% assign t_expertise = t['resources']['expertise']['people'] %}
    {% for expert in t_expertise %}
    {% assign t_expert = expert[1] %}
    {% include __expertise_row.md name=t_expert.name member=t_expert.member member_role=t_expert.member_role canfar_role=t_expert.canfar_role expertise=t_expert.expertise responsibilities=t_expert.responsibilities %}
    {% endfor %}
  </tbody>
</table>

<!-- Content ends -->
