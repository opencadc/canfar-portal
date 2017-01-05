(function() {
// Generates a login form or user menu if current user is already logged
// in to canfar.
// Check logged in status using
// http://ws.canfar.net/ac/whoami/?view
// A retur of 'Permission Denied' means there is no
// valid cookie for the current browser/user.

// Commented out because whoami does not have an https version, and need to 
// test the rest of the code prior to having a non-standard github domain to
// test with.
	
// $.ajax({
//    url: 'http://ws.canfar.net/ac/whoami/?view',
//    error: function() {
//       $('#info').html('<p>An error has occurred</p>');
//    },
//    dataType: 'json',
//    success: function(data) {
		var loginMenu = $("#loginForm"); 
		var oData = {"payload": ""};
		var loggedInUsername = oData.payload;
		if (oData.payload === "") {			
			loginMenu.append('<a title="Login form" class="dropdown-toggle" role="button" aria-haspopup="true" ' +
			       		'aria-expanded="false" data-toggle="dropdown"> ' +
					'Login <span class="caret"></span></a> '+
					'<ul class="dropdown-menu list-unstyled pull-right login-container"> '+
					'<li> '+
					'<form class="form-inline" id="loginForm" role="form" method="post" action="http://apps.canfar.net/storage-beta/ac/authenticate"> '+
					'<span id="login_fail" class="help-block text-danger pull-left"></span> '+
					'<div class="form-group">'+
					'<label for="username" class="hidden" id="usernameLabel">Username</label> '+
					'<input type="text" id="username" name="username" class="form-control" tabindex="1" required="required" placeholder="Username" /> '+
					'</div>'+
					'<div class="form-group"> '+
					'<label for="password" class="hidden" id="passwordLabel">Password</label> '+
					'<input type="password" id="password" name="password" class="form-control" tabindex="2" required="required" placeholder="Password" /> '+
					'</div>'+
					'<input type="hidden" id="redirectPath" name="redirectPath" value="${folder.path}" /> '+
					'<button type="submit" class="btn btn-success"><span class="glyphicon glyphicon-log-in"></span> Login</button>'+
					'</form>'+
					'</li> '+
					'</ul>');
		} else {
			// loggedInUsername can be parsed from the return of the whoami call.
			loginMenu.append('<a title="User actions." class="dropdown-toggle" role="button" aria-haspopup="true" ' + 
					 'aria-expanded="false" data-toggle="dropdown"> ' + loggedInUsername + 
					 '<span class="caret"></span></a> ' +
           				'<ul class="dropdown-menu list-unstyled"> ' +
            				'<li> ' +
             				'<a title="Update profile." href="#">My profile</a></li> ' +
             				'<li> ' +
              				'<a title="Change password." href="#">Change password</a></li> ' +
             				'<li> ' +
               				'<a id="logout" title="Logout."><span class="glyphicon glyphicon-log-out"></span> Logout</a></li> ' +
            				'</ul>');	
		}
//    }
// });


})();
