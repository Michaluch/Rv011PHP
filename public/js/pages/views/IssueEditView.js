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
        //el: $('#main-container'),
        // model: new Issue,
        model: {},
        model2: {},
        template:_.template(IssueEditTemplate),

        events: {
        },

        initialize: function(data){
            console.log("initializing issue edit start.");
            var that = this;
            if (typeof this.id !== 'undefined' && this.id !== null){
                this.model = new Issue({id: this.id});
                this.model.fetch({
                    success: function(){
                        console.log("fetching successfull");
                        that.render();
                    },
                });
            }
            else {
                console.log("Invalid Issue ID ("+this.id+").");
            }
            console.log("initializing issue edit end.");
        },
    
        render:function () {
            var that = this;
            console.log("rendering issue edit start.");
            var template = _.template(IssueEditTemplate);
            this.template = template(this.model.attributes);
            $.colorbox({html:this.template, width:"400",
                speed: 50,
                opacity: 0.5,
                closeButton: false,
                onClosed:function(){
                    console.log("onIssueEditClose");
                    $.colorbox.remove();
                }
            });
            $("#issue_edit_cancel").click(function() {
                $.colorbox.close();
                return false;
            });
            $("#issue_edit_save").click(function() {
                that.model.set('name', $('#issue-name').val());
                that.model.set('category', null);
                that.model.set('status', null);
                alert(that.model.get('name'));
                console.log("save");
                that.model.save({patch: true});
                console.log("saved");
                return false;
            });
            console.log("rendering issue edit end.");
        },
    


    });
    return IssueEditView;
});