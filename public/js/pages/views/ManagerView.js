define([
    "text!pages/templates/ManagerTemplate.html",
    "jquery",
    "underscore",
    "backbone",
    "TableIssueView" , 
    "RowIssueView" ,
    "Issues",
    "Issue"   
    ],
    function(ManagerTemplate, $, _, Backbone, TableIssueView,RowIssueView,Issues, Issue ){
        var ManagerView=Backbone.View.extend({
            template:_.template(ManagerTemplate),

            model: Issues,
            el:$("#main-container"),
            events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #allissues-link" : "allissues",
                "click #recentlyissues-link" : "newissues",
                "click #solvedissues-link" : "solvedissues"
                
            },
            initialize:function(){
               this.render();

            },
            allissues: function  () {
                var path = "/issue/all";
                this.universalshow(path);
            },
            newissues: function  () {
                var path = "/issue/new";
                this.universalshow(path);
            },

            solvedissues: function  () {
                var path="/issue/solved";
                this.universalshow(path);
            },
            /**
             * fetch data from db by path on succsess render 
             * path rout to server side
             * run render after fetch data
             */
            universalshow: function  (path) {
                var self=this;
                self.collectionIssue = new Issues(); //{model: new Issue}    
                var tableIssue = new TableIssueView({collection : self.collectionIssue });
                
                // use ajax, instead fetch
                $.get(path, function(data){
                   
                    self.collectionIssue.models = data;

                    self.tableIssue = tableIssue;

                    self.render();                  
                });
            },

            render:function(){    
                this.$el.empty();
                this.$el.html(this.template(
                    { 
                        logged_in: session.get("logged_in"),
                        user: session.user.toJSON() 
                    }
                    ));

                if(this.tableIssue!=null)
                {
                    this.$('#manager').append(this.tableIssue.render().el);
                
                }
            return this;
            },
            onLogoutClick:function(e){
            e.preventDefault(e);
            console.log("logout");
            $.post("/auth/logout", {},function(data){
            if(data.status=="error"){
                alert("Something wrong");
            }
            else{
                console.log(data);
                window.location.href="/";
            };
            });
            },

            

            });
        return ManagerView;

    }
);