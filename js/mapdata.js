function storeDataInLS(localID) {
    if (localStorage.getItem(localID) == undefined) {
        // needs eval to read localID as a variable
        let temp;
        eval("temp = JSON.stringify(" + localID + ")");
        localStorage.setItem(localID, temp);
    }
}

function loadDataFromLS(localID) {
    localData = localStorage.getItem(localID);
    if (localData != "undefined") {
        eval(localID + " = " + localData);
    }
}

let dataSources = ["MapData", "Entries", "Paths", "PointsOfInterest", "Labels"];
let onlineMode = false;
if (!onlineMode) {
    for (let i = 0; i < dataSources.length; ++i) {
        storeDataInLS(dataSources[i]);
    }
}

// this is used to parse svgs
// directly appending them to html elements will work but they will not be rendered
// we use a different namespace
function parseSVG(s) {
    let div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + "</svg>";
    let frag = document.createDocumentFragment();

    while (div.firstChild.firstChild) {
        frag.appendChild(div.firstChild.firstChild);
    }

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
    for (let i = 0; i < buildingsArray.length; ++i) {
        let option = document.createElement("option");
        option.setAttribute("value", buildingsArray[i].keyword);
        option.innerHTML = buildingsArray[i].display;
        bldgSelect.appendChild(option);
    }

    // floors
    for (let i = 0; i < floorsArray.length; ++i) {
        let option = document.createElement("option");
        option.setAttribute("value", floorsArray[i].keyword);
        option.innerHTML = floorsArray[i].display;
        flrSelect.appendChild(option);
    }

    // rooms
    for (let i = 0; i < roomsArray.length; ++i) {
        let option = document.createElement("option");
        option.setAttribute("value", roomsArray[i].keyword);
        option.innerHTML = roomsArray[i].display;
        rmSelect.appendChild(option);
    }
}

function generateGates(gatesArray) {
    let gatesSelect = document.getElementById("gates");
    for (let i = 0; i < gatesArray.length; ++i) {
        let option = document.createElement("option");
        option.setAttribute("value", gatesArray[i].keyword);
        option.innerHTML = gatesArray[i].display;
        gatesSelect.appendChild(option);
    }
}

let mainSVG = "map";
function generateLabels(array) {
    let beforepoints = document.getElementsByClassName("entrypoint")[0];
    for (let i = 0; i < array.length; ++i) {
        let element =
            '<text x="' +
            array[i].x +
            '" y="' +
            array[i].y +
            '"' +
            "onclick=\"doActivity('" +
            array[i].for.split(", ")[0] +
            "','" +
            array[i].for.split(", ")[1] +
            "');\"" +
            '" class="bldglabel">' +
            array[i].name +
            "</text>";
        document.getElementById(mainSVG).insertBefore(parseSVG(element), beforepoints);
    }
}

function generateEntries(array) {
    for (let i = 0; i < array.length; ++i) {
        let rad = "5";
        let element =
            '<a class="entrypoint"><circle id="' +
            array[i]["name"] +
            '" cx="' +
            array[i]["x"] +
            '" cy="' +
            array[i]["y"] +
            '" r="' +
            rad +
            '"  onclick="pointOfEntryDetails(\'' +
            array[i]["name"] +
            "', ' " +
            array[i]["location"] +
            '\')" name="' +
            array[i]["location"] +
            '" /></a>';
        document.getElementById(mainSVG).appendChild(parseSVG(element));
    }
}

function generatePointsOfInterests(array) {
    for (let i = 0; i < array.length; ++i) {
        let arr = array[i]; // this is the general array of the poi json
        if (arr.floor instanceof Array && arr.type == "multiple_similar") {
            // for the multiple typed entries in the json file
            for (let j = 0; j < arr.floor.length; ++j) {
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
                    i +
                    ", " +
                    j +
                    ');" class="' +
                    arr.class +
                    '" /></a>';
                document.getElementById(mainSVG).appendChild(parseSVG(element));
            }
        } else if (arr.floor instanceof Array && arr.type == "multiple") {
            // for the multiple typed entries in the json file
            for (let j = 0; j < arr.floor.length; ++j) {
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
                    i +
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
                i +
                ');" class="' +
                arr.class +
                '" /></a>';
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        }
    }
}

function generateStructures(array) {
    for (let i = 0; i < array.length; ++i) {
        let event = "";
        if (array[i].class.match(/building/gi)) {
            event = "onclick=\"doActivity('" + array[i].name + "','" + i + "')\"";
        }

        if (array[i].type.match(/polygon/g)) {
            let element =
                '<polygon class="' +
                array[i]["class"] +
                '" id="' +
                array[i]["name"] +
                '" points="' +
                array[i]["points"] +
                '" ' +
                event +
                "></polygon>";

            document.getElementById(mainSVG).appendChild(parseSVG(element));
        } else if (array[i].type.match(/ellipse/g)) {
            let element =
                '<ellipse class="' +
                array[i]["class"] +
                '" id="' +
                array[i]["name"] +
                '" cx="' +
                array[i]["cx"] +
                '" cy="' +
                array[i]["cy"] +
                '" rx="' +
                array[i]["rx"] +
                '" ry="' +
                array[i]["ry"] +
                '" transform="' +
                array[i]["transform"] +
                '" />';
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        } else if (array[i].type.match(/path/g)) {
            let element =
                '<path class="' +
                array[i]["class"] +
                '" id="' +
                array[i]["name"] +
                '" d="' +
                array[i]["d"] +
                '" class="' +
                array[i]["class"] +
                '" ' +
                event +
                "/>";
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        } else if (array[i].type.match(/line/g)) {
            let element =
                '<line class="' +
                array[i]["class"] +
                '" id="' +
                array[i]["name"] +
                '" x1="' +
                array[i]["x1"] +
                '" x2="' +
                array[i]["x2"] +
                '" y1="' +
                array[i]["y1"] +
                '" y2="' +
                array[i]["y2"] +
                '" class="' +
                array[i]["class"] +
                '"/>';
            document.getElementById(mainSVG).appendChild(parseSVG(element));
        }
    }
}
