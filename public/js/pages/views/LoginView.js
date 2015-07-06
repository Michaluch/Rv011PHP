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
            this.$el.css("display", "block").addClass("col-xs-3");
             $("#map-canvas").addClass("col-xs-9");
            this.$el.html(LoginTemplate);
         },

         //Login script sends data to server and wait to respond
                 /*
         logIn:function(){
        var name=$("input[name=email]").val();
        var password=$("input[name=password]").val();
        $.post("/auth/login", {email:email, password:password},function(data){
            if(data=="wrong"){
                alert("You enterd wrong data");
            }
            else{
                document.login_form.submit();
            };
        });
        */
        }
       });
       });        