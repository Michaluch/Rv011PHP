// TODO document.getElementById use jQuery
function validation(event){
	if(! validName() || ! validPass()){
		event.preventDefault();
		if(! document.getElementById('login-warn') ){
			var p = document.createElement("p");
			p.id = "login-warn";
			p.innerHTML = "Email or password is not valid. Try again";
			p.style.color = "red";
			document.getElementById('login_form').appendChild(p);
		}
	}
	else{
		if(document.getElementById('login-warn')){
			document.getElementById('login-warn').remove();
		}
	}
	
}


function realTimeEmailValid(){
	if(! validName()){
		document.getElementById('email').style.border = "0.5px solid red";
	}
	else
	{
		document.getElementById('email').style.border = "0.5px solid green";
	}
}

function realTimePassValid(){
	if(! validPass()){
		document.getElementById('password').style.border = "0.5px solid red";
	}
	else
	{
		document.getElementById('password').style.border = "0.5px solid green";
	}
}


function validName(){
	var email = document.getElementById('email').value;
	var filter = /^\w(\w|\.|\-|\_)+@\w+(.(\w)+){0,3}\.(\w){2,6}$/g;
	if(filter.test(email))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function validPass(){
	var pass = document.getElementById('password').value;
	var filter = /^(([\w\W_]+)?[A-Z]([\w\W_]+)?)$/g;
	if(filter.test(pass))
	{
		if(pass.length > 6){
			return true;
		}
		else{
			return false;
		}
	}
	else
	{
		return false;
	}
}

function addIvent(){
	document.getElementById("login_btn").addEventListener("click",function(event){ validation(event)});
	document.getElementById("email").addEventListener("input", realTimeEmailValid);
	document.getElementById("password").addEventListener("input", realTimePassValid);
}

 $(document).on( "ready", addIvent);

