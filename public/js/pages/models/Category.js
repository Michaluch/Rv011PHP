define([
    "jquery",
    "underscore",
    'backbone'
    ], function  ($, _, Backbone) {
        var Model = Backbone.Model.extend({
        defaults: {
            id           : 0,
            name         : "",
            confirmed    : 0
        },
        url: function(){
            if(this.isNew()){
                return "/categories";
            }
            else{
                return "/categories/"+this.id;
            }
        },
        });
        return Model;
    });
