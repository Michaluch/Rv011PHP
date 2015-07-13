define([
        //libs
        'underscore',
        'jquery',
        'bootstrap', 
        //dep 
        'AppRouter',
        'SessionModel',
        'Map',
        'Issues'
    ],

    function(_, $,boot, AppRouter, SessionModel, Map, Issues) {
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
            var issuesCollection = new Issues();
            issuesCollection.fetch({success: function(){
                var markers = [];
                _.each(issuesCollection.models, function(item){
                    markers.push(item.attributes.location);
                });
                console.log(markers);
                //Map.setMarkers(markers);
            }});
        }
       
    return _public; 
            
    }
);