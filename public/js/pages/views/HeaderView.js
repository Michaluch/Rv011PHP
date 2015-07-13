define([
    "text!pages/templates/header.html",
    "bootstrap"
    ], function(header){
        var HeaderView=Backbone.View.extend({
            template:_.template(header),
            initialize:function(){
                session.on("change:logged_in", this.onLoginStatusChange);
            },
            events:{
                "click #logout-btn" :"onLogoutClick"
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
                window.location.href="/public/index3.html";
            };
        });
            },
            render:function(){
                if(DEBUG) console.log(session.toJSON());
                this.$el.html(this.template({ 
                logged_in: session.get("logged_in"),
                user: session.user.toJSON() 
            }));
            return this;

            },
        });
    return HeaderView;
    });