

Template.gameplay.helpers({
	question:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key")}).question;
	},
	alt1:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key")}).alt1;
	},
	alt2:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key")}).alt2;
	},
	alt3:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key")}).alt3;
	},
	alt4:function(){
		return Questions.findOne({quiz_key:Session.get("quiz_key")}).alt4;
	},
	isAdmin:function(){
		return Session.get("isAdmin");
	}
})