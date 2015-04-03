

Template.gameplay.events({
	'click .alt1_client':function(){
		Meteor.call("sendScore",Session.get("quiz_key"),Session.get("nick"),(new Date).getTime(),1, function (error, result) {});
		var startTimeInterval =  setInterval(function () {
			console.log("try");
			Meteor.call("getStartTime",Session.get("quiz_key"), function (error, result) {
				if(result!=null){
			    	if(result<(new Date).getTime()){
			    		Router.go("gameplay")
			    		clearInterval(startTimeInterval);
					}
		    	}
			});
		},500);
		Router.go("showScore");
	},
	'click .alt2_client':function(){
		Meteor.call("sendScore",Session.get("quiz_key"),Session.get("nick"),(new Date).getTime(),2, function (error, result) {});
		var startTimeInterval =  setInterval(function () {
			console.log("try");
			Meteor.call("getStartTime",Session.get("quiz_key"), function (error, result) {
				if(result!=null){
			    	if(result<(new Date).getTime()){
			    		Router.go("gameplay")
			    		clearInterval(startTimeInterval);
					}
		    	}
			});
		},500);
		Router.go("showScore");
	},
	'click .alt3_client':function(){
		Meteor.call("sendScore",Session.get("quiz_key"),Session.get("nick"),(new Date).getTime(),3, function (error, result) {});
		var startTimeInterval =  setInterval(function () {
			console.log("try");
			Meteor.call("getStartTime",Session.get("quiz_key"), function (error, result) {
				if(result!=null){
			    	if(result<(new Date).getTime()){
			    		Router.go("gameplay")
			    		clearInterval(startTimeInterval);
					}
		    	}
			});
		},500);
		Router.go("showScore");
	},
	'click .alt4_client':function(){
		Meteor.call("sendScore",Session.get("quiz_key"),Session.get("nick"),(new Date).getTime(),4, function (error, result) {});
		var startTimeInterval =  setInterval(function () {
			console.log("try");
			Meteor.call("getStartTime",Session.get("quiz_key"), function (error, result) {
				if(result!=null){
			    	if(result<(new Date).getTime()){
			    		Router.go("gameplay")
			    		clearInterval(startTimeInterval);
					}
		    	}
			});
		},500);
		Router.go("showScore");
	},
	'click .next':function(){
		Meteor.call('nextQuestion',Session.get("quiz_key"), function (error, result) {
			if(error){
				console.log("Error next question");
			}
			else{
				console.log("Next question");
				Meteor.call("setStartTime",Session.get("quiz_key"));
			}
		});
	}
})

Template.gameplay.helpers({
	question:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key"),question_number:Games.findOne({quiz_key:Session.get("quiz_key")}).number}).question;
	},
	alt1:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key"),question_number:Games.findOne({quiz_key:Session.get("quiz_key")}).number}).alt1;
	},
	alt2:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key"),question_number:Games.findOne({quiz_key:Session.get("quiz_key")}).number}).alt2;
	},
	alt3:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key"),question_number:Games.findOne({quiz_key:Session.get("quiz_key")}).number}).alt3;
	},
	alt4:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key"),question_number:Games.findOne({quiz_key:Session.get("quiz_key")}).number}).alt4;
	},
	isAdmin:function(){
		return Session.get("isAdmin");
	}
})