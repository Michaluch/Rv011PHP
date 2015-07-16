define(
    [
        'markerClusterer',
        'jquery',
        'async!http://maps.google.com/maps/api/js?v=3&sensor=false'
    ],
    function(markerClusterer, $){
        var oMap = null;
        function GMap(){
            var map,
                marker = false,
                can_set_marker = false,
                map_markers = new Array(),
                custom_callbacks = {},
                geocoder = new google.maps.Geocoder(),
                markerClusterer;
            
            /**
             * Function init() - Initializes gmap.
             * 
             * @param {object} options - map options.
             * @param {string} container_id - element ID, which must contain a map.
             *
             * @returns {object} - object contains marker lat and lng.
             */
            this.init = function(container_id, options){
                map = new google.maps.Map(document.getElementById(container_id), options);
                markerClusterer = new MarkerClusterer(map, [], {gridSize: 30, maxZoom: 20});
                google.maps.event.addListener(map, 'click', function(e) {
                    if (can_set_marker){
                        if (marker){
                            marker.setMap(null);
                        }
                        marker = new google.maps.Marker({
                            position: e.latLng,
                            map: map,
                            animation: google.maps.Animation.BOUNCE,
                            title: 'New Problem'
                        });
                        if (typeof custom_callbacks.onMarkerSet !== 'undefined'){
                            custom_callbacks.onMarkerSet(marker);
                        }
                    }
                });         
            }
            
            /**
             * Function setMarkerOnClick() - allows or disallows the user to set a marker on the map.
             *
             * @param {boolean} option
             * @param {boolean} remove_marker - (optional)removes marker from map if it was set before.
             *
             */
            this.setMarkerOnClick = function(option, remove_marker){
                if (typeof option === 'boolean'){
                    can_set_marker = option;
                    if (typeof remove_marker === 'boolean' && remove_marker === true){
                        marker.setMap(null);
                    }
                } else {
                    console.log('You can use only "boolean" arguments!');
                } 
            } 
            
            this.setMakerCallback = function(callback){
                if (typeof callback === 'function'){
                    custom_callbacks.onMarkerSet = callback;
                } else {
                    console.log('Callback is not a function!');
                }
            };
            /**
             * Function getMarkerPossition() - gets marker position
             *
             * @returns {object} - object contains marker lat and lng.
             */
            this.getMarkerPossition = function(){
                var coor;
                if(marker){
                    // If you need to get current marker location you need to call marker.getPosition() method;
                    coor =  marker.getPosition();
                    return {'lat': coor.lat(),
                            'lng': coor.lng()};
                } else {
                    console.log('You need to set a marker on the map first!');
                }
            }
            
            /**
             * Function getPossitionAddress() - Gets the address of the current marker and sets it as a callback function parameter.
             *
             * @see https://developers.google.com/maps/documentation/javascript/geocoding
             * @param {function} callback - callback function takes the marker address as a parameter
             */
            this.getPossitionAddress = function(callback){
                if (typeof callback === 'function' && marker){
                    geocoder.geocode({
                        latLng: marker.getPosition()
                    }, function(responses) {
                          callback(responses);
                    })
                } else {
                    console.log('Marker is not set or callback is not a function');
                }
            }
            
            /**
             * Function setMarkers() - Sets some markers on the map and adds to the markerClusterer.
             *
             * @param {array} markers - array with map coordinates objects.
             * Map coordinates object constains of two parameters: marker 
             * latitude and marker longtitude. 
             */
            this.setMarkers = function(markers){
                $.each(markers, function(k, e){
                    var marker = new google.maps.Marker({
                            position: e.location,
                            map: map,
                            title: e.title,
                            id: e.id
                        });
                    map_markers.push(marker);
                });
                //Add marker to the MarkerClusterer;
                markerClusterer.addMarkers(map_markers);
            }
            
            /**
             * Function setMarkersClickEvent() - Sets click event to each marker.
             *
             * @param {function} callback function.
             */
            this.setMarkersClickEvent = function(callback){
                if (typeof callback === 'function' && map_markers.length){
                    $.each(map_markers, function(k, e){
                        google.maps.event.addListener(e, 'click', function(e) {
                            callback(this);
                        });
                    });
                }
            }
            
            /**
             * Function disableMarkers() - disables some maps markers.
             *
             * @param {array} markers - array with map coordinates objects.
             * Map coordinates object constains of two parameters: marker 
             * latitude and marker longtitude. 
             */    
            this.disableMarkers = function (markers){
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
        }
    
        oMap = new GMap();
        //google.maps.event.addDomListener(window, 'load', function(){oMap.init()});
        return oMap;
    }
);