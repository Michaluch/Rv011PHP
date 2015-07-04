define([
        "underscore",
        "backbone",
        "jquery",
        "hash"
       
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