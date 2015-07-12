define([
	//libs
    'jquery',
    'bootstrap',
	'backbone',
    //deps
	'SignUpView',
    "pages/views/LoginView",
    'Users',
    'UserView'

    ],

    function($,boot,Backbone, SignInView, LoginView, Users, UserView) {
        return Backbone.Router.extend({

            routes: {
                "": "index",
                "register": "register",
                "login":"login"
            },


            index: function() {
                console.log('Logout');
                if(typeof userView==="undefined"){
                    userView=new UserView();
                };
                userView.render(); 
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