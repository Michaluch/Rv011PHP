if (typeof DEBUG==="undefined") DEBUG=true;
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
        Map             : 'map',
        Sidebar         : 'sidebar',
        application     : 'application',
        valid           : 'apps/addValid',
        validation      : 'apps/validation',
        signinform      : 'apps/signform',
        signUpValidation: 'apps/signUpValidation',
        //models
        User            : 'pages/models/User',
        Users           : 'pages/collections/Users', 
        UserView        : 'pages/views/UserView',
        SignUpView      : 'pages/views/SignUpView',
        AppRouter       : 'pages/routes/Routes',
        SessionModel    : 'pages/models/SessionModel',
        HeaderView      : 'pages/views/HeaderView',
        CryOutView      : 'pages/views/CryOutView',
        Issue           : 'pages/models/Issue',
        Issues          : 'pages/collections/Issues',
        ProfileView     : 'pages/views/ProfileView',
        ManagerView     : 'pages/views/ManagerView',
    },
});
    
require(["application"],
    function(application) {
       application.start();
    }
);
    
