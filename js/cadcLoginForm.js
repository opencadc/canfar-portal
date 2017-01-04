(function() {
// Login form with check to see if user is logged in or not.
// check logged in status
// http://ws.canfar.net/ac/whoami/?view

// execute function to call whoami (ajax)
// on return, display the correct form snippet using
// 

$.ajax({
   url: 'http://ws.canfar.net/ac/whoami/?view',
   error: function() {
      $('#info').html('<p>An error has occurred</p>');
   },
   dataType: 'json',
   success: function(data) {
  
		var loginMenu = $("#loginForm"); 			
      		loginMenu.append('  <a title="Login form" class="dropdown-toggle" role="button" aria-haspopup="true" ' +
		       ' aria-expanded="false" data-toggle="dropdown"> ' +
            		'  {{ t.login.name }} <span class="caret"></span></a>'+
            		'<ul class="dropdown-menu list-unstyled pull-right login-container">'+
             		' <li>'+
               		' <form class="form-inline" id="loginForm" role="form" method="post" action="http://apps.canfar.net/storage-beta/ac/authenticate">'+
                 		'<span id="login_fail" class="help-block text-danger pull-left"></span>'+
                 		' <div class="form-group">'+
				'  <label for="username" class="hidden" id="usernameLabel">Username</label>'+
                   		' <input type="text" id="username" name="username" class="form-control" tabindex="1" required="required" placeholder="Username" />'+
                 		' </div>'+
                 		' <div class="form-group">'+
                   		' <label for="password" class="hidden" id="passwordLabel">Password</label>'+
                   		' <input type="password" id="password" name="password" class="form-control" tabindex="2" required="required" placeholder="Password" />'+
                 		' </div>'+
                 		' <input type="hidden" id="redirectPath" name="redirectPath" value="${folder.path}" />'+
                 		' <button type="submit" class="btn btn-success"><span class="glyphicon glyphicon-log-in"></span> Login</button>'+
               		' </form>'+
              		'</li> '+
           		'</ul>');
   },
   type: 'GET'
});


})();
