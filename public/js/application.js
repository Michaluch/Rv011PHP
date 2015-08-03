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
                    markers.push(item.attributes);
                });
                // Initialize map
                Map.init('map-canvas', {
                    zoom: 12,
                    minZoom: 8,
                    streetViewControl: false,
                    scaleControl: false,
                    rotateControl: false,
                    panControl: false,
                    overviewMapControl: false,
                    mapTypeControl: false,
                    center: new google.maps.LatLng(50.624, 26.260)
                });
                Map.setMarkers(markers);
                Map.setMarkersClickEvent(function(marker){
                    location.hash = 'issue/' + marker.id;
                });
                //window.mapa = Map;
            }});
            router.map = Map;
        }
       
    return _public; 
            
    }
);