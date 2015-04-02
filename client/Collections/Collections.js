Questions = new Meteor.Collection("questions");
Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");


Meteor.subscribe("games");
Meteor.subscribe("questions");

