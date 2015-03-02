Experinode.Nodes = {
	create: function(title, color, position, graph){
		var node = NodesModel.insert({
			"title": title,
			"color": color,
			"position": position,
			"graph": graph,
			"hypothesis": "enter a Hypothesis",
			"discussion": "enter a discussion",
			"conclusion": "enter a conclusion"
		});
		return node;
	},
	delete: function(node){
		NodesModel.remove({"_id": node});
	},
	move: function(node, new_position){
		NodesModel.update({"_id": node}, {
			$set: {"position": new_position}
		});
	},
	change_title: function(node, new_title){
		NodesModel.update({"_id": node}, {
			$set: {"title": new_title}
		});
	},
	change_color: function(node, new_color){
		NodesModel.update({"_id": node}, {
			$set: {"color": new_color}
		});
	},
	change_hypothesis: function(node, new_hypothesis){
		NodesModel.update({"_id": node}, {
			$set: {"hypothesis": new_hypothesis}
		});
	},
	change_discussion: function(node, new_discussion){
		NodesModel.update({"_id": node}, {
			$set: {"discussion": new_discussion}
		});
	},
	change_conclusion: function(node, new_conclusion){
		NodesModel.update({"_id": node}, {
			$set: {"conclusion": new_conclusion}
		});
	},
};