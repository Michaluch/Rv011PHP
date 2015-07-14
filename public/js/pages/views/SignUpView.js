define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/templates/SignUpFormTemplate.html",
        "User",
        "hash",
        "bootstrap",
        "signinform"
       
    ],
    function(_, Backbone, $, SignUpFormTemplate,User,hash,boot,signinform) {
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
                            alert(response.message);
                        },
                        error:function(model,response){     
                            var obj = JSON.parse(response.responseText) || $.parseJSON(response.responseText);
                            alert(obj.message);
                        } 
                    }); 
      
            }
        });
    return View;
    }

);
