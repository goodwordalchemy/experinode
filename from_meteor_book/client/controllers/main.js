Template.experinode.helpers({
	logged_in: function () {
		return Meteor.user();
	},
	graph_selected: function(){
		return Session.get("current_graph");
	}
});