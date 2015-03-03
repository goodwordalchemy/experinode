Experinode.Infos = {
	create: function(title, data, node){
		var info = InfosModel.insert({
			"title": title,
			"data": data,
			"node": node
		});
		return info;
	},
	change_title: function(info, new_title){
		InfosModel.update({"_id": info}, {
			$set: {"title": new_title}
		});
	},
	change_data: function(info, data){
		InfosModel.update({"_id": info}, {
			$set: {"data": data}
		});
	},
	delete: function(info){
		InfosModel.remove({"_id": info});
	}

};