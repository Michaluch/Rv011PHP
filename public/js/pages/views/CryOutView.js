define([
    "underscore",
    "backbone",
    "jquery",
    "Issue",
    "text!pages/templates/CryOutTemplate.html"
    ],
    function(_, Backbone, $, Issue, CryOutTemplate){
        return Backbone.View.extend({
        el:$("#sidebar"),
        events:{
            "click #cry-out-button":"cryOutButtonClick"
        },
        initialize:function(){
            //console.log(this.collection.toJSON());
        },
        render:function(){
             this.$el.css("display", "block").addClass("col-xs-3");
             $("#map-canvas").addClass("col-xs-9");
            //var template = _.template(CryOutTemplate);
                this.$el.html(CryOutTemplate);
        },

        cryOutButtonClick:function(e){
            e.preventDefault();
            this.collection.create({
                    name       : this.$('#issue-name').val(),
                    description : this.$('#issue-description').val(),
                    category_id : this.$('#issue-type').val() // we have only text input for problem type
                    //, map_point: how to get map coordinates?
                    //we have severity but dont have any control for it
                    //we have text input issue recomandations but have no property in db table
                    }
                }); 
            
        }        
       });
    });        