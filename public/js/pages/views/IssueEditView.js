define([
        "text!pages/templates/IssueEditTemplate.html",    
        "jquery",
        "underscore",
        "backbone",
        "Issue",
        "colorbox"
        ],
        function(IssueEditTemplate, $, _, Backbone, Issue, colorbox){
        var IssueEditView=Backbone.View.extend({
        statuses:{},
        categories: {},
        
        initialize: function(data){
            this.id = data.id;
        },
    
        render:function (managerView) {
            $.get("statusesandcategories",  function(data) {
                IssueEditView.statuses = data.statuses;
                IssueEditView.categories = data.categories;
            });
            var issueEditModelOld = new Issue({id: this.id});
            var that = this;
            issueEditModelOld.fetch({
                success: function(){
                    var template = _.template(IssueEditTemplate);
                   
                    template = template({
                        issue: issueEditModelOld.attributes,
                        statuses: IssueEditView.statuses,
                        categories: IssueEditView.categories
                    });
                    
                    $.colorbox({html:template, width:"450",
                        height: "100%",
                        speed: 50,
                        opacity: 0.5,
                        closeButton: false,
                        onClosed:function(){
                            console.log("Popup window: onClosed.");
                            $.colorbox.remove();
                        }, //end onClosed   
                    });
                    
                    $('[data-toggle="tooltip"]').tooltip()
                    
                    $("#issue_edit_cancel").click(function() {
                        $.colorbox.close();
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
                        
                        if ($('#issue-name').val() !== issueEditModelOld.get('name')){
                            issueEditModelNew.set('name', $('#issue-name').val());
                        };
                        
                        if ($('#issue-description').val() !== issueEditModelOld.get('description')){
                            issueEditModelNew.set('description', $('#issue-description').val());
                        };
                        
                        if ($('input:radio[name=severity]:checked').val() !== issueEditModelOld.get('severity')){
                            issueEditModelNew.set('severity', $('input:radio[name=severity]:checked').val());
                        };

                        if ($('#issue-category_id').val() !== issueEditModelOld.get('category_id')){
                            issueEditModelNew.set('category_id', $('#issue-category').val());
                        };

                        if ($('#issue-status_id').val() !== issueEditModelOld.get('history_up_to_date').status_id){
                            issueEditModelNew.set('status', $('#issue-status_id').val());
                        };
                        
                        console.log("save");
                        issueEditModelNew.save({
                            patch: true,
                            success: function(){
                                alert('saved successful');
                                $.colorbox.close();
                            },
                            });
                        managerView.universalshow(managerView.path);
                        console.log("saved");
                        
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