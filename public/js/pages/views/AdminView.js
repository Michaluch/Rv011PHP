define([
    "text!pages/templates/AdminTemplate.html",
    "text!pages/templates/ChangePasswordTemplate.html",
    "text!pages/templates/TableUserTemplate.html",
    "jquery",
    "underscore",
    "backbone",
    "User",
    "Users"
    ],
    function(AdminTemplate,
            ChangePassword, TableUserTemplate, $, _, Backbone,  User, Users){
        
    var AdminView = Backbone.View.extend({
        template:_.template(AdminTemplate),
        tabletemplate:_.template(TableUserTemplate),
        roles: {},
        statuses: {},
        //el:$("#profile-container"),
        el:$("#main-container"),
        events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #changepassword-link" : "changePass",
                "click #add-user"  : "onAddUserClick",
                "click .user-remove-button" : "onUserRemoveButtonClick",
                "click #all-users" : "showAllUsers"
        },
        initialize:function(){
            this.render();
            this.showAllUsers();
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
    },
        onAddUserClick: function(){
            $( '#AddUserModal' ).modal();
        },
        
        onUserRemoveButtonClick: function(){
            alert('ha-ha, user deleted');
            this.showAllUsers();
        },
        
        showAllUsers: function(){
            var that = this;
            this.users = new Users();
            this.users.fetch({
                success: function (){
                    var template = _.template(TableUserTemplate);
                    template = template({users: that.users.models});
                    $('#manager-panel-table').html(template);
                }
            });
        }

    });
        return AdminView;
    }
);        