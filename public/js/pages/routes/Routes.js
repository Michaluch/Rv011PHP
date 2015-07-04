define([
	//libs
	'backbone',
	'SignInView',
    "pages/views/LoginView"

    ],

    function(Backbone, SignInView, LoginView) {
        return Backbone.Router.extend({


            routes: {
                "": "index",
                "register": "register",
               
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
                    signInView = new SignInView();
                    };
                signInView.render();
            },
        });
    });