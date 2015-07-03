define([
        //dep 
        "AppRouter"
    ],

    function(AppRouter) {
        var _public={};
        _public.start =  function  () {
            router = new AppRouter();
            Backbone.history.start();
            alert(router.toJSON);
        }
       
        return _public; 
        
    }
);