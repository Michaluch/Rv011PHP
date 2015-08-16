define([
    "jquery",
    "underscore",
    'backbone',
    'Issue'
], function  ($, _, Backbone, Issue) {
    var Attachments = Backbone.Collection.extend({
        //model: Attachment,
        
        url: '/attachments',
        
        parse: function (response) {
            return response;
        }
    
    });
    return Attachments;
});