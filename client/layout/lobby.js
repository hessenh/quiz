Meteor.subscribe("players");



Template.lobby.events({
	'click #setTime': function () {
		Meteor.call("setStartTime",Session.get("quiz_key"));
	}
});


Template.lobby.helpers({
	playerList: function () {
		var startTimeInterval =  setInterval(function () {
			Meteor.call("getStartTime",Session.get("quiz_key"), function (error, result) {
				if(result!=null){
			    	if(result<(new Date).getTime()){
			    		Router.go("gameplay")
			    		clearInterval(startTimeInterval);
					}
		    	}
			});
		},500);
		return Players.find({quiz_key:Session.get("quiz_key")});
	},
	isAdmin:function(){
		return Session.get("isAdmin");
	}
});

