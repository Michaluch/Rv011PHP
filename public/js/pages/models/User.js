define([
	//libs
	'backbone'
], function  (Backbone) {
	var Model = Backbone.Model.extend({
		
    defaults: {
     	id          :0,
      name:       :"NoName",	
   		email       :"test@test.com",
   		password    :"",
   		facebook_id :"",
   		google_id   :"",
      role_id     :0,
      status_id   :0,
      avatar_url  :"",
      language_id :0

   	},
    initialize: function(){
       console.log('name');
    },
   		sayHi: function  () {
   			console.log("HI world");
   		}


	});
	return Model;
}
)