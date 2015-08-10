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
            events:{
                
            },

            initialize:function(){
               
            },


            render : function(){
                console.log("render table")  
                console.log(this.collection.length);

                var templ = this.template({
                        issues: this.collection.models
                });

                this.$el.html(templ);
                return this;
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