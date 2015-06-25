function addIvent(){
    var log_form = $("#login_form")[0];
    if(log_form){
        log_form.find('#login_btn').addEventListener("click",function(event){ validation(event)});
        log_form.find("#email").addEventListener("input", realTimeEmailValid);
        log_form.find("#password").addEventListener("input", realTimePassValid);
    }
    var sign_form = $("#sign_up_form")[0];
    if(sign_form){
        sign_form.find("#signup_btn").addEventListener("click",function(event){ signUpValidation(event)});
        sign_form.find("#email").addEventListener("input", realTimeEmailValid);
        sign_form.find("#password").addEventListener("input", realTimePassValid);
        sign_form.find("#confpass").addEventListener("input", checkConfirm);
    }
}

 $(document).on( "ready", addIvent);
