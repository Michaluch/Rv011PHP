define([
    "text!pages/templates/IssuesTemplate.html",    
    "jquery",
    "underscore",
    "backbone",
    "Issue",
    "Issues",
    "IssueView"
    ],
    function(IssuesTemplate, $, _, Backbone, Issue, Issues, IssueView){
        var IssuesView = Backbone.View.extend({
            template:_.template(IssuesTemplate),
            tagName:'ul',
            model: Issues,
            el: $('#main-container'), 
            initialize: function(){
              //Issues.fetch();
              //console.log(Issues); 
            },           
            render:function(e){
              console.log(this.model);
              var issues=new Issues();
              var self=this;
              this.$el.empty();
              issues.fetch({
                success: function(issues) {
                  console.log(issues);
                    var template = self.template({
                        issues: issues.models
                    });
                    
                    self.$el.html(template);
                }
            });

             // this.$el.empty();
              //this.$el.html(this.template(
               // {issues: issues}
              //));
            },

        });
        return IssuesView;
    });