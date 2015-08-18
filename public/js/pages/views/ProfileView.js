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
    "text!pages/templates/ChangePasswordTemplate.html",
    "text!pages/templates/TableIssueUserTemplate.html",
    "TableIssueView" , 

    "IssuesView",
    "Issues",
    "Issue" 

    
    ],
    function( $, _, Backbone,  User, ProfileTemplate,
            NotificationSuccess, NotificationInfo, 
            NotificationWarning, NotificationDanger,ChangePassword,TableIssueUserTemplate,TableIssueView, IssuesView, Issues, Issue ){
        
    var ProfileView = Backbone.View.extend({
        template:_.template(ProfileTemplate),
        statuses:{},
        categories: {},
        //el:$("#profile-container"),
        el:$("#main-container"),
        events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #userinfo-link" : "allissues",
                "click #changepassword-link" : "changePass",
                "click #myissues-link" : "userIssue",
             
        },
        initialize:function(){
            this.getStatusAndCategory();
            this.render();
        },
  
        render: function() {
        	this.$el.empty();
                console.log(session.user.id);
                this.$el.html(this.template(
                    { 
                        logged_in: session.get("logged_in"),
                        user: session.user.toJSON(),
                        search: '' 
                    }
                    ));

            return this;
        },
        changePass: function(){
          this.$('#manager-panel').empty();
          var templatePass = _.template(ChangePassword);
          this.render();
          this.$('#manager-panel').append(templatePass); 
        },

        userIssue: function(){
          var self = this;
        $.get("/issues/user/" + session.user.id, function(data){
                self.$('#manager-panel').empty();
                var templ = _.template(TableIssueUserTemplate);
                var toTable = templ({
                issues: data,
                statuses: ProfileView.statuses,
                categories: ProfileView.categories
                });
                self.render();
                self.$('#manager-panel').append(toTable); 
                                        
        });
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
        getStatusAndCategory: function (){
            var self=this;
            $.get("statusesandcategories",  function(data) {
                    ProfileView.statuses = data.statuses;
                    ProfileView.categories = data.categories;
                    console.log(ProfileView.statuses);
                    console.log(ProfileView.categories);
            });
        }
    });
        return ProfileView;
    }
);        