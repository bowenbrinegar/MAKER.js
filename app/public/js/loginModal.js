var loginHtml = `
				<form id='loginHtml' action="/login" method="POST">
          <div class="form-group">
            <input type="email" class="form-control" id="loginEmail" placeholder='email' required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="loginPassword" placeholder='password' required>
          </div>
          <button type="submit" class="btn btn-lg btn-block btn-warning">Log In -></button>
        </form>`

var registerHtml = `
				<form id='registerHtml' action="/register" method="post">
          <div class="form-group">
            <input type="text" class="form-control" name="name" placeholder='name' required />
            <input type="email" class="form-control" name="email" placeholder='email' required />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder='password' required />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password-confirm" placeholder='password confirm' required />
          </div>
          <input type="submit" class="btn btn-lg btn-block btn-warning" value="Register ->"/>
        </form>`


$('#formContainer').append(registerHtml)
$('#registerButton').css({"background": "rgba(0,0,0,.75)", "color": "white"})  
$('#loginButton').css({"background": "rgb(84, 237, 211)"})
$("#loginButton").hover(function(){
	  $(this).addClass('hover');
	}, function(){
	  $(this).removeClass('hover');
	});

var turn = true
$('.userClick').on("click", function() {
	if (turn) {
		$('#loginModal').css("display", "block");
		turn = !turn;
		return
	}
	$('#loginModal').css("display", "none");
	turn = !turn;
})
	
$('#loginButton').on("click", function() {
	$('#loginButton').off( "mouseenter mouseleave" );
	$('#formContainer').empty()
	$('#formContainer').append(loginHtml)
	$('#registerButton').css({"background": "rgb(84, 237, 211)"})
	$('#loginButton').css({"background": "rgba(0,0,0,.75)", "color": "white"}) 
	$('#loginModal').css({"height": "348px"})
	$("#registerButton").hover(function(){
	  $(this).addClass('hover');
	}, function(){
	  $(this).removeClass('hover');
	});
})

$('#registerButton').on("click", function() {
	$('#registerButton').off( "mouseenter mouseleave" );
	$('#formContainer').empty()
	$('#formContainer').append(registerHtml)
	$('#registerButton').css({"background": "rgba(0,0,0,.75)", "color": "white"})  
	$('#loginButton').css({"background": "rgb(84, 237, 211)"}) 
	$('#loginModal').css({"height": "500px"})
	$("#loginButton").hover(function(){
	  $(this).addClass('hover');
	}, function(){
	  $(this).removeClass('hover');
	});
})  






