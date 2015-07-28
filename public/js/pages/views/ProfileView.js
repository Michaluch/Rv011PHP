define([
    "underscore",
    "backbone",
    "jquery",
	"SessionModel",
	"User",
    "text!pages/templates/ProfileTemplate.html",
    "text!pages/templates/NotificationSuccess.html",
    "text!pages/templates/NotificationInfo.html",
    "text!pages/templates/NotificationWarning.html",
    "text!pages/templates/NotificationDanger.html"
    ],
    function(_, Backbone, $, SessionModel, User, ProfileTemplate
            NotificationSuccess, NotificationInfo, 
            NotificationWarning, NotificationDanger){
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