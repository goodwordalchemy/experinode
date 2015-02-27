Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.home.rendered = function(){
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};