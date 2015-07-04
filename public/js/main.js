requirejs.config({
    baseUrl: "js",
    waitSeconds: 200,
    paths: {
        //libs
        jquery          : 'libs/jquery/jquery-1.11.3.min',
        underscore      : 'libs/underscore/underscore',
        bootstrap       : 'libs/bootstrap/bootstrap.min',
        async           : 'libs/async/async',
        markerClusterer : 'libs/gmaps/markerclusterer',
        backbone        : 'libs/backbone/backbone',
        fonts           : '../css/font-awesome/css/font-awesone.min', 
        // Libs for hash
        hash            : 'libs/encrypt/sha512',
        //'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha512',

        //models
        User            : 'pages/models/User',
        UserView        : 'pages/views/UserView',
        AppRouter       : 'pages/routes/Routes'
    },
});
    
require(["application"],
    function(application) {
       application.start();
    }
);
    
