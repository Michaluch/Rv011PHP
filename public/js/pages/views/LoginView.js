define([
    "underscore",
    "backbone",
    "jquery",
    "text!pages/templates/LoginTemplate.html"
    ],
    function(_, Backbone, $, LoginTemplate){
        return Backbone.View.extend({
        el:$("#sidebar"),
         initialize:function(){
            
         },
  
         render:function(){
            this.$el.css("display", "block").addClass("col-xs-3");
             $("#map-canvas").addClass("col-xs-9");
            this.$el.html(LoginTemplate);
         }
       });
       });        