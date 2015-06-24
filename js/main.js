(function($){
    function initialize() {
        var map,
            marker = false,
            // Only if user want to add new issue  ""
            form_active = true, /*form is active*/
            map_markers = new Array(),
            markerClusterer,
            mapOptions = {
                zoom: 12,
                minZoom: 8,
                streetViewControl: false,
                scaleControl: false,
                rotateControl: false,
                panControl: false,
                overviewMapControl: false,
                mapTypeControl: false,
                center: new google.maps.LatLng(50.624, 26.260)
            };
        
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        markerClusterer = new MarkerClusterer(map, [], {gridSize: 30, maxZoom: 20});
        google.maps.event.addListener(map, 'click', function(e) {
            if (marker){
                marker.setMap(null);
            }
            if (form_active){
                marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                    animation: google.maps.Animation.BOUNCE,
                    title: 'New Problem'
                });
                console.log(getMarkerPossition());
            }
        });
        
        /**
         * Function getMarkerPossition() - gets marker position
         *
         * @returns {object} - object contains marker lat and lng.
         */
        function getMarkerPossition(){
            var coor;
            if(marker){
                // If you need to get current marker location you need to call marker.getPosition() method;
                coor =  marker.getPosition();
                return {'lat': coor.lat(),
                        'lng': coor.lng()};
            } else {
                alert('You need to set a marker on the map first!');
            }
        }
        
        /**
         * Function setMarkers() - Sets some markers on the map and adds to the markerClusterer.
         *
         * @param {array} markers - array with map coordinates objects.
         * Map coordinates object constains of two parameters: marker 
         * latitude and marker longtitude. 
         */
        function setMarkers(markers){
            $.each(markers, function(k, e){
                map_markers.push(new google.maps.Marker({
                        position: e,
                        map: map,
                        title: 'New Problem'
                    })
                );
            });
            //Add marker to the MarkerClusterer;
            markerClusterer.addMarkers(map_markers);
        }
        
        /**
         * Function disableMarkers() - disables some maps markers.
         *
         * @param {array} markers - array with map coordinates objects.
         * Map coordinates object constains of two parameters: marker 
         * latitude and marker longtitude. 
         */    
        function disableMarkers(markers){
            var filtered_markers = new Array();
            if (typeof markers !== 'undefined'){
                $.each(markers, function(k, e){
                    $.each(map_markers, function(i, marker){
                        if (e.lat === marker.position.A && e.lng === marker.position.F){
                            marker.setMap(null);
                            //Remove marker from MarkerClusterer;
                            markerClusterer.removeMarker(marker);
                        } else {
                            filtered_markers.push(marker);
                        }
                    });
                });
                map_markers = filtered_markers;
            }
        }

        
        // This array we will get from backend
        markers = [{lat: 50.6764460817145, lng: 26.215438842773438},
           {lat: 50.61331032168081, lng: 26.256637573242188},
           {lat: 50.614290662525036, lng: 26.253376007080078}];
        
        
        //-------------------
        setMarkers(markers);
        setTimeout(function(){
            disableMarkers([{lat: 50.6764460817145, lng: 26.215438842773438}]);
        }, 5000);
        
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    $("#login-button").click(function() {
        if($("#login-container").css("display") == "none") {
            $("#login-container").css("display", "block").addClass("col-xs-3");
            $("#map-canvas").addClass("col-xs-9");
        } else {
             $("#login-container").css("display", "none").removeClass("col-xs-3");
            $("#map-canvas").removeClass("col-xs-9");
        }
    });
    $("#sign-up-button").click(function() {
            $("#login-container").css("display", "none").removeClass("col-xs-3");
            $("#sign-up-container").css("display", "block").addClass("col-xs-3");
    });
   // loginButtonClick = 
}(jQuery));
