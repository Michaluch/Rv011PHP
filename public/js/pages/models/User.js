define([
	//libs
	'backbone'
], function  (Backbone) {
	var Model = Backbone.Model.extend({
		
    defaults: {
     	name: "NoName"	
    //   		email       :"",
    //   		password    :"",
    //   		facebook_id :"",
    //   		google_id   :"",
    //   		//avatar_url	:""
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