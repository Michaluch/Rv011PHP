define([
        //dep 
        "AppRouter",
        "hash"
    ],

    function(AppRouter,h) {
        var _public={};
        _public.start =  function  () {
            router = new AppRouter();
            Backbone.history.start();
            var str= "Hello world";
            var hash = CryptoJS.SHA512("str");
            alert(hash);
        }
       
    return _public; 
            
    }
);