define([
    "jquery",
    "underscore",
    "backbone",
    "User",
    "text!pages/templates/ProfileTemplate.html",
    "text!pages/templates/NotificationSuccess.html",
    "text!pages/templates/NotificationInfo.html",
    "text!pages/templates/NotificationWarning.html",
    "text!pages/templates/NotificationDanger.html",
    "TableIssueView" , 

    "IssuesView",
    "Issues",
    "Issue" 

    
    ],
    function( $, _, Backbone,  User, ProfileTemplate,
            NotificationSuccess, NotificationInfo, 
            NotificationWarning, NotificationDanger,TableIssueView, IssuesView, Issues, Issue ){
        return Backbone.View.extend({
        template:_.template(ProfileTemplate),
        //el:$("#profile-container"),
        el:$("#main-container"),
        events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #allissues-link" : "allissues",
                "click #recentlyissues-link" : "newissues",
                "click #solvedissues-link" : "solvedissues",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #search-btn": "onSearchClick",
                "change .status-selector" : "statusChanged",
                "change .category-selector" : "categoryChanged"
        },
        initialize:function(){
            this.render();
        },
  
        render: function() {
        	var template = _.template(ProfileTemplate);
                this.$el.html(ProfileTemplate);

            return this;
        },
        onLogoutClick:function(e){
              e.preventDefault(e);
              $.post("/auth/logout", {},function(data){
                  if(data.status=="error"){
                      alert("Something wrong");
                  }
                  else{
                      window.location.href="/";
                  };
              });
        },
       });
       });        