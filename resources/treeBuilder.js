function s3TreeBuild(filesOrFolders) {

	var treeJSON = {};

	// FUNCTION : Detect file or folder
	var fileOrFolderCheck = function(data) {

		if(data["key"].charAt(0) === "."){
			return "hidden";
		} else if (data["key"].charAt(data["key"].length - 1) === "/") {
			return "folder";
		} else {
			return "file";
		}

	}

	// Format into treeJSON
	for (var i = 0; i < filesOrFolders.length; i++) {

		// Formatting/Calc
		var type = fileOrFolderCheck(filesOrFolders[i]); // Calculate "file" or "folder"
		var key = (type === "folder") ? filesOrFolders[i].key.slice(0, -1) : filesOrFolders[i].key;
		var value = (type === "folder") ? {} : filesOrFolders[i].url.replace(/\/\//g, "/").replace(":/", "://").replace(".s3-eu-west-1.amazonaws.com","");

		// Figure out path
		var path_split = key.split("/");

		var obj = treeJSON;

		// Create structure based on path
		for (var j = 0; j < path_split.length; j++) {

			var keyName = path_split[j];

			if (!obj[keyName]) {

				obj[keyName] = value;

			}

			obj = obj[keyName];

		}

	};

	// Format into bootstrapTree
	var bootstrapTree = [];

	// FUNCTION : Build Bootstrap format tree
	function buildBootstrapTree(obj, nestedObj) {

		for (node in obj) {

			// Handle Files
			if (typeof obj[node] !== "object") {

				var nodePass = {

					text: node,
					//icon: "glyphicon glyphicon-stop",
					//selectedIcon: "glyphicon glyphicon-stop",
					//color: "#000000",
					//backColor: "#FFFFFF",
					href: obj[node],
					selectable: false,
					//tags: ['available']
				}

				// Pass into tree
				nestedObj.push(nodePass);

			} else {

				// Handle Folders
				var nodePass = {

					text: node,
					//icon: "glyphicon glyphicon-plus",
					//selectedIcon: "glyphicon glyphicon-stop",
					//color: "#000000",
					//backColor: "#FFFFFF",
					selectable: false,
					//tags: ['available'],
					state: {
						checked: false,
						disabled: false,
						expanded: false,
						selected: false
					},
					//tags: ['available'],
					nodes: []
				}

				// Pass into tree
				nestedObj.push(nodePass);

				buildBootstrapTree(obj[node], nodePass.nodes);

			}

		}

	}

	// Build Bootstrap Tree
	buildBootstrapTree(treeJSON.web_pages, bootstrapTree);
	return bootstrapTree;
}