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
                this.getStatusAndCategory();
               
             },


            render : function(){
                var self=this;
                console.log("render table") 
                console.log(TableIssueView.statuses);
                console.log(TableIssueView.categories); 
                console.log(this.collection.length);
               
                var templ = this.template({
                issues: this.collection.models,
                statuses: TableIssueView.statuses,
                categories: TableIssueView.categories
            });
                
                this.$el.html(templ);
                return this;
            },

             getStatusAndCategory: function (){
                var self=this;
                $.get("statusesandcategories",  function(data) {
                        TableIssueView.statuses = data.statuses;
                        TableIssueView.categories = data.categories;
                        console.log(TableIssueView.statuses);
                        console.log(TableIssueView.categories);

                });
            }
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