define([
    "underscore",
    "User",
    'UserView'
    ], function(_, User, UserView){
        var SessionModel=Backbone.Model.extend({
            defaults:{
                logged_in: false
            },
            initialize:function(){
                //_.bindAll(this);
                this.user = new User({});
            },

            url: function(){
                return '/auth/logged';
        },

        updateSessionUser: function( userData ){
            this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },

        checkAuth: function(callback, args) {
            var self = this;

            this.fetch({ 
                type: 'POST',
                success: function(mod, res){
                    console.log(res);
                    if(!res.error && res.user){
                        self.updateSessionUser(res.user);
                        self.set({ logged_in : true });

                        if('success' in callback) callback.success(mod, res);    
                    } else {
                        self.set({ logged_in : false });
                        if('error' in callback) callback.error(mod, res);   
                    }
                }, error:function(mod, res){
                    self.set({ logged_in : false });
                    if('error' in callback) callback.error(mod, res);    
                }
            }).complete( function(){
                if('complete' in callback) {
                    console.log(self.get('logged_in'));
                    callback.complete();
                 }

            });

            //callback.complete();
        },
        });
        return SessionModel;
    })