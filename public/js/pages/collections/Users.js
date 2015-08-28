define([
	//libs
	'backbone',
  //deps
    'User'
], function  (Backbone,User) {
	var Collection = Backbone.Collection.extend({
		model:User,
        url:"/users"
	});
	return Collection;
}
)