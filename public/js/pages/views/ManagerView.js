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
                "click #left-sidebar-btn" :"onLeftsidebarbtnClick"
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
                if($("#left-sidebar").css("display")==="none"){
                $("#left-sidebar").addClass("col-sm-3");
                $("#left-sidebar").addClass("col-xs-6");
                $('#left-sidebar').css("display", "block");
                $("#manager-panel").removeClass("col-sm-12");
                $("#manager-panel").removeClass("col-xs-12");
                $("#manager-panel").addClass("col-sm-9");
                $("#manager-panel").addClass("col-xs-6")
                }
                else{
                    $('#left-sidebar').css("display", "none");
                    $("#manager-panel").removeClass("col-sm-9");
                    $("#manager-panel").removeClass("col-xs-6");
                    $("#manager-panel").addClass("col-sm-12");
                    $("#manager-panel").addClass("col-xs-12");
                }
            },

            });
        return ManagerView;

    }
);