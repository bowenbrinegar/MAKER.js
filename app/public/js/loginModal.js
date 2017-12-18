var turn = true

var loginHtml = `
				<form id='loginHtml' action="/login" method="POST">
          <div class="form-group">
            <input type="email" class="form-control" name='email' id="loginEmail" placeholder='email' required>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name='password' id="loginPassword" placeholder='password' required>
          </div>
          <button type="submit" class="btn btn-lg btn-block btn-warning">Log In -></button>
        </form>`

var registerHtml = `
				<form id='registerHtml' action="/signup" method="post">
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


registerRender()

$('#key').on("click", function() {
	if (turn) {
		$('#loginModal').css("display", "block");
		turn = !turn;
		return
	}
	$('#loginModal').css("display", "none");
	turn = !turn;
})
	
$('#loginButton').on("click", function() {
	loginRender()
})

$('#registerButton').on("click", function() {
	registerRender()
})  


function registerRender() {
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
	$('#registerButton').off('mouseenter mouseleave')
	$('#registerButton').removeClass('hover');
}

function loginRender() {
	$('#formContainer').empty()
	$('#formContainer').append(loginHtml)
	$('#registerButton').css({"background": "rgb(84, 237, 211)"})
	$('#loginButton').css({"background": "rgba(0,0,0,.75)", "color": "white"}) 
	$('#loginModal').css({"height": "338px"})
	$("#registerButton").hover(function(){
	  $(this).addClass('hover');
	}, function(){
	  $(this).removeClass('hover');
	});
	$('#loginButton').off('mouseenter mouseleave')
	$('#loginButton').removeClass('hover');
}







