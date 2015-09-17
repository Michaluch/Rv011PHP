define([
        "text!pages/templates/AddCategoryTemplate.html",
        "jquery",
        "underscore",
        "backbone",
        "Category"
        ],
        function(AddCategoryTemplate, $, _, Backbone, Category){
        var AddCategoryView = Backbone.View.extend({

        initialize: function(parentView){
            var that = this;
            that.render(parentView);            
        },
      
        render:function (parentView) {
           var template = _.template(AddCategoryTemplate);                   
            $('#modal').html(template);
            $('#modal').modal();
                    
            $('[data-toggle="tooltip"]').tooltip()
            $("#category_add_cancel").click(function() {
            $('#modal').modal('hide');
                return false;
             });
                                        
            $("#category_add_save").click(function() {
                var categoryNew = new Category({
                    id : null,
                    name: null,
                    confirmed: null
                }); //end categoryAddModel
                        
                var ok_save = true;
                 
                if ($('#category-name').val().length >= 3) {
                    categoryNew.set('name', _.escape($('#category-name').val()));
                }
                else {
                    ok_save = false;
                }

                if ($('#category-confirmed').val().length >= 1) {
                    categoryNew.set('confirmed', _.escape($('#category-confirmed').val()));
                }
                else {
                    ok_save = false;
                }
                        
                if (!ok_save){
                    $('#category-add-hint').text("Some error occured").addClass('issue-edit-hint-error');
                }
                else {                           
                    categoryNew.save({patch: true}, {
                    success: function(model, response){
                        $('#modal').modal('hide');
                        parentView.editcategories();
                        console.log("category saved");
                        },                        
                        error: function (model, response) {
                            $('#category-add-hint').text(response.responseText).addClass('issue-edit-hint-error');
                            console.log("error response text: " + response.responseText);
                        }
                    });
                }
                        
                    
              
            }); //end fetch category
        },
    


    });
    return AddCategoryView;
});
