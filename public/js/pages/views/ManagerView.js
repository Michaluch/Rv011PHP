define([
    "text!pages/templates/ManagerTemplate.html",
    "jquery",
    "underscore",
    "backbone",
    "TableIssueView" , 
    "RowIssueView" ,
    "IssuesView",
    "Issues",
    "Issue",
    "Category",
    "Categories",
    "EditCategoriesView",
    "RowCategoryView",
    "IssueEditView",
    ],
    function(ManagerTemplate, $, _, Backbone, TableIssueView,RowIssueView,IssuesView,Issues, Issue, Category, 
             Categories, EditCategoriesView, RowCategoryView, IssueEditView ){

        var ManagerView=Backbone.View.extend({
            template:_.template(ManagerTemplate),
            model: Issues,
            
            el:$("#main-container"),
            events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #allissues-link" : "allissues",
                "click #recentlyissues-link" : "newissues",
                "click #solvedissues-link" : "solvedissues",
                "click #editcategories-link" : "editcategories",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #search-btn": "onSearchClick",
                "change .status-selector" : "statusChanged",
                "change .category-selector" : "categoryChanged",
                "click .fa.fa-pencil": "onEditClick"
            },
            statuses:{},
            categories: {},
            issue: {},
            path: null,

            initialize:function(){
             
                this.render();

            },
            allissues: function  () {
                this.path = "/issues/all";
                this.universalshow(this.path);
            },
            newissues: function  () {
                path = "/issues/new";
                this.universalshow(this.path);
            },

            solvedissues: function  () {
                this.path ="/issues/solved";
                this.universalshow(this.path);
            },
            editcategories: function() {
                this.tableIssue = null;
                this.path = "/categories";   
                var self = this;
                self.collectionCategory = new Categories();
                var editCategoriesTable = new EditCategoriesView({collection : self.collectionCategory});
                $.get(this.path, function(data){                  
                            self.collectionCategory.models = data;    
                            self.editCategoriesTable = editCategoriesTable;        
                            self.render();                  
                });


            },
            /**
             * fetch data from db by path on succsess render 
             * path rout to server side
             * run render after fetch data
             */
            universalshow: function  (path) {
                this.editCategoriesTable = null;
                var self=this;
                self.collectionIssue = new Issues(); //{model: new Issue}    
                
                var tableIssue = new TableIssueView({collection : self.collectionIssue});
                $.get(path, function(data){
                  
                            self.collectionIssue.models = data;
        
                            self.tableIssue = tableIssue;
        
                            self.render();                  
                });
            },

           // fillModelByConditnion: function()

            render:function(){    
                this.$el.empty();
                this.$el.html(this.template(
                    { 
                        logged_in: session.get("logged_in"),
                        user: session.user.toJSON(),
                        search: '' 
                    }
                    ));
                if(this.tableIssue!=null)
                {
                    this.$('#manager-panel').append(this.tableIssue.render().el);                
                } else if(this.editCategoriesTable != null) {
                    this.$('#manager-panel').append(this.editCategoriesTable.render().el);
                } 
                
            return this;

            },
           // render:function(){
           //       //console.log(this.model);
           //     var issues=new Issues();
           //     var self=this;
           //     self.$el.empty();
           //     issues.fetch({
           //         success: function(issues) {
           //             $.get("statusesandcategories", {}, function(data){
           //             self.statuses=data.statuses;
           //             self.categories=data.categories;                        
           //             var template = self.template({
           //                 issues: issues.models,
           //                 logged_in: session.get("logged_in"),
           //                 user: session.user.toJSON(),
           //                 search: '',
           //                 //category: issues.category
           //                 statuses: self.statuses,
           //                 categories: self.categories,
           //             });
           //             console.log(issues);
           //             console.log(self.statuses);
           //             self.$el.html(template);                        
           //             });
           //           //console.log(issues);
//
//           //         }
           //     });
                   

           // },
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

                        $.get("statusesandcategories", {}, function(data){
                        self.statuses=data.statuses;
                        self.categories=data.categories;
                        var template = self.template({
                            issues: issuesFound.models,
                            logged_in: session.get("logged_in"),
                            user: session.user.toJSON(),
                            search: search,
                            //category: issues.category
                            statuses: self.statuses,
                            categories: self.categories,
                        });
                        //console.log(issues);
                        //console.log(self.statuses);
                        self.$el.html(template);                        
                        }); 

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
//<<<<<<< HEAD
//                //var user=window.session.user.get('id');
//                $.post("issues/statuschange", {
//                    issue_id: issue_id, status_id: status_id}, function(data){
//                        console.log(data);
//                    });
//            },
//
//           
//=======
                var issue = new Issue({id: issue_id});

                issue.fetch({
                    success:function(){
                        issue.save({"status": status_id},
                            {
                                success:function(model,response){console.log(response.message);},
                                error:function(model,response){console.log(response.message);}
                            }
                        )
                }
            });
        },
        
            categoryChanged: function(e){
                var category_id=e.target.value;
                var issue_id=$(e.target).closest('tr').attr('data-id');
                var issue = new Issue({id: issue_id});
                issue.fetch({
                    success:function(){
                        issue.save({"category_id": category_id, "status": null},
                                {
                                    success:function(model,response){console.log(response.message);},
                                    error:function(model,response){console.log(response.message);}
                                }
    
                        )
                    }
                });
            },
            
            onEditClick: function(e){
                e.preventDefault();
                $el = $(e.currentTarget).parent().parent().siblings(':first-child');
                var issueEditId = $el.html();
                var issueEditView = new IssueEditView({id: issueEditId}, this);
                //issueEditView.render(this);
            },

            });
        return ManagerView;
    }
);