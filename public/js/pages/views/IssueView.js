define([
    "text!pages/templates/IssueTemplate.html",    
    "jquery",
    "underscore",
    "backbone",
    "Issue",
    "Issues"
    ],
    function(IssueTemplate, $, _, Backbone, Issue, Issues){
        var IssueView=Backbone.View.extend({
        tagName:"li",
        el: $('#main-container'),
        //model:Issue,
        template:_.template($('#main-container').html()),

        render:function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }

        });
        return IssueView;
    });