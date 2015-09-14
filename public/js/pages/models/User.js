
define([
//libs
//
    'backbone',
    'hash'
    ], function  (Backbone, HASH) {
        var Model = Backbone.Model.extend({
        defaults: {
            email       :"test@test.com",
            role_id     :null,
            status_id   :null,
            avatar_url  :"",
            language_id :null
        },
        urlRoot: "auth/register",
        initialize: function(){
            
        },

        });
    return Model;
    }
)
