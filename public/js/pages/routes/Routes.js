define([
	//libs
    'jquery',
    'bootstrap',
	'backbone',
    //deps
	'SignInView',
    "pages/views/LoginView",
    'Users'

    ],

        function($,boot,Backbone, SignInView, LoginView,Users) {
        return Backbone.Router.extend({

            routes: {
                "": "index",
                "register": "register"
               
            },


            index: function() {
            if(typeof loginView==="undefined"){
                loginView=new LoginView();
                };
                loginView.render(); 
            },

            register: function() {
        	console.log('Реєстрація');
        	if(typeof userView === "undefined"){
                    signInView = new SignInView({collection :new Users});
                    };
                signInView.render();
            },
        });
    });