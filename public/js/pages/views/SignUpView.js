define([
        "underscore",
        "backbone",
        "jquery",
        "text!pages/templates/SignUpFormTemplate.html",
        "User",
        "hash",
        "bootstrap"
       
    ],
    function(_, Backbone, $, SignUpFormTemplate,User,hash,boot) {
        var View = Backbone.View.extend({
            el: $('#sidebar'), 
            initialize: function(){	
                //console.log(this.collection.toJSON());
            },
            
            render: function() {
        	var template = _.template(SignUpFormTemplate);
                this.$el.html(SignUpFormTemplate);
            },

            events: {
                'submit' : 'addUser'
            },

            

            addUser: function  (e) {
                e.preventDefault(); // reset default settings
                //var hash = CryptoJS.SHA512(this.$('#password').val());
                // Backbone.emulateHTTP = true ;
                // create send model to server
            
    
                this.collection.create({
                    email       :this.$('#email').val(),
                    password    :hash,
                    avatar_url  :this.$('#imgInp').val()
                    //,}, 
                    //{   
                    //    success: function (model, response) {
                    //    console.log("success");
                    //    },
                    //    error: function (model, response) {
                    //    console.log("error");
                    //    }
                    //}
                    }, {
                        success:function(model,response){
                            var data=response.status;
                            alert(data);
                            console.log(response);
                        },
                        error:function(model,response){
                            //var data=response.status;
                            alert("Hi er");
                            console.log(response);}
                    }); 
           
            
                //this.collection.create({
                ////id          :0,  
                //email       :this.$('#email').val(),
                //password    :hash,
                ////facebook_id :this.$('#').val(),
                ////google_id   :this.$('#').val(),
                ////role_id     :0,
                ////status_id   :0,
                //avatar_url  :this.$('#imgInp').val(),
                ////language_id :0
                //});         
            }
        });
    return View;
    }

);