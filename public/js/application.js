define([
        //libs
        'jquery',
        'bootstrap', 
        //dep 
        'AppRouter',
        'hash'
    ],

    function($,boot,AppRouter,h) {
        var _public={};
        _public.start =  function  () {
            router = new AppRouter();
            Backbone.history.start();
        }
       
    return _public; 
            
    }
);