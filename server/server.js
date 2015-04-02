Questions = new Meteor.Collection("questions");
Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");


Meteor.publish("questions", function() {
  return  Questions.find();
});

Meteor.publish('players', function () {
	return Players.find({});
});
Meteor.publish('games',function(){
	return Games.find({});
});

Meteor.methods({
	'addQuestion':function(question,alt1,alt2,alt3,alt4,alt1Boolean,alt2Boolean,alt3Boolean,alt4Boolean,quiz_key,question_number){

		Questions.insert({question:question,alt1:alt1,alt2:alt2,alt3:alt3,alt4:alt4,alt1Boolean:alt1Boolean,alt2Boolean:alt2Boolean
			,alt3Boolean:alt3Boolean,alt4Boolean:alt4Boolean,quiz_key:quiz_key,question_number:question_number});
	},
	'generate_key':function(){
		var text = "";
    	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    	for( var i=0; i < 5; i++ )
        	text += possible.charAt(Math.floor(Math.random() * possible.length));

    	return text;

	},
	'addUser':function(nickname,quiz_key){
		if(Players.find({nick:nickname,quiz_key:quiz_key}).count()>0){
			return false;
		}

		Players.insert({nick:nickname,quiz_key:quiz_key});
		return true;
	},
	'setupGame':function(quiz_key){
		if(Games.find({quiz_key:quiz_key}).count()>0){
			Games.update({quiz_key:quiz_key},{$set: {started: true,startTime:null}});
			console.log("Setting true");
		}
		else{
			console.log("Game started");
			Games.insert({quiz_key:quiz_key,started:true,startTime:null})
		}
	},
	'getStartTime': function (quiz_key) {
            return Games.findOne({quiz_key:quiz_key}).startTime;
    },
    'setStartTime':function(quiz_key){
    	console.log("Setting starting time:" + (new Date()).getTime());
    	var time = (new Date()).getTime()+5000;
    	Games.update({quiz_key:quiz_key,started:true},{$set: {startTime:time}});
    },
    'reset':function(quiz_key){
    	Games.update({quiz_key:quiz_key},{$set:{started:false,startTime:null}})
    }
	
});