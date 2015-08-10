define([
    "underscore",
    "backbone",
    "jquery",
    "Issue",
    "text!pages/templates/CryOutTemplate.html",
    "text!pages/templates/IssueDetails.html",
    "text!pages/templates/NotificationSuccess.html",
    "text!pages/templates/NotificationInfo.html",
    "text!pages/templates/NotificationWarning.html",
    "text!pages/templates/NotificationDanger.html"
    ],

    function(_, Backbone, $, Issue, CryOutTemplate, IssueDetailsTemplate,
                NotificationSuccess, NotificationInfo, 
                NotificationWarning, NotificationDanger){
        return Backbone.View.extend({
            map: null,
            issue: {},
            sidebar: null,
            el: $('#sidebar'),
            events: {
                "click #AddIssueButton": "cryOutButtonClick",
                "show.bs.tab .issue-tab": "changeFormTab",
                "click .btn-next": "changeFormTab",
                "change #fileUpload": "uploadImage",
                "focusout .desc-data": "setDescription",
                "click #resolve": "toResolve",
            },
            initialize: function(){
                //console.log(this.collection.toJSON());
            },
            render: function(id){
                var map = this.map,
                    issueModel,
                    self = this;

                if (typeof id !== 'undefined' && id !== null){
                    issueModel = new Issue;
                    issueModel.url = '/issues/' + id;
                    issueModel.fetch({
                        success: function(res){
                            self.sidebar.turnOn();
                            self.sidebar.setOnCloseOnce(function(){
                    self.closeView();
                });
                            var template = _.template(IssueDetailsTemplate);
                            self.issue = res.attributes;
                            self.$el.html(template(res.attributes));
                            
                        },
                    });
                    return false;
                }
                this.sidebar.turnOn();
                this.sidebar.setOnCloseOnce(function(){
                    map.setMarkerOnClick(false, true);
                    self.closeView();
                });
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
                var $el = $(e.currentTarget);
                    map = this.map;
                // If next button click    
                console.log('fired');
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
                }
                
            },
            getMarkerLocation: function(){
                var map = this.map;
                if (map.getMarkerPossition() !== null){
                    this.issue.location = map.getMarkerPossition();
                }
            },
            
            setDescription: function(e){
              this.issue.name = $('#issue-name').val();
              this.issue.category = $('#issue-type').val();
              this.issue.description = $('#issue-description').val();
            },
            cryOutButtonClick: function(e){
                e.preventDefault();
                var self = this;
                var issue = new Issue();
                // Maybe validate must be here
                issue.save(this.issue, {
                    success: function(model, response, options){
                        var data = null;
                        if (response.code === "12201" && self.$el.find('#fileUpload').get(0).files.length){
                            data = new FormData($('#fileform').get(0));
                            data.append('issue_id', response.data.issue_id);
                            data.append('type','Issue');    // add type of attch for AttchController
                            $.ajax({
                                url: '/attachment',
                                data: data,
                                cache: false,
                                processData: false,
                                contentType: false,
                                type: 'POST',
                                success: function(data){
                                    console.log(data);
                                }
                            });
                        }
                        self.map.setMarkers([self.issue]);
                        self.sidebar.turnOff();
                        window.location.hash = '#';
                    }
                });        
            },
            
            toResolve: function(){
                var issue = new Issue({id: this.issue.id});
                issue.fetch();
                console.log(issue);
                issue.save({"status": 2},{patch: true});
                $('#resolve').remove();
            },
            
            uploadImage: function(e) {
                var input = e.currentTarget;
                if (input.files && input.files[0]) {
                  var reader = new FileReader();
                  reader.onloadend = function (e) {
                    selectedImage = e.target.result;
                    $('#photo-container').attr({
                      'src': selectedImage,
                      'style': 'width: 100%; height: auto'
                    });
                  };
                  reader.readAsDataURL(input.files[0]);
                }

            },
            closeView: function(){
                this.$el.empty();
                this.undelegateEvents();
            }
       });
    });        