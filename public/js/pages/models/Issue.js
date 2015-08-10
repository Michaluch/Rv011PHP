define([
    'jquery',
    'underscore',
    'backbone'
    ], function  ($,_,Backbone) {
        var Model = Backbone.Model.extend({
        defaults: {
           
            name         : "Hi I am model",
            category_id  : 1,
            description  : "Hi description",
            map_pointer  : {'lat': 0, 
                            'lng': 0},
            severity     : 1,
            // add this fields for IssueTable implementation
            id           :1,
            category     :"",
            date         :"",
            status       :""
        },
        url: function(){
            if(this.isNew()){
                return "/issues";
            }
            else{
                return "/issues/"+this.id;
            }
        },
        idAttribute: "id",
        initialize: function(){
            
        },

        });
        return Model;
    });
