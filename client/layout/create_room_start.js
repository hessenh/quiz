Template.createQuizStart.events({
	'click .startCreate': function () {
		Meteor.call('generate_key', function (error, result) {
			if(error){
		    	console.log('Error generation key :', error);
		   	}else{
		    	console.log('Generated key:', result);
		    	Session.set("quiz_key",result);
		    	Session.set("question_number",1);
		    	Router.go("newquiz");
		   	}
		});
	},
	'click .enterRoom':function(e,t){
		Session.set("quiz_key",$('#input_code').val());
		Meteor.call('setupGame',Session.get("quiz_key") , function (error, result) {

			Router.go("lobby");
			console.log("Admin");
			Session.set("isAdmin", true);
		});

	}
});
