
define([
//libs
//
    'backbone',
    'hash'
    ], function  (Backbone, HASH) {
        var Model = Backbone.Model.extend({
        defaults: {
            id          :null,	
            email       :"test@test.com",
            password    :"",
            facebook_id :null,
            google_id   :null,
            role_id     :null,
            status_id   :null,
            avatar_url  :"",
            language_id :null
        },
        urlRoot:"/auth/register",
        initialize: function(){
            
        },

        });
    return Model;
    }
)
