define([
    
    "jquery",
    "underscore",
    "backbone",
    "text!pages/templates/EditCategoriesTemplate.html",
    "RowCategoryView",
    "EditCategoryView",
    "Category"
    ],
    function( $, _, Backbone, EditCategoriesTemplate, RowCategoryView, EditCategoryView, Category){
        var TableCategoriesView = Backbone.View.extend({
            template : _.template(EditCategoriesTemplate),
            tagName : "div",

            events:{
                "click #edit-category": "onEditCategoryClick"
            },

           

            initialize: function(options){               
                this.managerView = options.managerView;
             },


            render : function(){
                var self=this;
                var templ = this.template({
                categories: this.collection.models
                });
                
                this.$el.html(templ);
                return this;
            },

            onEditCategoryClick: function(e) {
                e.preventDefault();
                $categoryId = $(e.currentTarget).parent().parent().siblings(':first-child').html();
                var editCategoryView = new EditCategoryView($categoryId, this.managerView);

            }

          
            });
        return TableCategoriesView;
    }
);
