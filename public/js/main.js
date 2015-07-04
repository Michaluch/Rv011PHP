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
        text            : 'libs/requirejs/text',
        fonts           : '../css/font-awesome/css/font-awesone.min', 
        hash            : 'libs/encrypt/sha512',
        images          : '',


        //models
        User            : 'pages/models/User',
        Users           : 'pages/collections/Users', 
        UserView        : 'pages/views/UserView',
        SignInView      : 'pages/views/SignInView',
        AppRouter       : 'pages/routes/Routes'
    },
});
    
require(["application"],
    function(application) {
       application.start();
    }
);
    
