define([
    "text!pages/templates/ManagerTemplate.html",
    "jquery",
    "underscore",
    "backbone"
    ],
    function(ManagerTemplate, $, _, Backbone){
        var ManagerView=Backbone.View.extend({
            template:_.template(ManagerTemplate),
            el:$("#main-container"),
            events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick",
                "click #search-btn": "onSearchClick"
            },
            initialize:function(){

            },
            render:function(){
                this.$el.empty();
                this.$el.html(this.template({ 
                logged_in: session.get("logged_in"),
                user: session.user.toJSON() 
            }));
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

               function showIssues(issuesList){
                    for(var i=0; i<issuesList.length; i++){
                    for(var issue in issuesList[i]){
                    $('#search-form').append('<p>'+issuesList[i].name+'</p>');
                    }
                    }
                 };

                if(search.length<3){
                    console.log("Please add more details");
                }
                else{
                    $.post("/search", {search:search}, function(data){
                    if(data.status=="ok"){
                        //var issues=showIssues(data.response);
               
                       showIssues(data.response);
                        //console.log(data);
                    }
                    else{
                        $('#search-form').append("<p>"+data.message+"</p>");
                         //console.log(data.message);      
                    };
                    });
                }
            },

            });
        return ManagerView;

    }
);