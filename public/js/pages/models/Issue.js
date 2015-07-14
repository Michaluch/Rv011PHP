
define([
    'backbone'
    ], function  (Backbone) {
        var Model = Backbone.Model.extend({
        defaults: {
            id           : 0,	
            name         : "",
            category_id  : 0,
            description  : "",
            map_pointer  : {x: 0, y:0},
            severity     : 0
        },
        url:"/issue/add",
        initialize: function(){
            
        },

        });
    return Model;
    });
