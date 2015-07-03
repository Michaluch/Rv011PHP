define([
	//libs
	'backbone',
	'SignInView'


    ],

    function(Backbone, SignInView) {
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
                    signInView = new SignInView();
                    };
                signInView.render();
            },
        });
    });