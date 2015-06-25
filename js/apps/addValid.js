function addIvent(){
    if($("#login_form")[0]){
        $("#login_form")[0].find('#login_btn')[0].addEventListener("click",function(event){ validation(event)});
        $("#login_form")[0].find("#email")[0].addEventListener("input", realTimeEmailValid);
        $("#login_form")[0].find("#password")[0].addEventListener("input", realTimePassValid);
    }
    if($("#sign_up_form")[0]){
        $("#sign_up_form")[0].find("#signup_btn")[0].addEventListener("click",function(event){ signUpValidation(event)});
        $("#sign_up_form")[0].find("#email")[0].addEventListener("input", realTimeEmailValid);
        $("#sign_up_form")[0].find("#password")[0].addEventListener("input", realTimePassValid);
        $("#sign_up_form")[0].find("#confpass")[0].addEventListener("input", checkConfirm);
    }
}

 $(document).on( "ready", addIvent);
