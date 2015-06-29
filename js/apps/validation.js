/*
* Function which is checking password and e-mail when the login button is pressed.
*/
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

/*
* Function which is checking value of e-mail field while user is entering data. 
* If data is not valid - puts red border on field. 
*/
function realTimeEmailValid(){
    if(! validName()){
        $('#email')[0].style.border = "0.5px solid red";
    }
    else
    {
        $('#email')[0].style.border = "0.5px solid green";
    }
}

/*
* Function which is checking value of password field while user is entering data. 
* If data is not valid - puts red border on field.
*/
function realTimePassValid(){
    if(! validPass()){
        $('#password')[0].style.border = "0.5px solid red";
    }
    else
    {
        $('#password')[0].style.border = "0.5px solid green";
    }
}


/*
* Function which checks data of e-mail field by the following pattern.
*/
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


/*
* Function which checks data of e-mail field by the following pattern.
*/
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

/*
* Function which is checking password and e-mail when the sign up button is pressed.
*/
function signUpValidation(event){
     if( (! validName() || ! validPass()) || ! confirmPass()){
        event.preventDefault();
     }
}


/*
* Function which checks value of password and confirmation fields.
*/
function confirmPass(){
    if($('#password')[0].value == $('#confpass')[0].value){
        return true;
    }
    else{
        return false;
    }
}


/*
* Function which puts red border if confirmation is not valid and green if valid.
*/
function checkConfirm(){
     if(! confirmPass()){
        $('#confpass')[0].style.border = "0.5px solid red";
    }
    else
    {
        $('#confpass')[0].style.border = "0.5px solid green";
    }
}



