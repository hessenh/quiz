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
			,alt3Boolean:alt3Boolean,alt4Boolean:alt4Boolean,quiz_key:quiz_key,question_number:question_number,endTime:null});
	},
	'generate_key':function(){
		var text = "";
    	var possible = "0123456789";

    	for( var i=0; i < 5; i++ )
        	text += possible.charAt(Math.floor(Math.random() * possible.length));

    	return text;

	},
	'addUser':function(nickname,quiz_key){
		if(Players.find({nick:nickname,quiz_key:quiz_key}).count()>0){
			return false;
		}

		Players.insert({nick:nickname,quiz_key:quiz_key,time:0});
		return true;
	},
	'setupGame':function(quiz_key){
		if(Games.find({quiz_key:quiz_key}).count()>0){
			Games.update({quiz_key:quiz_key},{$set: {started: true,startTime:null,number:1}});
			console.log("Setting true");
		}
		else{
			console.log("Game started");
			Games.insert({quiz_key:quiz_key,started:true,startTime:null,number:1})
		}
	},
	'getStartTime': function (quiz_key) {
            return Games.findOne({quiz_key:quiz_key}).startTime;
    },
    'setStartTime':function(quiz_key){
    	console.log("Setting starting time:" + (new Date()).getTime());
    	var time = (new Date()).getTime();
    	Games.update({quiz_key:quiz_key,started:true},{$set: {startTime:time}});
        Questions.update({quiz_key:quiz_key},{$set:{endTime:time+15000}});
    },
    'reset':function(quiz_key){
    	Games.update({quiz_key:quiz_key},{$set:{started:false,startTime:null,number:1}})
        Players.remove({quiz_key:quiz_key});
        console.log("Reset");
    },
    'sendScore':function(quiz_key,nick,time,alt){

    	var game = Games.findOne({quiz_key:quiz_key});
    	if(game.startTime !=null){
    		Games.update({quiz_key:quiz_key},{$set:{startTime:null}})
    	}

    	var question = Questions.findOne({quiz_key:quiz_key,question_number:game.number});


    	var diff = game.startTime;
    	diff = time - diff;
    	diff = 15000-diff;
        var totalTime=0;
        
    	
    	if(question.alt1Boolean & alt==1){
    		totalTime = Players.findOne({nick:nick}).time + diff;
    		Players.update({nick:nick},{$set :{time:totalTime,number:game.number}});
    		console.log("Correct 1" );
    	}
    	if(question.alt2Boolean & alt==2){
    		totalTime = Players.findOne({nick:nick}).time + diff;
    		Players.update({nick:nick},{$set :{time:totalTime,number:game.number}});
    		console.log("Correct 2" );
    	}
    	if(question.alt3Boolean & alt==3){
    		totalTime = Players.findOne({nick:nick}).time + diff;
    		Players.update({nick:nick},{$set :{time:totalTime,number:game.number}});
    		console.log("Correct 3" );
    	}
    	if(question.alt4Boolean & alt==4){
    		totalTime = Players.findOne({nick:nick}).time + diff;
    		Players.update({nick:nick},{$set :{time:totalTime,number:game.number}});
    		console.log("Correct 4" );
    	}  	
    },
    'nextQuestion':function(quiz_key){
    	var number = Games.findOne({quiz_key:quiz_key}).number;

    	//Check if the if no more questions
    	if(Questions.find({quiz_key:quiz_key,question_number:number+1}).count()<1){
    		console.log("Finished");
    		return false;
    	}
    	else{
    		Games.update({quiz_key:quiz_key},{$set:{number:number+1}})
    		return true;
    	}
    },
    'numberFinished':function(quiz_key){
        var game = Games.findOne({quiz_key:quiz_key});
        return Players.find({quiz_key:quiz_key,number:game.number}).count();
    }
	
});