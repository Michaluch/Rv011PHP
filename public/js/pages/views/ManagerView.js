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
                "click #small-logout-btn" :"onLogoutClick"
            },
            initialize:function(){
                //console.log("test");
            },
            render:function(){
                console.log(session.user.toJSON());
               this.$el.empty();
               this.$el.html(this.template({ 
                logged_in: session.get("logged_in"),
                user: session.user.toJSON() 
            }));
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