define([
    
    "jquery",
    "underscore",
    "backbone",
    "text!pages/templates/TableIssueTemplate.html",
    "RowIssueView",
    "Issue"
    ],
    function( $, _, Backbone,TableIssueTemplate,RowIssueView,Issue ){
        var TableIssueView = Backbone.View.extend({
            template : _.template(TableIssueTemplate),
            tagName : "div",
            statuses:{},
            categories: {},

            events:{
                
            },          

            initialize: function(){
               
               
             },
            render : function(){
                var self=this;
                $.get("statusesandcategories",  function(data) {
                        TableIssueView.statuses = data.statuses;
                        TableIssueView.categories = data.categories;
                        var templ = self.template({
                        issues: self.collection.models,
                        statuses: TableIssueView.statuses,
                        categories: TableIssueView.categories
                        });
                        self.$el.html(templ);
                        
                        //console.log(TableIssueView.statuses);
                        //console.log(TableIssueView.categories);

                });
                return self;

                

            },
            //addOne: function  (Issue) {
            //    //console.log(this.collection.at(0).toJSON());
            //    var singleRow = new RowIssueView({model:Issue});
            //    //console.log(singleRow.model.toJSON());
            //    this.$el.append(singleRow.render().el);
            //}
          

            });
        return TableIssueView;
    }
);