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
if(localStorage.getItem("Map") == undefined) storeDataInLS("mapdata.json", "Map");
if(localStorage.getItem("entry_points") == undefined)storeDataInLS("entry_exitv5.json", "entry_points");
if(localStorage.getItem("paths") == undefined)storeDataInLS("paths-v6.json", "paths");
if(localStorage.getItem("pois") == undefined)storeDataInLS("poi-v4.json", "pois");

var mapObjectsJSON = localStorage.getItem("Map");
var mapObj = JSON.parse(mapObjectsJSON);
try {
eval("var data = " + mapObj);
}catch(e) {
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


var currentBuildingIndex = null;
function notes(action) {
	if(action == 1) {
		var newData = data;
		
		newData["Structures"][currentBuildingIndex].text = document.getElementById("text").value;
		localStorage.setItem("Map", JSON.stringify(newData));

		var newMapObj = localStorage.getItem("Map");
		var parsedNewObj = JSON.parse(newMapObj);
		console.log(parsedNewObj);
		data = parsedNewObj;
	}
}


function parseSVG(s) {
    var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+ s +'</svg>';
    var frag = document.createDocumentFragment();
    while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
    return frag;
}

function setMainSVG(width, height, id, parentId) {
	var svg = document.getElementById(id);
	svg.setAttribute("width", width);
	svg.setAttribute("height", height);
	svg.setAttribute("viewbox", "0 0 " + width + " " + height);
}


var b1 = "Initial1";
var b2 = "Initial2";
var gate = "MainGate";
var building = "";
function doActivity(destinationName, detailID) {
	var array = pathsdata["Paths"];
	var beforepoints = document.getElementsByClassName("point")[0];

	// removes previous paths
	try {
		var poly = document.getElementsByClassName("buildingpath");
		for(s = 0; s < poly.length; s++) {
			poly[s].parentNode.removeChild(poly[s]);
		}
	} catch(e) { }

	// removes previous gate-2-b paths
	try {
		document.getElementsByClassName("gatepath")[0].remove();
	} catch(e) {}

	// reset b1/b2 class attribute to default [mode changed]
	try {
		document.getElementById(b1).setAttribute("class", "Building");
		document.getElementById(b2).setAttribute("class", "Building");
	} catch(e) { }

	// reset textarea display when mode changed
	try {
		document.getElementById("textcontainer").removeAttribute("style");
	} catch(e) { }

	if(!showpathsactive) { // resets on mode change
		b1 = "Initial1";
		b2 = "Initial2";
	}

	// reset current building used in notes in mode change
	currentBuildingIndex = null;

	if(showdetailsactive) { //show details
		var detailBox = document.getElementById("details");
		var buildingName = data["Structures"][detailID].displayname;
		var text  = data["Structures"][detailID].text;
		detailBox.childNodes[1].innerHTML = "Details";
		detailBox.childNodes[3].innerHTML = buildingName;
		document.getElementById("textcontainer").childNodes[1].value = text;
		document.getElementById("textcontainer").setAttribute("style", "display: block");
		detailBox.setAttribute("style", "display: block");
		currentBuildingIndex = detailID;
		return false; //terminate the function here
	}

	if(showBuildingPathsActive) { // gate-2-b
		building = destinationName;
		for(v = 0; v < array.length; v++) {
			var pair = array[v].pair;
			var direction = "";
			if((pair.indexOf(gate) >= 0) && (pair.indexOf(building) >= 0)) {
				
				if(pair.indexOf(gate) < pair.indexOf(building)) { // default
					direction = "reverse";
				} else {
					direction = "normal";
				}
				var element = "<polyline style=\"animation-direction:"+direction+";\" points=\""+array[v].points+"\" name=\""+array[v].pair+"\" class=\"gatepath\"></polyline>";
				document.getElementById(mainSVG).insertBefore(parseSVG(element), beforepoints);
			}
		}
		return false; //terminate the function here
	}


	b1 = b2;
	b2 = destinationName;

	// add class to building to highlight them via css
	try {
		document.getElementById(b1).setAttribute("class", "Building selected");
	} catch(e) { }
	try {
		document.getElementById(b2).setAttribute("class", "Building selected");
	} catch(e) { }

	// remove highlight when same building is clicked twice
	if(b1 == b2) {
		try {
			document.getElementById(b1).setAttribute("class", "Building");
		} catch(e) { }

		try {
			document.getElementById(b2).setAttribute("class", "Building");
		} catch(e) { }

		b1 = "Initial1";
		b2 = "Initial2";
	}


	for(n = 0; n < array.length; n++) {
		var pair = array[n].pair;
		var direction = "";
		
		// alternates disabled in if-statement
		if((pair.indexOf(b1) >= 0) && (pair.indexOf(b2) >= 0) && b1!==b2 && !showBuildingPathsActive  && array[n].type != "alternate") {
			
			// check path animation direction
			if(pair.indexOf(b1) < pair.indexOf(b2)) { // default arrangement in JSON
				direction = "reverse";
			} else {
				direction = "normal";
			}

			
			// path of b-2-b
			var element = "<polyline style=\"animation-direction:"+direction+";\" points=\""+array[n].points+"\" name=\""+array[n].pair+"\" class=\"buildingpath\"></polyline>";
			document.getElementById(mainSVG).insertBefore(parseSVG(element), beforepoints);

		}
	}
}


function pointofentry(point, location) {

	return false; //disable this for now

	// reset textarea display when clicking entry points
	try {
		document.getElementById("textcontainer").removeAttribute("style");
	} catch(e) { }

	var previous = document.getElementsByClassName("currentpoint");
	for(g = 0; g < previous.length; g++) {
		previous[0].removeAttribute("class");
	}

	document.getElementById(point).setAttribute("class","currentpoint");

	var detailBox = document.getElementById("details");
	detailBox.childNodes[1].innerHTML = "Details";
	detailBox.childNodes[3].innerHTML = point.replace(/<single>/g, "'").split("] ")[1]
	detailBox.setAttribute("style", "display: block");

}

function pointofinterest(num) {
	var obj = poisdata["Points"][num];
	var previous = document.getElementsByClassName("currentpoint");
	for(g = 0; g < previous.length; g++) {
		previous[0].removeAttribute("class");
	}
	var detailBox = document.getElementById("details");
	detailBox.childNodes[1].innerHTML = "Details";
	detailBox.childNodes[3].innerHTML = "<span>Floor: " + obj.floor + "</span><br>";
	detailBox.childNodes[3].innerHTML += "<span class='interest'>" + obj.pointname + "</span>";
	detailBox.setAttribute("style", "display: block");
}

var mainSVG = "map";
function generateEntries(array) {
	for(v = 0; v < array.length; v++) {
		var rad = "5";
		var element = "<a class=\"point\"><circle id=\""+array[v]["name"]+"\" cx=\""+array[v]["x"]+"\" cy=\""+array[v]["y"]+"\" r=\"" + rad +
					  "\"  onclick=\"pointofentry('" + array[v]["name"] + "', ' " + array[v]["location"] + "')\" name=\""+array[v]["location"]+"\" /></a>";
		document.getElementById(mainSVG).appendChild(parseSVG(element));
	}
	
}

function generatePointsOfInterests(array) {
	for(v = 0; v < array.length; v++) {
		var rad = "5";
		var element = "<a class=\"point\"><circle id=\""+array[v]["pointname"]+"\" cx=\""+array[v]["x"]+"\" cy=\""+array[v]["y"]+"\" r=\"" + rad +
					  "\"  onclick=\"pointofinterest("+v+");\" class=\"interest\" /></a>";
		document.getElementById(mainSVG).appendChild(parseSVG(element));
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