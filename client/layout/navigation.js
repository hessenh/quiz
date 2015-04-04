

Template.navigation.helpers({
	closeNavbar: function () {
		return !Session.get("closeNavbar");
	}
});