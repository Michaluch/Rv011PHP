define([
    "text!pages/templates/AdminTemplate.html",
    "text!pages/templates/ChangePasswordTemplate.html",
    "text!pages/templates/TableUserTemplate.html",
    "text!pages/templates/UserDeleteConfirmationVindowTemplate.html",
    "jquery",
    "underscore",
    "backbone",
    "Users",
    "User",
    "text!pages/templates/SimpleMessage.html",
    "text!pages/templates/NotificationSuccess.html",
    "text!pages/templates/NotificationInfo.html",
    "text!pages/templates/NotificationWarning.html",
    "text!pages/templates/NotificationDanger.html",
    "hash",
    "signUpValidation",
    "colorbox",
    "EditUserView"   
    ],
    function(AdminTemplate,
            ChangePassword, TableUserTemplate, UserDeleteConfirmationVindowTemplate, $, _, Backbone,  Users, User, SimpleMessage,
                NotificationSuccess, NotificationInfo, NotificationWarning, NotificationDanger,
                hash, signUpValidation, colorbox, EditUserView){
        
    var AdminView = Backbone.View.extend({
        template:_.template(AdminTemplate),
        tabletemplate:_.template(TableUserTemplate),
        roles: [],
        statuses: [],
		//el:$("#profile-container"),
        el:$("#main-container"),
        events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #changepassword-link" : "changePass",
                "click #add-user"  : "onAddUserClick",           
                "click #adduser-btn": "onAddUserBtnClick",
                'change input#imgInp': 'setAvatar',
                'blur input#email': 'changedEmail',
                'blur input#password': 'changedPassword',
                'blur input#confpass': 'changedConfpass',
                'focus input#email': 'focusEmail',
                'focus input#password': 'focusPassword',
                'focus input#confpass': 'focusConfpass',
           		"click #all-users" : "showAllUsers",
           		"click .user-remove-button" : "onUserRemoveButtonClick",
                "click .user-edit-button" : "onUserEditButtonClick",
        },
        initialize:function(){
            that = this;
            this.render();
            $.get("userstatusesandroles",  function(data) {
                _.each(data.statuses, function(status){that.statuses[status.id]=status.name});
                _.each(data.roles, function(role){that.roles[role.id]=role.name});
                console.log(that.statuses);
                that.showAllUsers();
            });
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
            $('#email').val("");
            $('#password').val("");
            $('#confpass').val("");
            $('#imgInp').val("");

         },   
        onAddUserBtnClick: function(e){
            e.preventDefault(); // reset default settings
            var user=new User();
            var self=this;
            if (signUpValidation.checkAll()){
            var hash = CryptoJS.SHA512(this.$('#password').val()); 
                user.save({
                    email       :this.$('#email').val(),
                    password    :hash.toString(),
                    avatar_url  :this.$('#imgInp').val()
                    }, {
                        success:function(model,response){
                                var file = this.$("#imgInp")[0].files[0];
                                var formData = new FormData($("#sign_up_form").get(0));
                                formData.append('attachments', file);
                                formData.append('email', this.$('#email').val());
                                formData.append('type','User'); // add type of attch for AttchController
                                $.ajax({
                                    url: '/attachment',
                                    data: formData ,
                                    cache: false,
                                    processData: false,
                                    contentType: false,
                                    type: 'POST',
                                    accept: "image/jpeg', 'image/gif', 'image/pjpeg', 'image/png'"
                                });
                            //var template = _.template(SimpleMessage);
                            //$('#sidebar').html(template({message: response.message}));
                            var template1 = _.template(NotificationSuccess); // notification
                            $.colorbox({html:template1({message: "You've added user"}),height:"30%",width:"30%"});
                            $('#AddUserModal').modal('hide');
                            self.showAllUsers();

                        },
                        error:function(model,response){     
                            var template2 = _.template(NotificationWarning);//notification
                            var obj = JSON.parse(response.responseText) || $.parseJSON(response.responseText);
                            $.colorbox({html:template2({message: obj.email}),height:"30%",width:"30%"}); 
                        } 
                    });  
            }
            else{
            signUpValidation.checkField('email');
            signUpValidation.checkField('password');
            signUpValidation.checkField('confpass');
            }
        },

        changedEmail: function() {
                signUpValidation.checkField('email');
            },

        changedPassword: function() {
            signUpValidation.checkField('password');
        },
        
        changedConfpass: function() {
            signUpValidation.checkField('confpass');
        },
        
        focusEmail: function() {
            signUpValidation.focusField('email');
        },

        focusPassword: function() {
            signUpValidation.focusField('password');
        },
        
        focusConfpass: function() {
            signUpValidation.focusField('confpass');
        },
        
        setAvatar: function(e){
            readURL(this.$("#imgInp"));
                 
        },
        
       onUserRemoveButtonClick: function(e){
                that=this;
                that.delete_user_confirmed = false;
                var user_id = $(e.target).closest('tr').attr('data-id');
                var template = _.template(UserDeleteConfirmationVindowTemplate);
                $.colorbox({html:template({user_id: user_id}), 
                    height:"30%", 
                    width:"30%",
                    speed: 0,
                    opacity: "0.4",
                    closeButton: false,
                    onClosed: function(){
                        if (that.delete_user_confirmed){
                            that.onUserRemoveConfirm(user_id);
                        }
                    }
                });
                $('#yes_i_want_to_remove_this_user').click(function(){
                        that.delete_user_confirmed = true;
                        $.colorbox.close();
                    });
                $('#colorbox_close').click(function(){
                        $.colorbox.close();
                    });
        },
        onUserEditButtonClick: function(e){
               e.preventDefault();
               var user_id = $(e.target).closest('tr').attr('data-id');
               var editUserView = new EditUserView(user_id, this);

        },

        onUserRemoveConfirm: function(user_id){
            that = this;
            var deleteUser = new User({id: user_id});
            deleteUser.url = '/users/'+user_id;
            deleteUser.destroy({
                success: function(model,response) {
                    if (response.status == 'error'){
                        var template = _.template(NotificationWarning);
                        $.colorbox({html:template({message: response.message}), 
                            height:"30%", 
                            width:"30%",
                            speed: 0,
                            opacity: "0.4"});
                    }
                    else {
                        that.showAllUsers();                        
                    }
                },
                error: function(model,response){
                    console.log('some error');
                }
            });

        },

        showAllUsers: function(){
            var that = this;
            this.users = new Users();
            this.users.fetch({
                success: function (){
                    var template = _.template(TableUserTemplate);
                    template = template({users: that.users.models,
                        statuses: that.statuses,
                        roles: that.roles,
                        });
                    $('#manager-panel-table').html(template);
                }
            });
        }        
        

    });
        return AdminView;
    }
);        