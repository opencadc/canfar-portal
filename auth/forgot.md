---
layout: pages_no_left_nav_no_container
lang: en
permalink: /en/auth/forgot.html
namespace: auth
---

{% assign pagetitle = "Forgot your password" %}
{% assign forgot_passwd_instructions = "Enter your email address. If it exists in our database, you will be sent an e-mail with instructions on resetting your password." %}
{% assign forgot_passwd_email_label = "Email" %}
{% assign forgot_passwd_email_help_block = "The e-mail address associated with your account." %}
{% assign forgot_passwd_request_label = "Request an account" %}
{% assign forgot_passwd_submit_button_label = "Request your account information" %}
{% assign forgot_passwd_page_language = "en" %}

{% assign requestAccountURI = "/en/register/" %}

{% include _page_top.html %}

<body>
<div class="container">
    {% include _forgot_password.md %}
</div>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script type="text/javascript" src="/js/cadc.passwordresetrequest.js"></script>
</body>
