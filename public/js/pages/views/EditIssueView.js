define([
    "text!pages/templates/EditIssueTemplate.html",    
    "jquery",
    "underscore",
    "backbone",
    "Issue",
    "colorbox"
    ],
    function(EditIssueTemplate, $, _, Backbone, Issue, colorbox){
        var EditIssueView=Backbone.View.extend({
        el: $('#main-container'),
        //model:Issue,
        template:_.template(EditIssueTemplate),
        events: {

        },
        statuses: {

        },

        initialize:function(){
            $.get("statuses", {},function(data){
                statuses=data;
                console.log(statuses);
            });
        },

        render:function (e) {
            $.colorbox({html:this.template,height:"70%",width:"70%", onClosed:function(){
                window.location.href="/#manager";    
            }}); 
            return this;
        }

        });
        return EditIssueView;
    });