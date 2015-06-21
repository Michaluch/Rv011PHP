function addIvent(){
    if($("#login_form")[0]){
        $("#login_btn")[0].addEventListener("click",function(event){ validation(event)});
        $("#email")[0].addEventListener("input", realTimeEmailValid);
        $("#password")[0].addEventListener("input", realTimePassValid);
    }
    else if($("#sign_up_form")[0]){
        $("#signup_btn")[0].addEventListener("click",function(event){ signUpValidation(event)});
        $("#email")[0].addEventListener("input", realTimeEmailValid);
        $("#password")[0].addEventListener("input", realTimePassValid);
        $("#confpass")[0].addEventListener("input", checkConfirm);
    }
}

 $(document).on( "ready", addIvent);