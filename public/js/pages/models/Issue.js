
define([
    'backbone'
    ], function  (Backbone) {
        var Model = Backbone.Model.extend({
        defaults: {
            id           : 0,	
            name         : "",
            category_id  : 1,
            description  : "",
            map_pointer  : {'lat': 0, 
                            'lng': 0},
            severity     : 1
        },
        url:"/issue",
        initialize: function(){
            
        },

        });
    return Model;
    });
