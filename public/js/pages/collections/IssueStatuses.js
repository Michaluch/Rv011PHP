define([
    "jquery",
    "underscore",
    'backbone',
    'IssueStatus'
], function  ($, _, Backbone, IssueStatus) {
    var IssueStatuses = Backbone.Collection.extend({
        model: IssueStatus,
        url: '/statuses',
    });
    return IssueStatuses;
});