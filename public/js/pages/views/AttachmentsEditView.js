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
                    
                    $("span.att-zoom").click(function(e) {
                        var big_image='<img class="img-responsive center-block" src="'+$(e.target).attr('attachment-url')+'">';
                        $.colorbox({html: big_image, height:"80%",width:"80%"});
                    });
                    
                    $("span.att-remove").click(function(e) {
                        that.hint.displayHintMessage('Are you sure you want to delete this image? <button class="btn btn-default btn-xs" id="image-delete-confirmation-button" attachment-id="'+$(e.target).attr('attachment-id')+'">Yes!</button>');
                        
                        $("#image-delete-confirmation-button").click(function(e) {
                            var attachment = new Attachment({id: $(e.target).attr('attachment-id')});
                            attachment.destroy({
                                success: function() {
                                    that.render();
                                    that.hint.displayHintMessage('Image deleted successfully.');
                                },
                            });
                        });
                     });
                    
                    
                },
            });
            

            
                         
            return false;
                
        },
        });
        
    return AttachmentsEditView;
});