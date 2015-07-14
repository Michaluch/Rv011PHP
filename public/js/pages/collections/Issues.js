define([
    'backbone',
    'Issue'
], function  (Backbone, Issue) {
    var Collection = Backbone.Collection.extend({
        model: Issue,
        url: '/issue',
        parse: function (response) {
            return response.data;
        }
    });
    return Collection;
});