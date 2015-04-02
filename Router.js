Router.map(function(){
    this.route('home', {path: '/'});
    this.route("newquiz", {path:'/new_quiz'});
    this.route("createQuizStart");
    this.route("questionOverview");
    this.route("play");
    this.route("lobby");
    this.route("gameplay");
});


Router.configure({
 	layoutTemplate: 'layout'
});