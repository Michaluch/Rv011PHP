define([
        //libs
        'jquery',
        'bootstrap', 
        //dep 
        'AppRouter',
        'SessionModel',
       
    ],

    function($,boot, AppRouter, SessionModel) {
        var _public={};
        _public.start =  function  () {
            session = new SessionModel();
            router = new AppRouter();

            session.checkAuth({
                // Start the backbone routing once we have captured a user's auth status
                complete: function(){
                    Backbone.history.start();
                }
            });
        }
       
    return _public; 
            
    }
);