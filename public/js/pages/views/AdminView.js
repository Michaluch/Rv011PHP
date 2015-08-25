define([
    "jquery",
    "underscore",
    "backbone",
    "User",
    "text!pages/templates/AdminTemplate.html",
    "text!pages/templates/ChangePasswordTemplate.html",   
    ],
    function( $, _, Backbone,  User, AdminTemplate,
            ChangePassword,TableIssueUserTemplate){
        
    var AdminView = Backbone.View.extend({
        template:_.template(AdminTemplate),
        statuses:{},
        categories: {},
        //el:$("#profile-container"),
        el:$("#main-container"),
        events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #changepassword-link" : "changePass"             
        },
        initialize:function(){
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
        onLeftsidebarbtnClick:function(){
        var $sidebar = $("#left-sidebar");
        var $panel = $("#manager-panel");

        if($sidebar.is(":visible")){
            $sidebar.addClass("sidebar-mobile");
            $panel.addClass("col-sm-12 col-xs-12").removeClass("col-sm-9 col-xs-6");
        }
        else{
            $sidebar.addClass("col-sm-3 col-xs-6").removeClass("sidebar-mobile");
            $panel.removeClass("col-sm-12 col-xs-12").addClass("col-sm-9 col-xs-6");
        }
    }
    });
        return AdminView;
    }
);        