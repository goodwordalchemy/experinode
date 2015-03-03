Template.nodes_page.helpers({
	graph_name: function(){
		var graph = Session.get("current_graph");
		return graph.name;
	}
});

Template.nodes_page.events({
	'dblclick .rel_line': delete_relationship,
	'click #create_node': function(){
		var graph = Session.get("current_graph");
		var node = Experinode.Nodes.create("New Node", "blue", {
			x: 250,
			y: 250
		},
		graph._id);

		var infos = Experinode.Infos.create("New Info Title", "Insert some data...", node);
		console.log(infos);//debug
	},
	'click .remove_node': remove_node,
	'dblclick .node': function(){
		Session.set("node_selected", this._id);
		show_modal();
	},
	'click #go_back': function(){
		Session.set("current_graph");
	},
	'click .node': toggle_select_node,
	'mousemove .node': drag_node,
	'mouseover .node_border': function(e){
		if(Session.get("started_drag") &&
				$(e.target).is(".node_border")){
			$(e.target).addClass('node_border_node_selected');
		}
	},
	'mouseout .node_border': function(e){
		if(Session.equals('node_selected', this._id)){return;}

		if($(e.target).is(".node_border"))
			$(e.target).removeClass('node_border_node_selected');
	},
	'click #relationships': function(e){
		if(Session.get("started_drag") && Session.get("node_selected")){
			var node_a = Session.get('started_drag')._id;
			var node_b = create_node(e);
			Experinode.Relationships.create(node_a, node_b);
			render_lines();
		}
		Session.set("node_selected");
	},
	// 'click .color_box': color_node,

	'click .node_border': add_relationship,
	'mousemove #node_area': draw_line,
	
});
function create_node(e){
	var graph = Session.get("current_graph");
	var node = Experinode.Nodes.create("New Node", "blue", {
		x: e.pageX - $("#node_area").offset().left - 50,
		y: e.pageY - $("#node_area").offset().top - 30
	},
	graph._id);
	Experinode.Infos.create("title", "Insert some data...", node);
	console.log(node);
	return node;
}

function toggle_select_node(){
	if(Session.equals("node_selected", this._id)){
		Session.set("node_selected");
		Session.set("started_drag");
		hide_drag_line();

	}
	else {
		Session.set("node_selected", this._id);
		//$("#" + this._id).draggable( "disable");
		hide_drag_line();
	}
}

function drag_node(){
	// selecting node ensure that new nodes can be dragged from border
	// if(!Session.equals("node_selected", this._id)){

	// 	$("#" + this._id).draggable("enable");
		
	// } else {
		
	// 	$("#" + this._id).draggable( "disable");
	// }
}

function node_moved(){
	render_lines();
}

function render_lines(){
	hide_drag_line();
	d3.select("#lines").remove();

	d3.select("#relationships")
		.append("svg:svg").attr("id", "lines");

	RelationshipsModel.find({}).forEach(function(rel){
		var n1 = $("#" + rel.node_a);

		var n2 = $("#" + rel.node_b);

		if (n1.length && n2.length){
			var line = d3.select("#lines")
				.append("svg:line")
				.attr("class", "rel_line")
				.attr("rel_id", rel._id);

			setup_line(line, get_node_center(n1), get_node_center(n2));
		}
	});
}

function setup_line(d3_line, p1, p2){
	d3_line
		.attr("x1", p1.x)
		.attr("y1", p1.y)
		.attr("x2", p2.x)
		.attr("y2", p2.y)
		.attr("stroke-width", 5)
		.attr("stroke", "black");
}

Template.node_section.rendered = function(){
	Tracker.autorun(function(){
		var nodes = NodesModel.find({}).fetch();
		var node_ids = [];
		for (var k in nodes){
			node_ids.push(nodes[k]._id);
		}
		var height = $(window).height() - 10;
		var width = $(window).width() - 10;
		$(".node_border").draggable({
			handle: ".node_text",
			containement: [10, 190, width, height],
			stop: function(e, u){
				var node_id = e.target.id;
				Experinode.Nodes.move(node_id, {
					x: u.offset.left,
					y: u.offset.top
				});
			},
			drag: node_moved
		});	

		render_lines();
	});
};
Template.node_section.helpers({
	nodes: function () {
		return NodesModel.find({});
	}
});

Template.node.helpers({
	selected: function () {
		if(Session.equals("node_selected", this._id)){
			return "node_selected";
		}
		return "";
	}
});

function add_relationship(e){
	var node_selected = Session.get("node_selected");


	if($(e.target).hasClass("node_border")){
		var node_a = Session.get("started_drag");
		if(!node_a){
			if(node_selected !== e.target.id) return; //prevents drawing drag line before node is selected
			Session.set("started_drag", this);
		}
		else {
			if(node_a._id == node_selected){

				if(node_selected != this._id){
					console.log("creating relationship");//debug
					Experinode.Relationships.create(node_a._id, this._id);
					render_lines();
				}

				Session.set("started_drag");
				hide_drag_line();

				
			}
		}

	}
}
function draw_line(e){
	var node_selected = Session.get("node_selected");
	if(node_selected){

		var node = Session.get("started_drag");
		
		if(node && node._id == node_selected){
			var n = get_node_center($("#" + node._id));
			setup_line(d3.select("#mouse_line"), n, {
				x: e.pageX,
				y: e.pageY
			});
		}
	}
}
function hide_drag_line(){
	d3.select("#mouse_line").attr("stroke-width", 0);
}
function get_node_center(jquery_node){
	return {
		x: (jquery_node.width() / 2) + jquery_node.offset().left,
		y: (jquery_node.height() / 2) + jquery_node.offset().top
	};
}
function delete_relationship(e){
	e.stopPropagation();
	Experinode.Relationships.delete($(e.target).attr("rel_id"));

	render_lines();
}

function remove_node(){
	var relationships = RelationshipsModel.find({
		$or: [
			{"node_a": { $in: [this._id] }},
			{"node_b": { $in: [this._id] }}
		]
	}).fetch();
	relationships.forEach(function(rel){
		Experinode.Relationships.delete(rel._id);
	});

	var infos = InfosModel.find({"node": this._id});
	infos.forEach(function(info){
		Experinode.Infos.delete(info._id);
	});

	Experinode.Nodes.delete(this._id);
	Session.set("started_drag");
	hide_drag_line();
}
function renderTmp(template, data) {
    var node = document.createElement("div");
    document.body.appendChild(node);
    UI.renderWithData(template, data, node);
    return node;
}
function show_modal(){
	bootbox.dialog({
        title: Session.get("node_selected").title,
        message: renderTmp(Template.modal),
        buttons: {
            success: {
                label: "Save",
                className: "btn-success",
                callback: function () {
                    var name = $('#name').val();
                    var answer = $("input[name='awesomeness']:checked").val();
                    Example.show("Hello " + name + ". You've chosen <b>" + answer + "</b>");
                }
            }
        }
    });

}

