
function validation(event){
    if(! validName() || ! validPass()){
        event.preventDefault();
        if(! $('#login-warn')[0] ){
            var p = document.createElement("p");
            p.id = "login-warn";
            p.innerHTML = "Email or password is not valid. Try again";
            p.style.color = "red";
            $('#login_form')[0].appendChild(p);
        }
    }
    else{
        if($('#login-warn')[0]){
            $('#login-warn')[0].remove();
        }
    }
    
}


function realTimeEmailValid(){
    if(! validName()){
        $('#email')[0].style.border = "0.5px solid red";
    }
    else
    {
        $('#email')[0].style.border = "0.5px solid green";
    }
}

function realTimePassValid(){
    if(! validPass()){
        $('#password')[0].style.border = "0.5px solid red";
    }
    else
    {
        $('#password')[0].style.border = "0.5px solid green";
    }
}


function validName(){
    var email = $('#email')[0].value;
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
    var pass = $('#password')[0].value;
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


function signUpValidation(event){
     if( (! validName() || ! validPass()) || ! confirmPass()){
        event.preventDefault();
     }
}

function confirmPass(){
    if($('#password')[0].value == $('#confpass')[0].value){
        return true;
    }
    else{
        return false;
    }
}

function checkConfirm(){
     if(! confirmPass()){
        $('#confpass')[0].style.border = "0.5px solid red";
    }
    else
    {
        $('#confpass')[0].style.border = "0.5px solid green";
    }
}



