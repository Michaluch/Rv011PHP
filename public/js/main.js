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
        jQueryUI        : 'libs/jquery-ui-autocomplete/jquery-ui.min',
        fonts           : '../css/font-awesome/css/font-awesone.min', 
        hash            : 'libs/encrypt/sha512',
        images          : '',
        colorbox        : 'libs/colorbox/jquery.colorbox-min', 
        d3              : 'libs/d3/d3.min',
        //I've added other our scripts, but I am not sure
        Map             : 'map',
        Sidebar         : 'sidebar',
        application     : 'application',
        valid           : 'apps/addValid',
        validation      : 'apps/validation',
        signinform      : 'apps/signform',
        signUpValidation: 'apps/signUpValidation',
        //d3Script        : 'apps/d3Script',
        //models
        User            : 'pages/models/User',
        Issue           : 'pages/models/Issue',
        IssueStatus     : 'pages/models/IssueStatus',
        SessionModel    : 'pages/models/SessionModel',
        Category        : 'pages/models/Category',
        Users           : 'pages/collections/Users', 
        Issues          : 'pages/collections/Issues',
        IssueStatuses   : 'pages/collections/IssueStatuses',   
        Categories      : 'pages/collections/Categories',             
        AppRouter       : 'pages/routes/Routes',
        Attachment      : 'pages/models/Attachment',
        Attachments     : 'pages/collections/Attachments',
        //Views
        UserView        : 'pages/views/UserView',
        SignUpView      : 'pages/views/SignUpView',        
        HeaderView      : 'pages/views/HeaderView',
        CryOutView      : 'pages/views/CryOutView',
        ProfileView     : 'pages/views/ProfileView',
        ManagerView     : 'pages/views/ManagerView',
        TableIssueView  : 'pages/views/TableIssueView',
        RowIssueView    : 'pages/views/RowIssueView',
        IssueView       : 'pages/views/IssueView',
        IssuesView      : 'pages/views/IssuesView',
        EditIssueView   : 'pages/views/EditIssueView',
        IssueEditView   : 'pages/views/IssueEditView',
        AttachmentsEditView: 'pages/views/AttachmentsEditView',
        EditCategoriesView: 'pages/views/EditCategoriesView',
        StatisticView   : 'pages/views/StatisticView',
        RowCategoryView : 'pages/views/RowCategoryView',
        

    },
});
    
require(["application"],
    function(application) {
       application.start();
    }
);
    
