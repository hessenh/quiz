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

Meteor.Spinner.options = {
    lines: 20, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 20, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '20%', // Top position relative to parent in px
    left: '80%' // Left position relative to parent in px
};