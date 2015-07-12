define([
    "underscore",
    "backbone",
    "jquery",
    "text!pages/templates/LoginTemplate.html"
    ],
    function(_, Backbone, $, LoginTemplate){
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
        console.log("login");
        var email=$("input[name=email]").val();
        var password=$("input[name=password]").val();
        $.post("/auth/login", {email:email, password:password, remember:true},function(data){
            if(data.status=="error"){
                alert("You entered wrong data");
            }
            else{
                console.log(data);
                window.location.href="/public/index3.html";
            };
        });
        } 
       });
       });        