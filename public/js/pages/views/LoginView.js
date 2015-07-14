define([
    "underscore",
    "backbone",
    "jquery",
    "text!pages/templates/LoginTemplate.html",
    "hash",
    "validation",
    "valid"
    
    ],
    function(_, Backbone, $, LoginTemplate,hash){
        return Backbone.View.extend({
        el:$("#sidebar"),
        events:{
            "click #login_btn":"logIn"
        },
         initialize:function(){
            
         },
  
         render:function(){
            sidebar.turnOn();
            this.$el.html(LoginTemplate);
         },

         //Login script sends data to server and wait to respond

        logIn:function(e){
        e.preventDefault();
        if(DEBUG) console.log("login");
        var email=$("input[name=email]").val();
        var password=$("input[name=password]").val();
        var hash = CryptoJS.SHA512(password).toString();
        alert(hash);
        $.post("/auth/login", {email:email, password:hash, remember:false},function(data){
            if(data.status=="error"){
                alert("You entered wrong data"); // get look at signup view  
            }
            else{
                console.log(data);
                window.location.href="/public/index3.html";
            };
        });
        } 
       });
       });