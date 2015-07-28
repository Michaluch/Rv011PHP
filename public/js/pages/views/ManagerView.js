define([
    "underscore",
    "backbone",
    "jquery",
    "text!pages/templates/ManagerTemplate.html"
    ],
    function(_, backbone, $, ManagerTemplate){
        return Backbone.View.extend({
            el:$("#main-container")
        },
        initialize:function(){

        },
        render:function(){
            this.$el.html(ManagerTemplate);
        }

        )
    });