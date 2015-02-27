Template.sideNav.helpers({
	has_graphs: function () {
		return GraphsModel.find({}).count();
	},
	graphs: function () {
		return GraphsModel.find({});
	}
});

Template.sideNav.events({
	'click #new_graph': function(){
		Experinode.Graphs.create("New Graph", Meteor.userId());
	},
	'dblclick .graph_title': function(e){
		e.stopPropagation();
		$(e.target).parent().toggleClass('hidden');
		$('.new_title_field').toggleClass('hidden');
	},
	'keydown .new_title_field': function(e){
		console.log('keydown registered');//debug
		console.log("e.which", e.which);//debug
		if(e.which == 13) {
			console.log("in function: e.which", e.which);//debug
			var new_name = e.target.val();
			$(e.target).toggleClass('hidden');
			Experinode.Graphs.rename(this._id, new_name);
			$('.graph_title').toggleClass('hidden');
		}
	}
});