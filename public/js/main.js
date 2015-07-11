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
        //I've added other our scripts, but I am not sure
        //main            : 'apps/main.js',
        application     : 'application',
        valid           : 'apps/addValid',
        validation      : 'apps/validation',
        signinform      : 'apps/signform',
        //models
        User            : 'pages/models/User',
        Users           : 'pages/collections/Users', 
        UserView        : 'pages/views/UserView',
        SignUpView      : 'pages/views/SignUpView',
        AppRouter       : 'pages/routes/Routes'
    },
});
    
require(["application"],
    function(application) {
       application.start();
    }
);
    
