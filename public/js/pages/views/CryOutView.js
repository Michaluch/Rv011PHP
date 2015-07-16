define([
    "underscore",
    "backbone",
    "jquery",
    "Issue",
    "text!pages/templates/CryOutTemplate.html",
    ],
    function(_, Backbone, $, Issue, CryOutTemplate){
        return Backbone.View.extend({
            map: null,
            issue: {},
            el: $('#sidebar'),
            events: {
                "click #AddIssueButton": "cryOutButtonClick",
                "show.bs.tab .issue-tab": "changeFormTab",
                "click .btn-next": "changeFormTab",
            },
            initialize: function(){
                //console.log(this.collection.toJSON());
            },
            render: function(){
                var map = this.map;
                console.log(this.map);
                sidebar.turnOn();
                //var template = _.template(CryOutTemplate);
                map.setMarkerOnClick(true);
                map.setMakerCallback(function(){
                    map.getPossitionAddress(function(address){
                        if ($('.issue-address').length){
                            if (typeof address !== null){
                                $('.issue-address').text(address[0].formatted_address);
                            }
                        }
                    });
                });
                this.$el.html(CryOutTemplate);
            },
            changeFormTab: function(e){
                console.log(e);
                var $el = $(e.currentTarget),
                    map = this.map;
                // If next button click    
                if ($el.hasClass('btn-next')){
                   $el = $el.parents('#cry-out-container').find('.issue-tab.active');
                   $el.next().find('a').tab('show');
                   return true;
                }
                 
                if ($el.hasClass('set-location')){
                    map.setMarkerOnClick(true);
                } else if ($el.hasClass('set-description')){
                    map.setMarkerOnClick(false);
                    this.getMarkerLocation();
                } else if ($el.hasClass('set-attachment')){
                    map.setMarkerOnClick(false);
                    this.getMarkerLocation();
                    /*HARDCODE*/
                    // TODO: add name and description to issue object
                    // Maybe validate must be here
                    this.issue.name = $('#issue-name').val();
                    this.issue.description = $('#issue-description').val();
                }
                
            },
            getMarkerLocation: function(){
                var map = this.map;
                if (map.getMarkerPossition() !== null){
                    this.issue.location = map.getMarkerPossition();
                }
            },
            cryOutButtonClick: function(e){
                e.preventDefault();
                console.log("add issue");
                console.log('issue', this.issue);
                return true;
                var issue = new Issue();
                // Maybe validate must be here
                issue.save(this.issue, {
                    success: function(model, response, options){
                        // save image here
                    }
                });        
            }        
       });
    });        