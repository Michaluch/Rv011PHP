define([
        "text!pages/templates/IssueEditTemplate.html",
        "text!pages/templates/IssueEditAttachmentsTemplate.html",
        "jquery",
        "underscore",
        "backbone",
        "Issue",
        "AttachmentsEditView",
        "Attachment",
        ],
        function(IssueEditTemplate, IssueEditAttachmentsTemplate, $, _, Backbone, Issue, AttachmentsEditView, Attachment){
        var IssueEditView=Backbone.View.extend({
        statuses:{},
        categories: {},
        
        hint: {
            hint: null,
            setMessage: function(hint){
                this.hint = hint;
            },
            setErrorStyle: function(){
                $('.issue-edit-hint').addClass('issue-edit-hint-error');
            },
            setInfoStyle: function(){
                $('.issue-edit-hint').removeClass('issue-edit-hint-error');
            },
            displayHint: function(){
                this.setInfoStyle();
                $('#issue-edit-hint').html(this.hint);                
            },
            displayErrorHint: function(){
                this.setErrorStyle();
                $('#issue-edit-hint').html(this.hint);
            },
            displayHintMessage: function(hint){
                this.setInfoStyle();
                this.hint = hint;
                this.displayHint();                
            },
            displayErrorHintMessage: function(hint){
                this.hint = hint;
                this.displayErrorHint();                
            }
        },
        
        initialize: function(data, managerView){
            var that = this;
            this.id = data.id;
            this.hint.setMessage("Congratulations! Now You can edit this event.");
            $.get("statusesandcategories",  function(data) {
                that.statuses = data.statuses;
                that.categories = data.categories;
                that.render(managerView);
            });
        },
    
        render:function (managerView) {
            /*

            */
//            IssueEditView.statuses = managerView.statuses;
//            IssueEditView.categories = managerView.categories;
            console.log('-------------');
            console.log(managerView);
            console.log('-------------');
            var issueEditModelOld = new Issue({id: this.id});
            var that = this;
            issueEditModelOld.fetch({
                success: function(){
                    
                    var template = _.template(IssueEditTemplate);
                    template = template({
                        issue: issueEditModelOld.attributes,
                        statuses: that.statuses,
                        categories: that.categories,
                    });

                    $('#modal').html(template);
                    $('#modal').modal();
                    
                    var attachmentsEditView = new AttachmentsEditView(that.id, that.hint);
                    attachmentsEditView.render();
                    
                    that.hint.displayHint();
                    
                    $('[data-toggle="tooltip"]').tooltip()
                    
                    $("#issue_edit_cancel").click(function() {
                        $('#modal').modal('hide');
                        return false;
                    });
                                        
                    $("#issue_edit_save").click(function() {
                        var issueEditModelNew = new Issue({
                            id : that.id,
                            name: null,
                            category_id: null,
                            description: null,
                            severity: null,
                            map_pointer: null,
                            category: null,
                            date: null,
                            status: null
                        }); //end issueEditedModel
                        
                        var ok_save = true;
                        var we_have_changes = false;
                        
                        if (_.escape($('#issue-name').val()) !== issueEditModelOld.get('name')){
                            if ($('#issue-name').val().length >= 5) {
                                issueEditModelNew.set('name', _.escape($('#issue-name').val()));
                                we_have_changes = true;
                            }
                            else {
                                ok_save = false;
                                that.hint.setMessage("Title is too small.");
                            }
                        };
                        
                        if (_.escape($('#issue-description').val()) !== issueEditModelOld.get('description')){
                            if ($('#issue-description').val().length >= 10) {
                                issueEditModelNew.set('description', _.escape($('#issue-description').val()));
                                we_have_changes = true;
                            }
                            else {
                                ok_save = false;
                                that.hint.setMessage("Description is too small.");
                            }
                        };
                        
                        if ($('input:radio[name=severity]:checked').val() !== issueEditModelOld.get('severity')){
                            issueEditModelNew.set('severity', $('input:radio[name=severity]:checked').val());
                            we_have_changes = true;
                        };

                        if ($('#issue-category_id').val() !== issueEditModelOld.get('category_id')){
                            issueEditModelNew.set('category_id', $('#issue-category_id').val());
                            we_have_changes = true;
                        };

                        if ($('#issue-status_id').val() !== issueEditModelOld.get('history_up_to_date').status_id){
                            issueEditModelNew.set('status', $('#issue-status_id').val());
                            we_have_changes = true;
                        };
                        
                        if (!ok_save){
                            that.hint.displayErrorHint();
                        }
                        else if (!we_have_changes) {
                            that.hint.displayErrorHintMessage("Nothing to save.")
                        }
                        else {
                            issueEditModelNew.save({patch: true}, {
                                success: function(model, response){
                                    managerView.universalshow(managerView.path);
                                    that.hint.setMessage('Issue saved successfully.');
                                    that.render(managerView);
                                    console.log("saved");
                                },
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
    return IssueEditView;
});