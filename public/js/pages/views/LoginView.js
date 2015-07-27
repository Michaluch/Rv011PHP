define([
    "underscore",
    "backbone",
    "jquery",
    "text!pages/templates/LoginTemplate.html",
    "text!pages/templates/SimpleMessage.html",
    "hash",
    "signUpValidation"   
    ],
    function(_, Backbone, $, LoginTemplate, SimpleMessage,hash, signUpValidation){
        return Backbone.View.extend({
        sidebar: null,
        el:$("#sidebar"),
        events:{
            "click #login_btn":"logIn",
            'blur input#email': 'changedEmail',
            'blur input#password': 'changedPassword',
            'focus input#email': 'focusEmail',
            'focus input#password': 'focusPassword'
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
            $('#sidebar').prepend(template({message: "You entered wrong data. "+data.errors}));
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
        } 
       });
       });