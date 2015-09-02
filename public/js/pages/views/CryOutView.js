define([
    "underscore",
    "backbone",
    "jquery",
    "jQueryUI",
    "colorbox",
    "Issue",
    "text!pages/templates/CryOutTemplate.html",
    "text!pages/templates/IssueDetails.html",
    "text!pages/templates/NotificationSuccess.html",
    "text!pages/templates/NotificationInfo.html",
    "text!pages/templates/NotificationWarning.html",
    "text!pages/templates/NotificationDanger.html",
    "Categories"
    ],

    function(_, Backbone, $, jQueryUI, colorbox, Issue, CryOutTemplate, IssueDetailsTemplate,
                NotificationSuccess, NotificationInfo, 
                NotificationWarning, NotificationDanger, Categories){
        return Backbone.View.extend({
            map: null,
            issue: {},
            image_block: null,
            sidebar: null,
            el: $('#sidebar'),
            events: {
                "click #AddIssueButton": "cryOutButtonClick",
                "show.bs.tab .issue-tab": "changeFormTab",
                "click .btn-next": "changeFormTab",
                "change .fileUpload": "uploadImage",
                "focusout .desc-data": "setDescription",
                "click button.more-image": "addNewImage",
                "click button.image-remove": "removeImage",
                //issue details
                "click #resolve": "toResolve",
                "click .img-container img" : "colorboxImage",
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
                $("#issue-type").autocomplete({
                    source: function (request, response) {
                        $.get("categories", { query: request.term}, 
                            function (data) {
                                var arr = [];
                                $.each(data, function(){
                                  //console.log(this.name);
                                    arr.push(this.name);
                                });
                                response(arr);
                            });
                    }
                });
                this.image_block = this.$el.find('.image-item-wrapp').clone();
            },
            
            changeFormTab: function(e){
                var $el = $(e.currentTarget);
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
                }
                
            },
            getMarkerLocation: function(){
                var map = this.map;
                if (map.getMarkerPossition() !== null){
                    this.issue.map_pointer = map.getMarkerPossition();
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
                        var data = null,
                            $files = self.$el.find('.fileUpload'),
                            attachments = 0;
                            
                        if (response.code === "12201"){
                            $.each($files, function(k, e){
                                if (e.files.length){
                                    attachments++;
                                }    
                            });
                            if (attachments > 0){
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
                        }
                        //self.map.setMarkers([self.issue]);
                        // show message here
                        self.sidebar.turnOff();
                        window.location.hash = '#';
                    }
                });        
            },
            
            addNewImage: function(){
                if (this.image_block !== null){
                    var $last_image = this.$el.find('.img-container').last(),
                        order_number = ++$last_image.attr('class').split('_')[1],
                        $new_image = $('<div class="img-container image_' + order_number + '"></div>');
                    $new_image.append(this.image_block.clone());
                    $last_image.after($new_image);
                    console.log($('#sb').height() + $('#sb').scrollTop());
                    $('#sb').animate({
                      scrollTop: $('#sb').height() + $('#sb').scrollTop(),
                    },500);
                }
            },
            
            removeImage: function(e){
                if ($('.img-container').length > 1){
                    $this_elem = $(e.currentTarget);
                    $this_elem.parents('.img-container').remove();
                } else {
                    return false;
                }
            },
            
            toResolve: function(){
                var issue = new Issue({id: this.issue.id});
                issue.fetch();
                console.log(issue);
                issue.save({"status": 2},{patch: true});
                $('#resolve').remove();
            },
            
            colorboxImage: function(){
                this.$el.find('.image-slide').colorbox({
                    open: true,
                    photo: true,
                    rel: 'image-slide',
                    maxWidth: '60%',
                });
            },
            
            uploadImage: function(e) {
                var input = e.currentTarget,
                    $img_container = $(input).parents('.img-container');
                if (input.files && input.files[0]) {
                  var reader = new FileReader();  
                  reader.onloadend = function (e) {
                    selectedImage = e.target.result;
                    $img_container.find('.photo-container').attr({
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