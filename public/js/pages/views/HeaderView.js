define([
    "text!pages/templates/header.html",
    "underscore",
    "backbone",
    "bootstrap"
    ], function(header, _, Backbone){
        var HeaderView=Backbone.View.extend({
            template:_.template(header),
            initialize:function(){
                session.on("change:logged_in", this.onLoginStatusChange);
            },
            events:{
                "click #logout-btn" :"onLogoutClick",
                "click #main-banner" : "onHomePageClick"
            },
            onLoginStatusChange:function(e){
                this.render();
                if(session.get("logged_in")) showAlert("Success", "Logged in as "
                    +session.get("user").email);
                else showAlert("Logged out seccessfully");    
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
            onHomePageClick: function(){
                window.location.href="/";
            },
            render:function(){
                this.$el.html(this.template({ 
                logged_in: session.get("logged_in"),
                user: session.user.toJSON() 
            }));
            return this;

            },
        });
    return HeaderView;
    });