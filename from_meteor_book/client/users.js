Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.startup(function(){
	Tracker.autorun(function(){
		var userId = Meteor.userId();
        if(userId){
            console.log(userId + " connected");
            // do something with Meteor.user()
        }
        else {
            console.log("User disconnected");
            // can't use Meteor.user() anymore
            // do something with lastUser (read-only !)
            Session.set("current_graph");
        }
    });
});
