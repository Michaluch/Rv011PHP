define([
    "underscore",
    "backbone",
    "jquery",
    "text!pages/templates/LoginTemplate.html"
    ],
    function(_, Backbone, $, LoginTemplate){
        return Backbone.View.extend({
        el:$("#login-container"),
         initialize:function(){
            
         },
  
         render:function(){
            this.$el.html(LoginTemplate);
         }
       });
       });        