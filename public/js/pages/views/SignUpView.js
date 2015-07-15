define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/templates/SignUpFormTemplate.html",
        "text!pages/templates/SimpleMessage.html",
        "User",
        "hash",
        "bootstrap",
        "signinform"
       
    ],
    function(_, Backbone, $, SignUpFormTemplate, SimpleMessage, User,hash,boot,signinform) {
        var View = Backbone.View.extend({
            el: $('#sidebar'), 
            initialize: function(){	
                //console.log(this.collection.toJSON());
                
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
                'submit' : 'addUser',
                'change input#imgInp': 'setAvatar'
      
            },

            setAvatar: function(){
                readURL(this.$("#imgInp"));
            },


            addUser: function  (e) {
                e.preventDefault(); // reset default settings
                var hash = CryptoJS.SHA512(this.$('#password').val());
                this.model.save({
                    email       :this.$('#email').val(),
                    password    :hash.toString(),
                    avatar_url  :this.$('#imgInp').val()
                    }, {
                        success:function(model,response){
                            //alert(response.message);
                            //router.navigate('login', {trigger: true});
                            var template = _.template(SimpleMessage);
                            $('#sidebar').html(template({message: response.message}));
                            
                        },
                        error:function(model,response){     
                            var obj = JSON.parse(response.responseText) || $.parseJSON(response.responseText);
                            alert(obj.email);
                            }
                        } 
                    }); 
      
            }
        });
    return View;
    }

);
