Template.home.events({
	'click .enterRoom': function () {
		Session.set("quiz_key", document.getElementById("input_code").value);
		console.log("Entering room: " + document.getElementById("input_code").value);

		Router.go("play");
	},
	'click .reset':function(e,t){
		Meteor.call("reset",$('#input_code2').val());
	}
});