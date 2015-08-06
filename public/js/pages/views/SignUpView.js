define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/templates/SignUpFormTemplate.html",
        "text!pages/templates/SimpleMessage.html",
        "text!pages/templates/NotificationSuccess.html",
        "text!pages/templates/NotificationInfo.html",
        "text!pages/templates/NotificationWarning.html",
        "text!pages/templates/NotificationDanger.html",
        "User",
        "hash",
        "bootstrap",
        "signinform",
        "signUpValidation",
        "colorbox"     
    ],
    function(_, Backbone, $, SignUpFormTemplate, SimpleMessage,
                NotificationSuccess, NotificationInfo, NotificationWarning, NotificationDanger,
                User, hash, boot, signinform, signUpValidation, colorbox
        )   {
        var View = Backbone.View.extend({
            el: $('#sidebar'), 
            initialize: function(){	
                // console.log(this.collection.toJSON())    
            },
            
            render: function() {
                this.sidebar.turnOn();
                var template = _.template(SignUpFormTemplate);
                this.$el.html(SignUpFormTemplate);
            },
            
            renderSignedIn: function(m) {
                this.$el.html(SimpleMessage, {message: m});
            },

            events: {
                'submit': 'addUser',
                'change input#imgInp': 'setAvatar',
                'blur input#email': 'changedEmail',
                'blur input#password': 'changedPassword',
                'blur input#confpass': 'changedConfpass',
                'focus input#email': 'focusEmail',
                'focus input#password': 'focusPassword',
                'focus input#confpass': 'focusConfpass',
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

            addUser: function  (e) {
                e.preventDefault(); // reset default settings
                if (signUpValidation.checkAll()){
                var hash = CryptoJS.SHA512(this.$('#password').val());
                this.model.save({
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
            }
        });
    return View;
    }

);
