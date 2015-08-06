define([
    'jquery',
    'underscore',
    'backbone',
    'Issue'
], function  ($,_,Backbone, Issue) {
    var Collection = Backbone.Collection.extend({
        model: Issue,
        url: '/issue',
        //initialize:function(){this.reset()},
        parse: function (response) {
            return response.data;
        }
    });
    return Collection;
});