define([
    "jquery",
    "underscore",
    'backbone',
    'Category'
], function  ($, _, Backbone, Category) {
    var Categories = Backbone.Collection.extend({
        model: Category,
        url: '/category',
        parse: function (response) {
            return response;
        }
    });
    return Categories;
});