
Template.newquiz.events({
	'click .addQuestion': function (e) {
		var question = $("#question").val();
		var alt1 = $("#alt1").val();
		var alt2 = $("#alt2").val();
		var alt3 = $("#alt3"). val();
		var alt4 = $("#alt4").val();

		var alt1Boolean = Session.get("alt1cb");
		var alt2Boolean = Session.get("alt2cb");
		var alt3Boolean = Session.get("alt3cb");
		var alt4Boolean = Session.get("alt4cb");
		
		Meteor.call('addQuestion',question,alt1,alt2,alt3,alt4,alt1Boolean,alt2Boolean,alt3Boolean,alt4Boolean,Session.get("quiz_key"),Session.get("question_number"));
		Session.set("question_number", Session.get("question_number")+1);


		$("#questionForm").each(function(){
    		this.reset();
    	});


	},
	'click .alt1checkbox':function(e){
		Session.set("alt1cb",!Session.get("alt1cb"));
	},
	'click .alt2checkbox':function(e){
		Session.set("alt2cb",!Session.get("alt2cb"));
	},
	'click .alt3checkbox':function(e){
		Session.set("alt3cb",!Session.get("alt3cb"));
	},
	'click .alt4checkbox':function(e){
		Session.set("alt4cb",!Session.get("alt4cb"));
	},
	'click .finish':function(e){
		Router.go("questionOverview");
	}
});

Template.newquiz.question_number = function(){
	return Session.get("question_number");
}

Template.newquiz.rendered = function(){
	this.$('.ui.checkbox').checkbox();
	Session.set("alt1cb", false);
	Session.set("alt2cb", false);
	Session.set("alt3cb", false);
	Session.set("alt4cb", false);

}

Template.newquiz.helpers({
	'alt1_selected':function(){
		return Session.get("alt1cb");
	},
	'alt2_selected':function(){
		return Session.get("alt2cb");
	},
	'alt3_selected':function(){
		return Session.get("alt3cb");
	},
	'alt4_selected':function(){
		return Session.get("alt4cb");
	}
})
