Meteor.startup(function() {
   $('body').attr('unresolved', '');
});

Template.experinode.helpers({
	logged_in: function () {
		return Meteor.user();
	}
});

Template.home.rendered = function(){
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Template.app.rendered = function () {
	Accounts._loginButtonsSession.set('dropdownVisible', false);
};

