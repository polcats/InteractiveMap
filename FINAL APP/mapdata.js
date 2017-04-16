function storeDataInLS(fileName, localID) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", fileName, true);
	xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		     var res = this.responseText;
		     var string = JSON.stringify(res);
		     localStorage.setItem(localID, string);
		}
	};
	xhttp.send();
}

// load data if they are not in LS yet
if(localStorage.getItem("Map") == undefined) 
	storeDataInLS("mapdata.json", "Map");
if(localStorage.getItem("entry_points") == undefined)
	storeDataInLS("entry_exitv6.json", "entry_points");
if(localStorage.getItem("paths") == undefined)
	storeDataInLS("paths-v7.json", "paths");
if(localStorage.getItem("pois") == undefined)
	storeDataInLS("poi-v6.json", "pois");
if(localStorage.getItem("labels") == undefined)
	storeDataInLS("labels.json", "labels");

// eval is used because parsed item coming from LS is still a string
var mapObjectsJSON = localStorage.getItem("Map");
var mapObj = JSON.parse(mapObjectsJSON);
//console.log(typeof mapObj);

try {
eval("var data = " + mapObj);
	//console.log(data);
} catch(e) {
	var data = mapObj;
}

var entryObjectsJSON = localStorage.getItem("entry_points");
var entryObj = JSON.parse(entryObjectsJSON);
eval("var entrydata = " + entryObj);

var pathsObjectsJSON = localStorage.getItem("paths");
var pathsObj = JSON.parse(pathsObjectsJSON);
eval("var pathsdata = " + pathsObj);

var poisObjectsJSON = localStorage.getItem("pois");
var poisObj = JSON.parse(poisObjectsJSON);
eval("var poisdata = " + poisObj);

var labelsObjectsJSON = localStorage.getItem("labels");
var labelsObj = JSON.parse(labelsObjectsJSON);
eval("var labelsdata = " + labelsObj);


// this is used to parse svgs
// directly appending them to html elements will work but they will not be rendered
// we use a different namespace
function parseSVG(s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+ s +'</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
    return frag;
}

// just resizes the svg code in the index.html based on the map json file
function initializeMainSVG(width, height, id, parentId) {
	var svg = document.getElementById(id);
	svg.setAttribute("width", width);
	svg.setAttribute("height", height);
	svg.setAttribute("viewbox", "0 0 " + width + " " + height);
}

function generateFilters(buildingsArray, floorsArray, roomsArray) {
	var bldgSelect = document.getElementById("filterbldg");
	var flrSelect = document.getElementById("filterfloor");
	var rmSelect = document.getElementById("filterroom");

	// buildings
	for(z = 0; z < buildingsArray.length; z++) {
		var option = document.createElement("option");
		option.setAttribute("value", buildingsArray[z].keyword);
		option.innerHTML = buildingsArray[z].display;
		//console.log(option);
		bldgSelect.appendChild(option);
	}

	// floors
	for(x = 0; x < floorsArray.length; x++) {
		var option = document.createElement("option");
		option.setAttribute("value", floorsArray[x].keyword);
		option.innerHTML = floorsArray[x].display;
		//console.log(option);
		flrSelect.appendChild(option);
	}

	// rooms
	for(c = 0; c < roomsArray.length; c++) {
		var option = document.createElement("option");
		option.setAttribute("value", roomsArray[c].keyword);
		option.innerHTML = roomsArray[c].display;
		//console.log(option);
		rmSelect.appendChild(option);
	}
}

function generateGates(gatesArray) {
	var gatesSelect = document.getElementById("gates");
	for(e = 0; e < gatesArray.length; e++) {
		var option = document.createElement("option");
		option.setAttribute("value", gatesArray[e].keyword);
		option.innerHTML = gatesArray[e].display;
		//console.log(option);
		gatesSelect.appendChild(option);
	}
}


function generateLabels(array) {
	var beforepoints = document.getElementsByClassName("entrypoint")[0];
	for(y = 0; y < array.length; y++) {
		var element = "<text x=\""+array[y].x+"\" y=\""+array[y].y+"\""+
		"onclick=\"doActivity('"+array[y].for.split(", ")[0]+"','"+array[y].for.split(", ")[1]+"');\""+
		"\" class=\"bldglabel\">" + array[y].name + "</text>";
		document.getElementById(mainSVG).insertBefore(parseSVG(element), beforepoints);
	}
}

var mainSVG = "map";
function generateEntries(array) {
	for(v = 0; v < array.length; v++) {
		var rad = "5";
		var element = "<a class=\"entrypoint\"><circle id=\""+array[v]["name"]+"\" cx=\""+array[v]["x"]+"\" cy=\""+array[v]["y"]+"\" r=\"" + rad +
					  "\"  onclick=\"pointOfEntryDetails('" + array[v]["name"] + "', ' " + array[v]["location"] + "')\" name=\""+array[v]["location"]+"\" /></a>";
		document.getElementById(mainSVG).appendChild(parseSVG(element));
	}
}

function generatePointsOfInterests(array) {
	for(v = 0; v < array.length; v++) {
		var arr = array[v]; // this is the general array of the poi json
		if(arr.floor instanceof Array && arr.type == "multiple_similar") { // for the multiple typed entries in the json file
			for(j = 0; j < arr.floor.length; j++) {
				var innerArr = arr.floor[j];
				var element = "<a class=\"interestpoint " + arr.building + " "  + innerArr.floor + " "+arr.class+"\"><circle name=\""+innerArr.name+
				"\" name=\""+arr.pointname+"\" cx=\""+arr.x+"\" cy=\""+arr.y+"\" onclick=\"pointOfInterestDetails("+v+", "+j+");\" class=\""+
				arr.class+"\" /></a>";
				document.getElementById(mainSVG).appendChild(parseSVG(element));
			}
		} else if(arr.floor instanceof Array && arr.type == "multiple") { // for the multiple typed entries in the json file
			for(j = 0; j < arr.floor.length; j++) {
				var innerArr = arr.floor[j];
				var element = "<a class=\"interestpoint " + arr.building + " "  + innerArr.floor + " "+innerArr.class+"\"><circle name=\""+innerArr.name+
				"\" name=\""+arr.pointname+"\"   cx=\""+arr.x+"\" cy=\""+arr.y+"\" onclick=\"pointOfInterestDetails("+v+", "+j+");\" class=\""+
				arr.class+"\" /></a>";
				document.getElementById(mainSVG).appendChild(parseSVG(element));
			}
		} else { // for the single entries
			var element = "<a class=\"interestpoint " + arr.building + " " + arr.floor + " "+arr.class+"\"><circle name=\""+arr.pointname+
			"\" name=\""+arr.pointname+"\" cx=\""+arr.x+"\" cy=\""+arr.y+"\" onclick=\"pointOfInterestDetails("+v+");\" class=\""+
			arr.class+"\" /></a>";
			document.getElementById(mainSVG).appendChild(parseSVG(element));
		}		
	}
}

function generateStructures(array) {
	for(f = 0; f < array.length; f++) {
		var event  = "";
		if(array[f].class.match(/building/gi)) {
			event = "onclick=\"doActivity('"+array[f].name+"','"+f+"')\"";
		}

		if(array[f].type.match(/polygon/g)) {
			var element = "<polygon class=\""+array[f]["class"]+
			"\" id=\""+array[f]["name"]+
			"\" points=\""+array[f]["points"]+"\" "+event+"></polygon>";
		
			document.getElementById(mainSVG).appendChild(parseSVG(element));
		} else if(array[f].type.match(/ellipse/g)) {
			var element = "<ellipse class=\""+array[f]["class"]+
			"\" id=\""+array[f]["name"]+
			"\" cx=\""+array[f]["cx"]+
			"\" cy=\""+array[f]["cy"]+
			"\" rx=\""+array[f]["rx"]+
			"\" ry=\""+array[f]["ry"]+
			"\" transform=\""+array[f]["transform"]+
			"\" />";
			document.getElementById(mainSVG).appendChild(parseSVG(element));
		} else if(array[f].type.match(/path/g)) {
			var element = "<path class=\""+array[f]["class"]+
			"\" id=\""+array[f]["name"]+
			"\" d=\""+array[f]["d"]+
			"\" class=\""+array[f]["class"]+
			"\" "+event+"/>";
			document.getElementById(mainSVG).appendChild(parseSVG(element));
		} else if(array[f].type.match(/line/g)) {
			var element = "<line class=\""+array[f]["class"]+
			"\" id=\""+array[f]["name"]+
			"\" x1=\""+array[f]["x1"]+
			"\" x2=\""+array[f]["x2"]+
			"\" y1=\""+array[f]["y1"]+
			"\" y2=\""+array[f]["y2"]+
			"\" class=\""+array[f]["class"]+
			"\"/>";
			document.getElementById(mainSVG).appendChild(parseSVG(element));
		}
	}
}