define([
    "jquery",
    "underscore",
    'backbone'
    ], function  ($, _, Backbone) {
        var Model = Backbone.Model.extend({
        defaults: {
            name         : ""
        },
        url: "statuses",
        initialize: function(){
            
        },

        });
        return Model;
    });
