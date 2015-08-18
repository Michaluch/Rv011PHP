define([
    
    "jquery",
    "underscore",
    "backbone",
    "text!pages/templates/EditCategoriesTemplate.html",
    "RowCategoryView",
    "Category"
    ],
    function( $, _, Backbone, EditCategoriesTemplate, RowCategoryView, Category){
        var TableCategoriesView = Backbone.View.extend({
            template : _.template(EditCategoriesTemplate),
            tagName : "div",

            events:{
                
            },

           

            initialize: function(){
               // this.getStatusAndCategory();
               
             },


            render : function(){
                var self=this;
               
                var templ = this.template({
                categories: this.collection.models
                });
                
                this.$el.html(templ);
                return this;
            },

          
            });
        return TableCategoriesView;
    }
);
