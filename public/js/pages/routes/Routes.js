define([
	//libs
    'jquery',
    'bootstrap',
	'backbone',
    //deps
	'SignInView',
    'Users',
    


    ],

    function($,boot,Backbone, SignInView,Users) {
        return Backbone.Router.extend({



            routes: {
                "": "index",
                "register": "register",
               
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
        });
    });