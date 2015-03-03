Meteor.publish("Graphs", function(){
	return GraphsModel.find({"owner": this.userId});
});
Meteor.publish("Nodes", function(graph){
	return NodesModel.find({"graph": graph._id});
});
Meteor.publish("Relationships", function(nodes){
	return RelationshipsModel.find({
		$or: [
			{"node_a": { $in: nodes }},
			{"node_b": { $in: nodes }}
		]
	});
});
Meteor.publish("Infos", function(node){
	return InfosModel.find({"node": node});
});