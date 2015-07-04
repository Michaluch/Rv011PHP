define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/templates/SignInFormTemplate.html"
       
    ],
    function(_, Backbone, $, SignInFormTemplate) {
        return Backbone.View.extend({
            el: $('#sidebar'),
            initialize: function(){	
            },
            
            render: function() {
        	var template = _.template(SignInFormTemplate);
                this.$el.html(SignInFormTemplate);
            }
        });


    }

);