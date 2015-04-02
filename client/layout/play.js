
Template.play.events({
	'click .enterQuiz':function(e){
		var nickname = $("#nickname").val();

		Meteor.call('addUser',nickname, function (error, result) {
			if(result){
				Session.set("nick", nickname);
				console.log("Added user " + nickname);
				Router.go("lobby");
				Session.set("startTime",2427867769878);
			}
			else{
				alert("Nickname already in use.")

			}
		});
	}
})


Template.play.helpers({

	isValidCode: function () {
		if(Questions.findOne({quiz_key:Session.get("quiz_key")})){
			return true;
		}
		return false;
	},
	questionList:function(){
		return Questions.find({quiz_key:Session.get("quiz_key")});
	}
});
