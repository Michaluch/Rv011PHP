define([
        //libs
        'jquery',
        'bootstrap', 
        //dep 
        'AppRouter',
       
    ],

    function($,boot,AppRouter) {
        var _public={};
        _public.start =  function  () {
            router = new AppRouter();
            Backbone.history.start();
        }
       
    return _public; 
            
    }
);