define([
        "underscore",
        "backbone",
        "jquery",
        "hash"
       
    ],

    function(_, Backbone, $) {
        return Backbone.View.extend({
        el: $('#logout-button'),
        events:{
        "click #logout-btn" : "logOut"
        },

        initialize: function(){
        	
        },
            render: function() {
                this.$el.css("display", "block");
                $("#login-button").css("display", "none");
        },
            logOut:function(e){
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
        }
/*
                _public.isLogged(
        function() {
        this.$el.hide();
        }, 
        function() {
        this.$el.show();
        }
        );

        var _public={};
        _public.isLogged(
        function() {
        $('#login-button').hide();
        }, 
        function() {
        console.log('NOt Loggined');
        }
        ),
        // private variable

        _public._isLogged = null,

        _public.isLogged = function(accept, fail) {
            if(_public._isLogged === null) {
                _public.getIsLogged(accept, fail);
            } else if(_public._isLogged){
                accept();
            } else {
                fail();
            }
        },

        _public.getIsLogged =  function  (accept, fail) {
            $.post('/auth/logged', function(data) {
                _public._isLogged = parseInt(data);
                if(_public._isLogged) {
                    accept();
                } else {
                    fail();
                }
            });
        },
*/
        });


    });