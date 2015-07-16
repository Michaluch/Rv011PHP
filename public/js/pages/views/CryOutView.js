define([
    "underscore",
    "backbone",
    "jquery",
    "Issue",
    "text!pages/templates/CryOutTemplate.html",
    "Map"
    ],
    function(_, Backbone, $, Issue, CryOutTemplate, Map){
        return Backbone.View.extend({
            el: $('#sidebar'),
            events: {
                "click #AddIssueButton":"cryOutButtonClick"
            },
            initialize: function(){
                //console.log(this.collection.toJSON());
            },
            render: function(){
                sidebar.turnOn();
                //var template = _.template(CryOutTemplate);
                this.$el.html(CryOutTemplate);
            },
            cryOutButtonClick: function(e){
                e.preventDefault();
                var issue = new Issue();
                console.log("add issue");
                issue.save({
                        name        : this.$('#issue-name').val(),
                        description : this.$('#issue-description').val(),
                        category_id : 1,//this.$('#issue-type').val(), // we have only text input for problem type
                        map_point: Map.getMarkerPossition()
                })        
            }        
       });
    });        