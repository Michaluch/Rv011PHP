define([
    "jquery",
    "underscore",
    'backbone',
    'Issue'
], function  ($, _, Backbone, Issue) {
    var Issues = Backbone.Collection.extend({
        model: Issue,
        url: '/issues',
        parse: function (response) {
            return response;
        }
    });
    return Issues;
});