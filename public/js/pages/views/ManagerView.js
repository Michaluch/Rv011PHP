define([
    "text!pages/templates/ManagerTemplate.html",
    "jquery",
    "underscore",
    "backbone",
    "IssuesView",
    "Issues",
    "Issue"
    ],
    function(ManagerTemplate, $, _, Backbone, IssuesView, Issues, Issue){
        var ManagerView=Backbone.View.extend({
            template:_.template(ManagerTemplate),
            model: Issues,
            el:$("#main-container"),
            events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #search-btn": "onSearchClick",
                "change .status-selector": "statusChanged"
            },
            statuses:{},
            categories: {},
            issue: {},
            initialize:function(){
                //issues=new Issues();
                //console.log(issues);
            },
            render:function(){
                  //console.log(this.model);
                var issues=new Issues();
                var self=this;
                self.$el.empty();
                issues.fetch({
                    success: function(issues) {
                        $.get("statusesandcategories", {}, function(data){
                        self.statuses=data.statuses;
                        self.categories=data.categories;                        
                        var template = self.template({
                            issues: issues.models,
                            logged_in: session.get("logged_in"),
                            user: session.user.toJSON(),
                            search: '',
                            //category: issues.category
                            statuses: self.statuses,
                            categories: self.categories,
                        });
                        console.log(issues);
                        console.log(self.statuses);
                        self.$el.html(template);                        
                        });
                      //console.log(issues);

                    }
                });
                   
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

            statusChanged: function(e){

                var status_id=e.target.value;
                var issue_id=$(e.target).closest('tr').attr('data-id');
                var issue = new Issue({id: issue_id});

                issue.fetch();

                issue.save({"status": status_id},
                    {
                        success:function(model,response){console.log(response.message);},
                        error:function(model,response){console.log(response.message);}
                    }

                );
            }

            });
        return ManagerView;

    }
);