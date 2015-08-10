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
                "click #solvedissues-link" : "solvedissues",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #search-btn": "onSearchClick"
                
            },
            initialize:function(){
               this.render();

            },
            allissues: function  () {
                var path = "/issues/all";
                this.universalshow(path);
            },
            newissues: function  () {
                var path = "/issues/new";
                this.universalshow(path);
            },

            solvedissues: function  () {
                var path="/issues/solved";
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
                    this.$('#manager-panel').append(this.tableIssue.render().el);
                
                }
            return this;
            },
            onLogoutClick:function(e){
                e.preventDefault(e);
                $.post("/auth/logout", {},function(data){
                    if(data.status=="error"){
                        alert("Something wrong");
                    }
                    else{
                        window.location.href="/";
                    };
                });
            },

            onLeftsidebarbtnClick:function(){
                var $sidebar = $("#left-sidebar");
                var $panel = $("#manager-panel");

                if($sidebar.is(":visible")){
                    $sidebar.addClass("sidebar-mobile");
                    $panel.addClass("col-sm-12 col-xs-12").removeClass("col-sm-9 col-xs-6");
                }
                else{
                    $sidebar.addClass("col-sm-3 col-xs-6").removeClass("sidebar-mobile");
                    $panel.removeClass("col-sm-12 col-xs-12").addClass("col-sm-9 col-xs-6");
                }
            },

            onSearchClick:function(e){
                e.preventDefault();
                var search=$("input[name=search]").val();
                var self=this;
                if(search.length<3){
                    $('#search-form').append("<p>Please, add more than 2 letters</p>");
                }
                else
                {
                $.post("/issues/search", {search:search}, function(data){
                    //var issues=showIssues(data.response);
                    if(data.length>0){
                    var issuesFound=new Issues(data);

                    var template = self.template({
                            issues: issuesFound.models,
                            logged_in: session.get("logged_in"),
                            user: session.user.toJSON(),
                            search: search
                            //category: issues.category
                        });
                    self.$el.html(template); 

                    //console.log(data);
                    }
                    else{
                      $('#search-form').append("<p>Nothing found</p>");  
                    }
                });
                }
            },
            });
        return ManagerView;
    }
);