Template.nodes_page.helpers({
	graph_name: function(){
		var graph = Session.get("current_graph");
		return graph.name;
	}
});

Template.nodes_page.events({
	'dblclick #node_area': function(e){
		var graph = Session.get("current_graph");
		Experinode.Nodes.create("New Node", "blue", {
			// x: e.pageX - $("#node_area").offset().left,
			// y: e.pageY - $("#node_area").offset().top
			x: 250,
			y: 250
		},
		graph._id);
	},
	'click .remove_node': function(){
		Experinode.Nodes.delete(this._id);
	},
	'dblclick .node': function(){
		$('#myModal').modal('show');
		// if(title){
		// 	Experinode.Nodes.change_title(this._id, title);
		// }
	},
	'click #go_back': function(){
		Session.set("current_graph");
	},
	
	// 'click .node': select_node,
	// 'click #relationships': unselect_node,
	// 'click .color_box': color_node,
	// 'mouseover .node': drag_node,
	// 'click .node_border': add_relationship,
	// 'mousemove #node_area': draw_line,
	// 'dblclick .rel_line': delete_relationship
});

Template.node_section.rendered = function(){
	var nodes = NodesModel.find({}).fetch();
	var node_ids = [];
	for (var k in nodes){
		node_ids.push(nodes[k]._id);
	}	
};
Template.node_section.helpers({
	nodes: function () {
		return NodesModel.find({});
	}
});