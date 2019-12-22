function setUp(q, response) {
    let setup = document.getElementById("setup");
    setup.innerHTML = "";

    if (q == "0" && response == "1") {
        let q1 = "Are you familiar with the premises of Saint Louis University?";
        setup.innerHTML =
            "<div class='q'><h1> " +
            q1 +
            " </h1>" +
            "<input type='button' value='Yes' onclick='setUp(1, 1)' />" +
            "<input type='button' value='No' onclick='setUp(1, 0)' /></div>";
    } else if (q == "1" && response == "0") {
        let q2 = "Would you like to undergo a guiding stage to go to your first destination building?";
        setup.innerHTML =
            "<div class='q'><h1> " +
            q2 +
            " </h1>" +
            "<input type='button' value='Yes' onclick='setUp(2, 1)' />" +
            "<input type='button' value='No' onclick='setUp(2, 0)' /></div>";
    } else if (q == "1" && response == "1") {
        let q2 = " Would you still like to undergo a guiding stage to go to a building?";
        setup.innerHTML =
            "<div class='q'><h1> " +
            q2 +
            " </h1>" +
            "<input type='button' value='Yes' onclick='setUp(2, 1)' />" +
            "<input type='button' value='No' onclick='setUp(2, 0)' /></div>";
    } else if (q == "2" && response == "0") {
        let a1 = "Alright, please reload the page to see the map.";
        setup.innerHTML =
            "<div class='q'><h1> " +
            a1 +
            " </h1>" +
            "<input type='button' value='Reload' onclick='window.location.reload(); saveInitialSettings(true);' />";
        localStorage.setItem("setupdone", "true");
    } else if (q == "2" && response == "1") {
        let q3 = "Are you already inside the campus?";
        setup.innerHTML =
            "<div class='q'><h1> " +
            q3 +
            " </h1>" +
            "<input type='button' value='Yes' onclick='setUp(3, 1)' />" +
            "<input type='button' value='No' onclick='setUp(3, 0)' /></div>";
    } else if (q == "3" && response == "0") {
        let q4 = "Please choose which gate you are going to enter from";
        setup.innerHTML = "<h1> " + q4 + " </h1>" + document.getElementById("gateselection").innerHTML;
    } else if (q == "3" && response == "1") {
        let q5 = "Please choose which gate you entered from";
        setup.innerHTML = "<h1> " + q5 + " </h1>" + document.getElementById("gateselection").innerHTML;
    } else if (q == "4" && response == "1") {
        let a2 = "Your settings has been saved. Click any building in the map to see the path.";
        setup.innerHTML =
            "<div class='q'><h1> " +
            a2 +
            " </h1>" +
            "<input type='button' value='See Map' onclick='window.location.reload();saveInitialSettings(false);' />";
        localStorage.setItem("setupdone", "true");
    }
}

var currentBuildingIndex = null;
function notes(action) {
    if (action == 1) {
        // assign the map data to newData
        let newData = MapData;

        // TO DO: Sanitize user input. But yea only them will be affected.
        // modify the property with the text input by the user
        newData["Structures"][currentBuildingIndex].text = document.getElementById("text").value;

        // save new map data in LS
        localStorage.setItem("MapData", JSON.stringify(newData));

        // load new data
        let newMapObj = localStorage.getItem("MapData");
        let parsedNewObj = JSON.parse(newMapObj);
        data = parsedNewObj;
    }
}

var b1 = "Initial1";
var b2 = "Initial2";
var gate = "MainGate";
var building = "";

// the actions of the three modes are controlled by this function
function doActivity(destinationName, detailID) {
    let array = Paths["Paths"];
    let beforepoints = document.getElementsByClassName("point")[0];

    // removes previous paths
    try {
        let poly = document.getElementsByClassName("buildingpath");
        for (let i = 0; i < poly.length; ++i) {
            poly[i].parentNode.removeChild(poly[i]);
        }
    } catch (e) {}

    // removes previous gate-2-b paths
    try {
        document.getElementsByClassName("gatepath")[0].remove();
    } catch (e) {}

    // reset b1/b2 class attribute to default [when mode changed]
    try {
        document.getElementById(b1).setAttribute("class", "Building");
        document.getElementById(b2).setAttribute("class", "Building");
    } catch (e) {}

    // reset textarea display [when mode changed]
    try {
        document.getElementById("textcontainer").removeAttribute("style");
    } catch (e) {}

    // reset when mode is changed
    if (!showpathsactive) {
        b1 = "Initial1";
        b2 = "Initial2";
    }

    // reset display of content div
    document.getElementById("content").removeAttribute("style");

    // reset current building used in notes in mode change
    currentBuildingIndex = null;

    // reset class used by points
    document.getElementById("details").removeAttribute("class");

    // Mode: Building Details
    if (showdetailsactive) {
        //show details
        let detailBox = document.getElementById("details");
        let buildingName = MapData["Structures"][detailID].displayname;
        detailBox.childNodes[1].innerHTML = '<span class="building">' + buildingName + "</span>";
        document.getElementById("content").setAttribute("style", "display: none;");

        // notes and description
        let desc = MapData["Structures"][detailID].description;
        let notes = MapData["Structures"][detailID].text;
        document.getElementById("textcontainer").childNodes[1].value = notes;
        document.getElementById("textcontainer").childNodes[3].value = desc;

        document.getElementById("textcontainer").setAttribute("style", "display: block");
        detailBox.setAttribute("style", "display: block");
        currentBuildingIndex = detailID;

        return false;
    }

    // Mode: Gate-to-Building Paths
    if (showBuildingPathsActive) {
        building = destinationName;
        for (let i = 0; i < array.length; ++i) {
            let pair = array[i].pair;
            let direction = "";
            if (pair.indexOf(gate) >= 0 && pair.indexOf(building) >= 0) {
                if (pair.indexOf(gate) < pair.indexOf(building)) {
                    // default
                    direction = "reverse";
                } else {
                    direction = "normal";
                }

                let element =
                    '<polyline style="animation-direction:' +
                    direction +
                    ';" points="' +
                    array[i].points +
                    '" name="' +
                    array[i].pair +
                    '" class="gatepath"></polyline>';
                document.getElementById(mainSVG).insertBefore(parseSVG(element), beforepoints);
            }
        }

        return false;
    }

    // Mode: Building-to-Building Paths
    b1 = b2;
    b2 = destinationName;

    // add class to building to highlight them via css
    try {
        document.getElementById(b1).setAttribute("class", "Building selected");
    } catch (e) {}

    try {
        document.getElementById(b2).setAttribute("class", "Building selected");
    } catch (e) {}

    // remove highlight when same building is clicked twice
    if (b1 == b2) {
        try {
            document.getElementById(b1).setAttribute("class", "Building");
        } catch (e) {}

        try {
            document.getElementById(b2).setAttribute("class", "Building");
        } catch (e) {}

        b1 = "Initial1";
        b2 = "Initial2";
    }

    for (let i = 0; i < array.length; ++i) {
        let pair = array[i].pair;
        let direction = "";

        // alternates disabled in if-statement
        if (pair.indexOf(b1) >= 0 && pair.indexOf(b2) >= 0 && b1 !== b2 && !showBuildingPathsActive && array[i].type != "alternate") {
            // check path animation direction
            // if animation direction is wrong, just interchange the order of the pair buildings in the json file
            if (pair.indexOf(b1) < pair.indexOf(b2)) {
                // default arrangement in JSON
                direction = "reverse";
            } else {
                direction = "normal";
            }

            // path of b-2-b
            let element =
                '<polyline style="animation-direction:' +
                direction +
                ';" points="' +
                array[i].points +
                '" name="' +
                array[i].pair +
                '" class="buildingpath"></polyline>';
            document.getElementById(mainSVG).insertBefore(parseSVG(element), beforepoints);
        }
    }
}

// used by switchActive
var showpathsactive = true;
var showdetailsactive = false;
var showBuildingPathsActive = false;

// function used when switching modes
function switchActiveMode(num) {
    let select = document.getElementById("active");
    let status = select.options[select.selectedIndex].value;
    document.getElementById("gates").setAttribute("disabled", "disabled");

    if (status == "0") {
        showpathsactive = true;
        showdetailsactive = false;
        showBuildingPathsActive = false;
    } else if (status == "1") {
        showpathsactive = false;
        showdetailsactive = false;
        showBuildingPathsActive = true;
        document.getElementById("gates").removeAttribute("disabled");
    } else if (status == "2") {
        showpathsactive = false;
        showdetailsactive = true;
        showBuildingPathsActive = false;
    }
}

// function used when switching gates [in gate-to-building mode]
function changeGate() {
    let select = document.getElementById("gates");
    gate = select.options[select.selectedIndex].value;
}

// these are resets needed by POI and entry/exit points functions
function resetElements() {
    // reset display of content div (make it visible again)
    document.getElementById("content").removeAttribute("style");

    // reset textarea display when clicking entry points
    document.getElementById("textcontainer").removeAttribute("style");

    // reset previous entry point's class to remove css animation
    try {
        document.getElementsByClassName("currentpoint")[0].removeAttribute("class");
    } catch (e) {
        // alert(e);
    }
}

var interestPoints = true;
// used by the checkbox that enables/disables entry points
function interestPointsInteraction() {
    var bldgSelect = document.getElementById("filterbldg");
    var flrSelect = document.getElementById("filterfloor");
    var rmSelect = document.getElementById("filterroom");
    //var detailsChecked = document.getElementById("entry").checked;
    if (interestPoints == true) {
        // when unchecked
        interestPoints = false;
        bldgSelect.setAttribute("disabled", "true");
        flrSelect.setAttribute("disabled", "true");
        rmSelect.setAttribute("disabled", "true");
    } else {
        // when checked
        interestPoints = true;
        bldgSelect.removeAttribute("disabled");
        flrSelect.removeAttribute("disabled");
        rmSelect.removeAttribute("disabled");
    }
}

function pointOfEntryDetails(point, location) {
    if (!entryPoints)
        // because this is activated based on a checkbox, not a mode
        return false;

    resetElements();

    // highlight the new current point
    document.getElementById(point).setAttribute("class", "currentpoint");

    // show the details of the point
    document.getElementById("head").innerHTML = "Entry Point";
    document.getElementById("content").innerHTML = "<h3 class='entry'>" + point.replace(/<single>/g, "'").split("] ")[1] + "</h3>";
    document.getElementById("details").setAttribute("style", "display: block");
    document.getElementById("details").setAttribute("class", "point");
}

var entryPoints = true;
function entryPointsInteraction() {
    if (entryPoints == true) {
        // when unchecked
        entryPoints = false;
    } else {
        // when checked
        entryPoints = true;
    }
}

// display POI information when a point is clicked
function pointOfInterestDetails(num, arrayIndex) {
    resetElements();

    var content = "";
    var obj = PointsOfInterest["Points"][num];

    if (obj.type == "multiple" || obj.type == "multiple_similar") {
        // multi entries (array type)
        var innerFloor = obj.floor[arrayIndex];
        content += "<h3>" + innerFloor.floor + " Floor</h3>";

        var nameContent = innerFloor.name;
        var newText = "";

        if (nameContent.indexOf("|") >= 0) {
            // multiple items in the same floor
            newText = nameContent.split("|");
            for (c = 0; c < newText.length; c++) {
                content += "<p class='list'>" + newText[c] + "</p>";
            }
        } else {
            content += "<p id='pointName'>" + nameContent + "</p>";
        }
    } else {
        // single item in one point
        var nameContent = obj.pointname;
        var newText = "";

        // header
        content += "<h3>" + obj.floor + " Floor</h3>";

        if (nameContent.indexOf("|") >= 0) {
            // multiple items in the same floor
            newText = nameContent.split("|");
            for (c = 0; c < newText.length; c++) {
                content += "<p class='list'>" + newText[c] + "</p>";
            }
        } else {
            content += "<p id='pointName'>" + nameContent + "</p>";
        }
    }

    // show the details of the point
    document.getElementById("head").innerHTML = "Point Details";
    document.getElementById("content").innerHTML = content;
    document.getElementById("details").setAttribute("style", "display: block");
    document.getElementById("details").setAttribute("class", "point");
}

// used by filterPoints
var buildingFilter = 0;
var floorFilter = 0;
var roomFilter = 0;

// function used to filter the points of interests
function filterPoints() {
    // rehide/hide all
    let allPoints = document.getElementsByClassName("interestpoint");
    for (let i = 0; i < allPoints.length; ++i) {
        allPoints[i].removeAttribute("style");
    }

    if (!interestPoints) {
        // hide all if points are disabled
        allPoints = document.getElementsByClassName("interestpoint");
        for (let i = 0; i < allPoints.length; ++i) {
            // rehide/hide all
            allPoints[u].removeAttribute("style");
        }
    } else {
        // show filtered points
        let filterClass =
            "interestpoint " +
            PointsOfInterest["BuildingFilters"][buildingFilter].keyword +
            " " +
            PointsOfInterest["FloorFilters"][floorFilter].keyword +
            " " +
            PointsOfInterest["RoomFilters"][roomFilter].keyword;

        let selected = document.getElementsByClassName(filterClass);
        for (let i = 0; i < selected.length; ++i) {
            // show selected by filter all
            selected[i].setAttribute("style", "display: block");
        }
    }
}

var currentZoom = 100;
// function used to zoom in/out the map
function magnify(action) {
    var zoomLevelText = document.getElementById("zoom");

    if (action == true && currentZoom < 300) {
        currentZoom += 25;
        zoomLevelText.value = currentZoom + "%";
        document.getElementById("mapcontainer").setAttribute("style", "zoom: " + currentZoom / 100 + ";");
    } else if (action == false && currentZoom > 50) {
        currentZoom -= 25;
        zoomLevelText.value = currentZoom + "%";
        document.getElementById("mapcontainer").setAttribute("style", "zoom: " + currentZoom / 100 + ";");
    }

    saveSettings();
}

function changeEntryPointDisplayStatus() {
    var allPoints = document.getElementsByClassName("entrypoint");
    if (entryPoints == false) {
        for (d = 0; d < allPoints.length; d++) {
            allPoints[d].setAttribute("style", "display: none;");
        }
    } else {
        for (d = 0; d < allPoints.length; d++) {
            allPoints[d].removeAttribute("style");
        }
    }
}

function showSettings() {
    document.getElementById("options").setAttribute("style", "display: block;");
}

function saveSettings() {
    var mode = document.getElementById("active");
    var gate = document.getElementById("gates");
    var entry = document.getElementById("entry");
    var filter = document.getElementById("filter");

    changeEntryPointDisplayStatus();

    // filter the points after saving the settings
    filterPoints();

    var zoom = currentZoom;
    var settings =
        '{ "Settings":{ "mode":"' +
        mode.selectedIndex +
        '", "gate":"' +
        gate.selectedIndex +
        '", "entry":' +
        entry.checked +
        ', "zoom":' +
        zoom +
        ', "filter":' +
        filter.checked +
        "," +
        '"bfilter":"' +
        buildingFilter +
        '",' +
        '"ffilter":"' +
        floorFilter +
        '",' +
        '"rfilter":"' +
        roomFilter +
        '"' +
        " } }";
    localStorage.setItem("settings", JSON.stringify(settings));
}

function loadSettings() {
    var settings = "";
    try {
        // try to load settings if found in LS
        try {
            settings = localStorage.getItem("settings");
            settings = JSON.parse(settings);
            eval("settings = " + settings);
        } catch (e) {
            settings = localStorage.getItem("settings");
            settings = JSON.parse(settings);
        }

        // load the previous mode
        document.getElementById("active").selectedIndex = settings["Settings"].mode;
        switchActiveMode();

        // load the previous gate
        document.getElementById("gates").selectedIndex = settings["Settings"].gate;
        changeGate();

        // load the previous status whether the filter is checked or not
        document.getElementById("filter").checked = settings["Settings"].filter;

        interestPoints = settings["Settings"].filter; // true/false

        buildingFilter = settings["Settings"].bfilter;
        floorFilter = settings["Settings"].ffilter;
        roomFilter = settings["Settings"].rfilter;

        var bldgSelect = document.getElementById("filterbldg");
        var flrSelect = document.getElementById("filterfloor");
        var rmSelect = document.getElementById("filterroom");

        bldgSelect.selectedIndex = buildingFilter;
        flrSelect.selectedIndex = floorFilter;
        rmSelect.selectedIndex = roomFilter;

        if (interestPoints) {
            bldgSelect.removeAttribute("disabled");
            flrSelect.removeAttribute("disabled");
            rmSelect.removeAttribute("disabled");
        } else {
            bldgSelect.setAttribute("disabled", "true");
            flrSelect.setAttribute("disabled", "true");
            rmSelect.setAttribute("disabled", "true");
        }

        filterPoints();

        // load the previous status whether the entry details is checked or not
        document.getElementById("entry").checked = settings["Settings"].entry;
        entryPoints = settings["Settings"].entry;
        changeEntryPointDisplayStatus();

        //load the previous zoom level
        document.getElementById("mapcontainer").setAttribute("style", "zoom: " + settings["Settings"].zoom / 100 + ";");
        document.getElementById("zoom").value = settings["Settings"].zoom + "%";
        currentZoom = settings["Settings"].zoom;

        magnify("do nothing");
    } catch (e) {
        // no saved settings yet
    }
}
