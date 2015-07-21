define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/templates/SignUpFormTemplate.html",
        "text!pages/templates/SimpleMessage.html",
        "User",
        "hash",
        "bootstrap",
        "signinform",
        "signUpValidation"
       
    ],
    function(_, Backbone, $, SignUpFormTemplate, SimpleMessage, User,hash,boot,signinform, signUpValidation) {
        var View = Backbone.View.extend({
            el: $('#sidebar'), 
            initialize: function(){	
                // console.log(this.collection.toJSON());
                
            },
            
            render: function() {
                sidebar.turnOn();
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
            
            setAvatar: function(){
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
                            // alert(response.message);
                            // router.navigate('login', {trigger: true});
                            var template = _.template(SimpleMessage);
                            $('#sidebar').html(template({message: response.message}));
                            
                        },
                        error:function(model,response){     
                            var obj = JSON.parse(response.responseText) || $.parseJSON(response.responseText);
                            if (obj.email) {
                                var $error_field = $('#email');
                                var $group = $error_field.closest('.form-group');
                                $group.addClass('has-error');
                                $group.find('.help-block').html(obj.email).removeClass('hidden');
                            }
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
