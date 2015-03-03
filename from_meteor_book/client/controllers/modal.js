Template.modal.rendered = function () {
	Tracker.autorun(function(){
		highlight_color_box();
	});
};
function highlight_color_box(){
	$('.color_box').removeClass("color_box_selected");
	var node_id = Session.get("node_selected");
	if(node_id){
		var node = NodesModel.findOne({"_id": node_id});
		$("." + node.color).addClass("color_box_selected");
	}
}

Template.modal.helpers({
	node_selected: function () {
		var node = Session.get("node_selected");
		return NodesModel.findOne({"_id": node});
	},
	infos: function(){
		var node = Session.get("node_selected");
		return InfosModel.find({"node": node}).fetch();

	}
});
Template.modal.events({
	'dblclick #node-title': change_node_title,
	'blur #node-title-input': commit_node_title,
	'keydown #node-title-input': function(e){
		if (e.which == 13) commit_node_title();
	},
	'click .color_box': color_node,
	'dblclick .panel-heading': change_info_title,
	'blur .info-title-input': commit_info_title,
	'keydown .info-title-input': function(e){
		if (e.which == 13) commit_info_title();
	},
	'click .panel-body': change_info_content,
	'blur .info-data-input': commit_info_content,
	'click #new_info': create_new_info
});

function change_node_title(){
	$("#node-title").addClass("hidden");
	$('#node-title-input').removeClass("hidden");
}
function commit_node_title(){
	var new_title = $('#node-title-input').val();
	if(new_title && new_title.length > 0){
		Experinode.Nodes.change_title(this._id, new_title);
	}
	$("#node-title").removeClass("hidden");
	$('#node-title-input').addClass("hidden");
}
function color_node(e) {
	var color = $(e.target).attr("color");
	var node = Session.get("node_selected");
	if (color && node){
		Experinode.Nodes.change_color(node, color);
	}
}
function change_info_title(){
	$("#info-title-" + this._id).addClass("hidden");
	$('#info-title-input-'+ this._id).removeClass("hidden");
}
function commit_info_title(){
	var $input = $("#info-title-input-" + this._id);
	var new_title = $input.val();
	if(new_title && new_title.length > 0){
		Experinode.Infos.change_title(this._id, new_title);
	}
	$("#info-title-" + this._id).removeClass("hidden");
	$input.addClass("hidden");
}
function change_info_content(){
	$("#info-data-" + this._id).addClass("hidden");
	$('#info-data-input-'+ this._id).removeClass("hidden");
}
function commit_info_content(){
	var $input = $("#info-data-input-" + this._id);
	var new_data = $input.val();
	if(new_data && new_data.length > 0){
		Experinode.Infos.change_data(this._id, new_data);
	}
	$("#info-data-" + this._id).removeClass("hidden");
	$input.addClass("hidden");
}
function create_new_info(){
	Experinode.Infos.create(
		"Double Click to change Title",
		"Double Click to add some data",
		this._id
	);
}