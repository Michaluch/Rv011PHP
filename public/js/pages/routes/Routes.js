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
    "IssuesView",
    "Issues",
    "EditIssueView",
    "StatisticView",
    'AdminView'
    ],
    function($, boot, Backbone, Sidebar, SignInView, LoginView, User, UserView,
     HeaderView, ManagerView, SessionModel, CryOutView, ProfileView, IssuesView,
    Issues, EditIssueView, StatisticView, AdminView) {
        return Backbone.Router.extend({
            map: null,
            sidebar: Sidebar,
            routes: {
                "": "index",
                "home": "index",
                "register": "register",
                "login":"login",
                "issue(/:id)": "issue",
                "profile":"profile",
                "manager":"manager",
                "issues": "issues",
                "issue/:id/edit": "editissue",
                "categories": "categories",
                "statistic" : "statistic"
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
            
            issue: function(id){
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
                    if (typeof id !== 'undefined' && id !== null){
                        oCryOutView.render(id);    
                    } else {
                    oCryOutView.render();                    
                }
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
                if(session.get("logged_in") === true)
                {
                    this.loadHeader();
                    var role = parseInt(session.get("user").role_id);
                    
                    switch  (role) {
                        case 1:
                            if(typeof this.profileView === "undefined"){
                                this.profileView = new ProfileView();}
                             else{
                                window.location.href="/"; 
                            }
                            break;
                        case 2:
                            if(typeof this.ManagerView==="undefined"){
                                this.ManagerView=new ManagerView();
                            }
                            else{
                                window.location.href="/"; 
                            }
                            break;
                        case 3:
                            if(typeof this.AdminView==="undefined"){
                                this.AdminView=new AdminView();
                            }
                            else{
                                window.location.href="/"; 
                            }
                            break;                            
                        default:
                            window.location.href="/"; 
                            break;

                    }
                }
            },
          //  manager: function(){
          //      if(session.get("logged_in")===true&&session.get("user").role_id==1){
          //      this.loadHeader();
          //      if(typeof this.ManagerView==="undefined"){
          //          this.ManagerView=new ManagerView();
          //      };
          //      //this.ManagerView.render();
          //      }
          //      else{
          //         window.location.href="/"; 
          //      }
          //  },

            
            issues: function(){
                this.loadHeader(); 
                var view = new IssuesView();              
                view.render();
                console.log('render view');
            },
            editissue:function(){
                console.log("Edit 1 Issue");
                var view = new EditIssueView(); 
                view.render();
            },
            statistic : function(){
                this.loadHeader();
                console.log("Statistic");
                var Statview = new StatisticView(); 
                //Statview.render();
            }
        });
    });
