define([
        "text!pages/templates/EditUserTemplate.html",
        "jquery",
        "underscore",
        "backbone",
        "User"
        ],
        function(EditUserTemplate, $, _, Backbone, User){
        var EditUserView=Backbone.View.extend({
        
       
        
        initialize: function(userId, parentView){
            var that = this;
            this.id = userId;
            that.render(parentView);            
        },
    
        render:function (parentView) {
            var userOld = new User({id: this.id});
            userOld.url = '/users/'+ this.id;
            var user_id = this.id; 
            userOld.fetch({ 
                success: function(){   

                    console.log(userOld.attributes);
                    var template = _.template(EditUserTemplate);
                    template = template({
                        user: userOld.attributes
                    });

                    $('#modal').html(template);
                    $('#modal').modal();
                    
                   
                    
                    $('[data-toggle="tooltip"]').tooltip()
                    
                    $("#user_edit_cancel").click(function() {
                        $('#modal').modal('hide');
                        return false;
                    });

                    $("#user_edit_save").click(function() {
                        var userNew = new User({
                            id : this.id,
                            email: null,
                            role: null,
                            status: null
                        }); //end issueEditedModel
                        var ok_save = true;
                        var we_have_changes = false;
                        userNew.url = '/users/' + user_id;
                        
                        if (_.escape($('#user-email').val()) !== userOld.get('email')){
                            if ($('#user-email').val().length >= 3) {
                                userNew.set('email', _.escape($('#user-email').val()));
                                we_have_changes = true;
                            }
                            else {
                                ok_save = false;
                            }
                        };
                        
                        if (_.escape($('#user-status').val()) !== userOld.get('status_id')){
                            if ($('#user-status').val().length >= 1) {
                                userNew.set('status_id', _.escape($('#user-status').val()));
                                we_have_changes = true;
                            }
                            else {
                                ok_save = false;
                            }
                        };
                        
                       if (_.escape($('#user-role').val()) !== userOld.get('role_id')){
                            if ($('#user-role').val().length >= 1) {
                                userNew.set('role_id', _.escape($('#user-role').val()));
                                we_have_changes = true;
                            }
                            else {
                                ok_save = false;
                            }
                        };
                        
                        if (!ok_save){
                          //  that.hint.displayErrorHint();
                        }
                        else if (!we_have_changes) {
                       //     that.hint.displayErrorHintMessage("Nothing to save.")
                        }
                        else {                           
                            userNew.save({patch: true}, {
                                success: function(model, response){
                                    console.log(response.message);
                                    $('#modal').modal('hide');
                                    parentView.showAllUsers();
                                    console.log("user saved");
                                },
                                error: function (model, response) {
                                    console.log("error response text: " + response.responseText);
                                }
                            });
                        }
                        
                        
                        //$.colorbox.close();
                        return false;
                    });
                    
                    //that.render();
                }, //end issueEditModel.fetch success:
            }); //end issueEditModel.fetch
        },
    


    });
    return EditUserView;
});
