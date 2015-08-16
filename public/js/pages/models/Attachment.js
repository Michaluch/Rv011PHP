define([
    'jquery',
    'underscore',
    'backbone'
    ], function  ($,_,Backbone) {
        var Model = Backbone.Model.extend({
        defaults: {
            id: null,
            url: null,
            issue_id: null
        },
        
        url: function(){
            if(this.isNew()){
                return "/attachment";
            }
            else{
                return "/attachment/"+this.id;
            }
        },
        
        initialize: function(){
            
        },

        });
        return Model;
    });
