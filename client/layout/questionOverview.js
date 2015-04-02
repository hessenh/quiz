


Template.questionOverview.questionList = function(){
	return Questions.find({quiz_key:Session.get("quiz_key")});
}

Template.questionOverview.helpers({
	quiz_key:function(){
		return Session.get("quiz_key");
	}
})