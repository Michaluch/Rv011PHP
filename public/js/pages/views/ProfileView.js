define([
    "underscore",
    "backbone",
    "jquery",
	"SessionModel",
	"User",
    "text!pages/templates/ProfileTemplate.html"
    ],
    function(_, Backbone, $, SessionModel, User, ProfileTemplate){
        return Backbone.View.extend({
        el:$("#profile-container"),
         initialize:function(){
            
         },
  
         render: function() {
        	var template = _.template(ProfileTemplate);
                this.$el.html(ProfileTemplate);
            }
       });
       });        