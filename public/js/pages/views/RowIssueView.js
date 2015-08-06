/**
 * Use when decided to render row one by one 
 * now not used-->
 */
define([
    
    "jquery",
    "underscore",
    "backbone",
    "text!pages/templates/RowIssueTable.html"
    ],
    function( $, _, Backbone,RowIssueTable){
        var RowView = Backbone.View.extend({
            
            tagName : "tr",
            template: _.template(RowIssueTable),
          
            render:function(){

            //alert(template.html());
            console.log(this.model);
            this.$el.empty();
            this.$el.html(this.template(this.model));
            return this;
            }
            });
        return RowView;
    }
);