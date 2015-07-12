define([
	//libs
    'jquery',
    'bootstrap',
	'backbone',
    //deps
	'SignUpView',
    "pages/views/LoginView",
    'Users',
    'UserView',
    'HeaderView',
    "SessionModel"

    ],

    function($,boot,Backbone, SignInView, LoginView, Users, UserView, HeaderView, SessionModel) {
        return Backbone.Router.extend({

            routes: {
                "": "index",
                "register": "register",
                "login":"login"
            },


            index: function() {
                if(!this.HeaderView){
                    this.HeaderView=new HeaderView({});
                    this.HeaderView.setElement($("header")).render();
                }
            },

            register: function() {
            	console.log('Реєстрація');
            	if(typeof userView === "undefined"){
                    signInView = new SignInView({collection :new Users});
                    };
                signInView.render();
            },

            login: function(){
                if(session.get("logged_in")===false){
                console.log('Login');
                if(typeof loginView==="undefined"){
                    loginView=new LoginView();
                };
                loginView.render();
                }
                else{
                window.location.href="/public/index3.html";
                }
            }
        });
    });