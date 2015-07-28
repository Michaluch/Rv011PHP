define([
	//libs
    'jquery',
    'bootstrap',
    'backbone',
    'Sidebar',
    //deps
    'SignUpView',
    "pages/views/LoginView",
    'User', 
    'UserView',
    'HeaderView',
    "ManagerView",
    "SessionModel",
    "CryOutView",
    "ProfileView",
    ],
    function($, boot, Backbone, Sidebar, SignInView, LoginView, User, UserView,
     HeaderView, ManagerView, SessionModel, CryOutView, ProfileView) {
        return Backbone.Router.extend({
            map: null,
            sidebar: Sidebar,
            routes: {
                "": "index",
                "register": "register",
                "login":"login",
                "issue": "issue",
                "profile":"profile",
                "manager":"manager"
            },
            loadHeader: function(){
                var issues = null;
                if(!this.HeaderView){
                    this.HeaderView=new HeaderView({});
                    this.HeaderView.setElement($("header")).render();
                }
            },
            index: function(){
                this.loadHeader();
            },

            register: function() {
                this.loadHeader();
                console.log('Реєстрація');
                if(typeof userView === "undefined"){
                  signInView = new SignInView({model :new User});
                };
                signInView.sidebar = this.sidebar;
                signInView.render();
            },
            
            issue: function(){
                var oCryOutView = null;
                this.loadHeader();
                console.log('New issue');
                if(typeof CryOutView !== "undefined"){
                    if (CryOutView instanceof Backbone.View){
                        oCryOutView = CryOutView;
                    } else {
                        oCryOutView = new CryOutView();
                    }
                    
                    if (this.map !== null){
                        oCryOutView.map = this.map;
                    }
                    oCryOutView.sidebar = this.sidebar;
                    oCryOutView.render();                    
                }
            },
            
            login: function(){
                this.loadHeader();
                if(session.get("logged_in")===false){
                    if(typeof loginView==="undefined"){
                        loginView=new LoginView();
                    };
                    loginView.sidebar = this.sidebar;
                    loginView.render();
                }
                else{
                    window.location.href="/";
                }
            },
            
            profile: function(){
                if(session.get("logged_in") === true){
                    console.log('profile');
                    if(typeof profileView === "undefined"){
                        profileView = new ProfileView();
                    };
                    profileView.render();
                }
            },
            manager: function(){
                if(session.get("logged_in")===true){
                this.loadHeader();
                if(typeof this.ManagerView==="undefined"){
                    this.ManagerView=new ManagerView();
                };
                this.ManagerView.render();
                }
                else{
                   window.location.href="/"; 
                }
                
            },
        });
    });
