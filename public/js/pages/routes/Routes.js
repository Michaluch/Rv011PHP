define([
	//libs
	'backbone',
	'SignInView'


    ],

<<<<<<< HEAD
    function(Backbone) {
        return Backbone.Router.extend({ 
=======
    function(Backbone, SignInView) {
        return Backbone.Router.extend({
>>>>>>> 9a58b583d2140075dd136979501304b370c1b804


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