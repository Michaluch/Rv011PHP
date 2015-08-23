define([
    "underscore",
    "backbone",
    "jquery",
    "text!pages/templates/LoginTemplate.html",
    "text!pages/templates/SimpleMessage.html",
    "hash",
    "signUpValidation",
    "text!pages/templates/NotificationSuccess.html",
    "text!pages/templates/NotificationInfo.html",
    "text!pages/templates/NotificationWarning.html",
    "text!pages/templates/NotificationDanger.html"   
    ],
    function(_, Backbone, $, LoginTemplate, SimpleMessage,hash, signUpValidation,
                NotificationSuccess, NotificationInfo, 
                NotificationWarning, NotificationDanger){
        return Backbone.View.extend({
        sidebar: null,
        el:$("#sidebar"),
        events:{
            "click #login_btn":"logIn",
            'blur input#email': 'changedEmail',
            'blur input#password': 'changedPassword',
            'focus input#email': 'focusEmail',
            'focus input#password': 'focusPassword',
            "click #forgot-pass": "resetPass"
        },
        initialize:function(){
            
        },
        //I used Singupform validation functions, so that everything be simmilar
        changedEmail: function() {
                signUpValidation.checkField('email');
            },

        changedPassword: function() {
            signUpValidation.checkField('password');
        },

        focusEmail: function() {
            signUpValidation.focusField('email');
        },

        focusPassword: function() {
            signUpValidation.focusField('password');
        },   
  
        render:function(){
            this.sidebar.turnOn();
            this.$el.html(LoginTemplate);
        },

         //Login script sends data to server and wait to respond

        logIn:function(e){
        e.preventDefault();
        if (signUpValidation.checkAllLogin()){
        if(DEBUG) console.log("login");
        var email=$("input[name=email]").val();
        var password=$("input[name=password]").val();
        var hash = CryptoJS.SHA512(password).toString();
        $.post("/auth/login", {email:email, password:hash, remember:false},function(data){
            if(data.status=="error"){
            var template = _.template(SimpleMessage);
            $('.text-info').html("You entered wrong data."+data.errors);
            }
            else{
                console.log(data);
                window.location.href="/";
            };
        });
        }
        else{
        signUpValidation.checkField('email');
        signUpValidation.checkField('password');}
        },
        
        resetPass: function(){
        var temppass = this.createRandom();
        console.log(temppass);
        var email=$("input[name=email]").val()
        if(temppass!=null){
            var hash = CryptoJS.SHA512("tra").toString();
            console.log(hash);
            $.get("/pass/reset", { email:email },
                function(data)
                {
                    if(data.code == "11200")
                    {
                        console.log(data);
                        var template1 = _.template(NotificationSuccess); // notification
                        $.colorbox({html:template1({message: data.message}),height:"30%",width:"30%"});
                    }
                    else if(data.code == "11400")
                    {
                        var template1 = _.template(NotificationWarning); // notification
                        $.colorbox({html:template1({message: data.message}),height:"30%",width:"30%"});
                    }
                });
        }
        },
        createRandom:function ()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
       });
       });