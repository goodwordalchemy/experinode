Template.graphs_page.helpers({
	has_graphs: function () {
		return GraphsModel.find({}).count();
	},
	graphs: function () {
		return GraphsModel.find({});
	}
});

Template.graphs_page.events({
	'click #new_graph': function(){
		Experinode.Graphs.create("New Graph (double click to rename)",
							  Meteor.userId());
	},
	'dblclick .graph_title': function(){
		var new_name = prompt("Please enter the new name:", this.name);
		if (new_name){
			Experinode.Graphs.rename(this._id, new_name);
		}
	},
	'click .delete_graph': function(){
		if(confirm("Are you sure you want to remove '" + this.name + "?'")){
			Experinode.Graphs.delete(this._id);
		}
	},
	'click .open_graph': function(){
		Experinode.Graphs.change_current(this);
	}
});