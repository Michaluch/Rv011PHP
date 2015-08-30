define([
    "text!pages/templates/AdminTemplate.html",
    "text!pages/templates/ChangePasswordTemplate.html",
    "text!pages/templates/TableUserTemplate.html",
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
    "colorbox"   
    ],
    function(AdminTemplate,
            ChangePassword, TableUserTemplate, $, _, Backbone,  Users, User, SimpleMessage,
                NotificationSuccess, NotificationInfo, NotificationWarning, NotificationDanger,
                hash, signUpValidation, colorbox){
        
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
                "click #adduser-btn": "onAddUserBtnClick",
                'change input#imgInp': 'setAvatar',
                'blur input#email': 'changedEmail',
                'blur input#password': 'changedPassword',
                'blur input#confpass': 'changedConfpass',
                'focus input#email': 'focusEmail',
                'focus input#password': 'focusPassword',
                'focus input#confpass': 'focusConfpass',
           		"click #all-users" : "showAllUsers"
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
    },
        onAddUserClick: function(){
            $( '#AddUserModal' ).modal();
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
                            $.colorbox({html:template1({message: response.message}),height:"30%",width:"30%"}); 
                        },
                        error:function(model,response){     
                            var template2 = _.template(NotificationWarning);//notification
                            var obj = JSON.parse(response.responseText) || $.parseJSON(response.responseText);
                            $.colorbox({html:template2({message: obj.email}),height:"30%",width:"30%"}); 
                            // var obj = JSON.parse(response.responseText) || $.parseJSON(response.responseText);
                            //if (obj.email) {
                            //    var $error_field = $('#email');
                            //    var $group = $error_field.closest('.form-group');
                            //    $group.addClass('has-error');
                            //    $group.find('.help-block').html(obj.email).removeClass('hidden');
                            //}
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

    });
        return AdminView;
    }
);        