define([
    "underscore",
    "backbone",
    "jquery",
    "Issue",
    "text!pages/templates/CryOutTemplate.html"
    ],
    function(_, Backbone, $, Issue, CryOutTemplate){
        return Backbone.View.extend({
            elemId: 'sidebar',
            events: {
                "click #cry-out-button":"cryOutButtonClick"
            },
            initialize: function(){
                //console.log(this.collection.toJSON());
            },
            render: function(){
                var $el = $('#' + this.elemId);
                sidebar.turnOn();
                //var template = _.template(CryOutTemplate);
                $el.html(CryOutTemplate);
            },
            cryOutButtonClick: function(e){
                e.preventDefault();
                this.collection.create({
                        name        : this.$('#issue-name').val(),
                        description : this.$('#issue-description').val(),
                        category_id : this.$('#issue-type').val() // we have only text input for problem type
                        //, map_point: how to get map coordinates?
                        //we have severity but dont have any control for it
                        //we have text input issue recomandations but have no property in db table
                });            
            }        
       });
    });        