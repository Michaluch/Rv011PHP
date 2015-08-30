define([
        "text!pages/templates/EditCategoryTemplate.html",
        "jquery",
        "underscore",
        "backbone",
        "Category",
        "ManagerView"
        ],
        function(EditCategoryTemplate, $, _, Backbone, Category, ManagerView){
        var EditCategoryView=Backbone.View.extend({
        statuses:{},
        categories: {},
        
       
        
        initialize: function(categoryId){
            var that = this;
            this.id = categoryId;
            that.render();            
        },
    
        render:function () {
            var categoryOld = new Category({id: this.id});
            var that = this;
            categoryOld.fetch({
                success: function(){
                    console.log(categoryOld.attributes);
                    var template = _.template(EditCategoryTemplate);
                    template = template({
                        category: categoryOld.attributes
                    });

                    $('#modal').html(template);
                    $('#modal').modal();
                    
                   
                    
                    $('[data-toggle="tooltip"]').tooltip()
                    
                    $("#category_edit_cancel").click(function() {
                        $('#modal').modal('hide');
                        return false;
                    });
                                        
                    $("#category_edit_save").click(function() {
                        var categoryNew = new Category({
                            id : that.id,
                            name: null,
                            confirmed: null
                        }); //end issueEditedModel
                        
                        var ok_save = true;
                        var we_have_changes = false;
                        
                        if (_.escape($('#category-name').val()) !== categoryOld.get('name')){
                            if ($('#category-name').val().length >= 3) {
                                categoryNew.set('name', _.escape($('#category-name').val()));
                                we_have_changes = true;
                            }
                            else {
                                ok_save = false;
                            }
                        };
                        
                        if (_.escape($('#category-confirmed').val()) !== categoryOld.get('confirmed')){
                            if ($('#category-confirmed').val().length >= 1) {
                                categoryNew.set('confirmed', _.escape($('#categoryNew').val()));
                                we_have_changes = true;
                            }
                            else {
                                ok_save = false;
                            }
                        };
                        
                       
                        
                        if (!ok_save){
                          //  that.hint.displayErrorHint();
                        }
                        else if (!we_have_changes) {
                       //     that.hint.displayErrorHintMessage("Nothing to save.")
                        }
                        else {
                            console.log("we have changes");
                            categoryNew.save({patch: true}, {
                                success: function(model, response){
                                    $('#modal').modal('hide');
                                    var managerView = new ManagerView();
                                    managerView.editcategories();
                                    console.log("category saved");
                                },
                            });
                        }
                        
                        
                        //$.colorbox.close();
                        return false;
                    });
                    
                    //that.render();
                }, //end issueEditModel.fetch success:
            }); //end issueEditModel.fetch
        },
    


    });
    return EditCategoryView;
});
