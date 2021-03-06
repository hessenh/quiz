Meteor.startup(function(){
  Meteor.setInterval(function() {
    Session.set('now', now());


    if(Session.get("isAdmin")){
	
		Meteor.call('numberFinished',Session.get("quiz_key"), function (error, result) {
			Session.set("numberFinished",result);
			console.log("getFinished");
		});
	}
  }, 1000);
});

var now = function() {
  var date = new Date();
  return Math.floor(date.getTime()/1000);
}

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
			if(result){
				console.log("Next question");
				Meteor.call("setStartTime",Session.get("quiz_key"));
			}
			else{
				Session.set("quiz_finished", true);
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
	},
	'isFinished':function(){
		/*if(Games.findOne({quiz_key:quiz_key}).number == Questions.find({quiz_key:quiz_key}).count()){
			Session.get("quiz_finished");
			console.log("hei");
			return true;
		}
		return false;
		*/
		if(Session.get("quiz_finished")){
			return true;
		}
		return false;

	},
	timeLeft:function(){
		var endTime = Questions.findOne({quiz_key:Session.get("quiz_key")}).endTime;
  		Session.set("timeleft",Math.floor((endTime/1000 - Session.get("now"))));

  		if(Session.get("timeleft")<1){
  			return 15;
  		}
  		else{
  			//console.log(16-Session.get("timeleft"));
  			return 16-Session.get("timeleft");
  		}
  	},
  	scoreList:function(){
  		return Players.find({quiz_key:Session.get("quiz_key")}, {sort: {time: -1}});
  	},
  	numberPlayers:function(){
  		return Players.find({quiz_key:Session.get("quiz_key")}).count();
  	},
  	numberFinished:function(){
  		return Session.get("numberFinished");
  	}
})
