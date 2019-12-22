function storeDataInLS(localID) {
    if (localStorage.getItem(localID) == undefined) {
        eval('var string = JSON.stringify(' + localID + ')');
        localStorage.setItem(localID, string);
    }
}

function loadDataFromLS(localID) {
    localData = localStorage.getItem(localID);
    if (localData != "undefined") {
        eval(localID + " = " + localData);
    }
}

let dataSources = ["MapData", "Entries", "Paths", "PointsOfInterest", "Labels"];
for (i = 0; i < dataSources.length; ++i) {
    storeDataInLS(dataSources[i]);
}

// this is used to parse svgs
// directly appending them to html elements will work but they will not be rendered
// we use a different namespace
function parseSVG(s) {
    let div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + "</svg>";
    let frag = document.createDocumentFragment();
    while (div.firstChild.firstChild) frag.appendChild(div.firstChild.firstChild);
    return frag;
}

// just resizes the svg code in the index.html based on the map json file
function initializeMainSVG(width, height, id, parentId) {
    let svg = document.getElementById(id);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewbox", "0 0 " + width + " " + height);
}

function generateFilters(buildingsArray, floorsArray, roomsArray) {
    let bldgSelect = document.getElementById("filterbldg");
    let flrSelect = document.getElementById("filterfloor");
    let rmSelect = document.getElementById("filterroom");

    // buildings
    for (z = 0; z < buildingsArray.length; z++) {
        let option = document.createElement("option");
        option.setAttribute("value", buildingsArray[z].keyword);
        option.innerHTML = buildingsArray[z].display;
        //console.log(option);
        bldgSelect.appendChild(option);
    }

    // floors
    for (x = 0; x < floorsArray.length; x++) {
        let option = document.createElement("option");
        option.setAttribute("value", floorsArray[x].keyword);
        option.innerHTML = floorsArray[x].display;
        //console.log(option);
        flrSelect.appendChild(option);
    }

    // rooms
    for (c = 0; c < roomsArray.length; c++) {
        let option = document.createElement("option");
        option.setAttribute("value", roomsArray[c].keyword);
        option.innerHTML = roomsArray[c].display;
        //console.log(option);
        rmSelect.appendChild(option);
    }
}

function generateGates(gatesArray) {
    let gatesSelect = document.getElementById("gates");
    for (e = 0; e < gatesArray.length; e++) {
        let option = document.createElement("option");
        option.setAttribute("value", gatesArray[e].keyword);
        option.innerHTML = gatesArray[e].display;
        //console.log(option);
        gatesSelect.appendChild(option);
    }
}

let mainSVG = "map";
function generateLabels(array) {
    let beforepoints = document.getElementsByClassName("entrypoint")[0];
    for (y = 0; y < array.length; y++) {
        let element =
            '<text x="' +
            array[y].x +
            '" y="' +
            array[y].y +
            '"' +
            "onclick=\"doActivity('" +
            array[y].for.split(", ")[0] +
            "','" +
            array[y].for.split(", ")[1] +
            "');\"" +
            '" class="bldglabel">' +
            array[y].name +
            "</text>";
        document.getElementById(mainSVG).insertBefore(parseSVG(element), beforepoints);
    }
}

function generateEntries(array) {
    for (v = 0; v < array.length; v++) {
        let rad = "5";
        let element =
            '<a class="entrypoint"><circle id="' +
            array[v]["name"] +
            '" cx="' +
            array[v]["x"] +
            '" cy="' +
            array[v]["y"] +
            '" r="' +
            rad +
            '"  onclick="pointOfEntryDetails(\'' +
            array[v]["name"] +
            "', ' " +
            array[v]["location"] +
            '\')" name="' +
            array[v]["location"] +
            '" /></a>';
        document.getElementById(mainSVG).appendChild(parseSVG(element));
    }
}

function generatePointsOfInterests(array) {
    for (v = 0; v < array.length; v++) {
        let arr = array[v]; // this is the general array of the poi json
        if (arr.floor instanceof Array && arr.type == "multiple_similar") {
            // for the multiple typed entries in the json file
            for (j = 0; j < arr.floor.length; j++) {
                let innerArr = arr.floor[j];
                let element =
                    '<a class="interestpoint ' +
                    arr.building +
                    " " +
                    innerArr.floor +
                    " " +
                    arr.class +
                    '"><circle name="' +
                    innerArr.name +
                    '" name="' +
                    arr.pointname +
                    '" cx="' +
                    arr.x +
                    '" cy="' +
                    arr.y +
                    '" onclick="pointOfInterestDetails(' +
                    v +
                    ", " +
                    j +
                    ');" class="' +
                    arr.class +
                    '" /></a>';
                document.getElementById(mainSVG).appendChild(parseSVG(element));
            }
        } else if (arr.floor instanceof Array && arr.type == "multiple") {
            // for the multiple typed entries in the json file
            for (j = 0; j < arr.floor.length; j++) {
                let innerArr = arr.floor[j];
                let element =
                    '<a class="interestpoint ' +
                    arr.building +
                    " " +
                    innerArr.floor +
                    " " +
                    innerArr.class +
                    '"><circle name="' +
                    innerArr.name +
                    '" name="' +
                    arr.pointname +
                    '"   cx="' +
                    arr.x +
                    '" cy="' +
                    arr.y +
                    '" onclick="pointOfInterestDetails(' +
                    v +
                    ", " +
                    j +
                    ');" class="' +
                    arr.class +
                    '" /></a>';
                document.getElementById(mainSVG).appendChild(parseSVG(element));
            }
        } else {
            // for the single entries
            let element =
                '<a class="interestpoint ' +
                arr.building +
                " " +
                arr.floor +
                " " +
                arr.class +
                '"><circle name="' +
                arr.pointname +
                '" name="' +
                arr.pointname +
                '" cx="' +
                arr.x +
                '" cy="' +
                arr.y +
                '" onclick="pointOfInterestDetails(' +
                v +
                ');" class="' +
                arr.class +
                '" /></a>';
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        }
    }
}

function generateStructures(array) {
    for (f = 0; f < array.length; f++) {
        let event = "";
        if (array[f].class.match(/building/gi)) {
            event = "onclick=\"doActivity('" + array[f].name + "','" + f + "')\"";
        }

        if (array[f].type.match(/polygon/g)) {
            let element =
                '<polygon class="' +
                array[f]["class"] +
                '" id="' +
                array[f]["name"] +
                '" points="' +
                array[f]["points"] +
                '" ' +
                event +
                "></polygon>";

            document.getElementById(mainSVG).appendChild(parseSVG(element));
        } else if (array[f].type.match(/ellipse/g)) {
            let element =
                '<ellipse class="' +
                array[f]["class"] +
                '" id="' +
                array[f]["name"] +
                '" cx="' +
                array[f]["cx"] +
                '" cy="' +
                array[f]["cy"] +
                '" rx="' +
                array[f]["rx"] +
                '" ry="' +
                array[f]["ry"] +
                '" transform="' +
                array[f]["transform"] +
                '" />';
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        } else if (array[f].type.match(/path/g)) {
            let element =
                '<path class="' +
                array[f]["class"] +
                '" id="' +
                array[f]["name"] +
                '" d="' +
                array[f]["d"] +
                '" class="' +
                array[f]["class"] +
                '" ' +
                event +
                "/>";
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        } else if (array[f].type.match(/line/g)) {
            let element =
                '<line class="' +
                array[f]["class"] +
                '" id="' +
                array[f]["name"] +
                '" x1="' +
                array[f]["x1"] +
                '" x2="' +
                array[f]["x2"] +
                '" y1="' +
                array[f]["y1"] +
                '" y2="' +
                array[f]["y2"] +
                '" class="' +
                array[f]["class"] +
                '"/>';
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        }
    }
}
