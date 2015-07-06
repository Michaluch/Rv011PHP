define([
	//libs
    'jquery',
    'bootstrap',
	'backbone',
    //deps
	'SignUpView',
    "pages/views/LoginView",
    'Users'

    ],

        function($,boot,Backbone, SignInView, LoginView,Users) {
        return Backbone.Router.extend({

            routes: {
                "": "index",
                "register": "register",
                "login":"login"
            },


            index: function() {

            },

            register: function() {
        	console.log('Реєстрація');
        	if(typeof userView === "undefined"){
                    signInView = new SignInView({collection :new Users});
                    };
                signInView.render();
            },

            login: function(){
                console.log('Login');
                if(typeof loginView==="undefined"){
                loginView=new LoginView();
                };
                loginView.render(); 
            }
        });
    });