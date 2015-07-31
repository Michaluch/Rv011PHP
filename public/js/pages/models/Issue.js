define([
    "jquery",
    "underscore",
    'backbone'
    ], function  ($, _, Backbone) {
        var Model = Backbone.Model.extend({
        defaults: {
            name         : "",
            category_id  : 1,
            description  : "",
            //map_pointer  : {'lat': 0, 
            //                'lng': 0},
            map_pointer: "",
            severity     : 1
        },
        //url:"/issue",
        initialize: function(){
            
        },

        });
    return Model;
    });
