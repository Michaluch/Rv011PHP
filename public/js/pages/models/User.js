define([
//libs
//
    "underscore",
    'backbone',
    'hash'
    ], function  (_, Backbone, HASH) {
        var User = Backbone.Model.extend({
        defaults: {
            id          :0,	
            email       :"",
            password    :"",
            facebook_id :"",
            google_id   :"",
            role_id     :0,
            status_id   :0,
            avatar_url  :"",
            language_id :0
        },

        initialize: function(){
         //   _.bindAll(this);
        },

        url:"/user",


        });
    return User;
    }
)
