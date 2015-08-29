define([
	//libs
	'backbone',
  //deps
    'User'
], function  (Backbone,User) {
	var Users = Backbone.Collection.extend({
		model: User,
		url: '/users'
	});
	return Users;
}
)