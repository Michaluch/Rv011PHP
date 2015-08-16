define([
        "text!pages/templates/IssueEditAttachmentsTemplate.html",
        "jquery",
        "underscore",
        "backbone",
        "Issue",
        "Attachment"
        ],
        function(IssueEditAttachmentsTemplate, $, _, Backbone, Issue, Attachment){
        var AttachmentsEditView=Backbone.View.extend({
        
        issue_id: null,
        
        initialize: function(issue_id, hint){
            //attachments = new Attachments();
            //tatchments.featchFromIssueAttachments();
            this.issue_id = issue_id;
            this.hint = hint
        },
    
        render:function () {
            var that = this;
            var issueEditModelAttachments = new Issue({id: this.issue_id});
            issueEditModelAttachments.fetch({
                success: function(){
                    this.attachments = issueEditModelAttachments.get('attachments');
                    var attachmentsTemplate = '<center>No immages<br>';
                    if (typeof this.attachments !== 'undefined' && this.attachments.length > 0) {
                        attachmentsTemplate = _.template(IssueEditAttachmentsTemplate);
                        attachmentsTemplate = attachmentsTemplate({
                            attachments: this.attachments,
                        });
                    }
                    
                    $('#attachments').html(attachmentsTemplate);
                    
                    $('[data-toggle="tooltip"]').tooltip();
                    
                    $("span.att-remove").click(function(e) {
                        var attachment = new Attachment({id: $(e.target).attr('attachment-id')});
                        attachment.destroy({
                            success: function() {
                                that.render();
                                hint.displayHintMessage('Image deleted successfully.');
                            },
                        });
                     });
                    
                },
            });
            

            
                         
            return false;
                
        },
        });
        
    return AttachmentsEditView;
});