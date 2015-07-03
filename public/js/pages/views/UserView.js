define([
        "underscore",
        "backbone",
        "jquery"
       
    ],
    function(_, Backbone, $) {
        return Backbone.View.extend({
        el: $('#content'),
        initialize: function(){
        	
        },
            render: function() {
                this.$el.html(LoginTemplate);
            }
        });


    }

);