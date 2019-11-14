var PointsOfInterest = {

	"BuildingFilters":[ // keywords = the values for the "building" attributes in the "Points" array
		{"keyword":"", "display":"No Filter"},
		{"keyword":"Perfecto", "display":"Waldo Perfecto"},
		{"keyword":"Silang", "display":"Diego Silang"},
		{"keyword":"DH", "display":"De Haes"},
		{"keyword":"Aden", "display":"Conrad Adenaur"},
		{"keyword":"BernhardGym", "display":"Prince Bernhard Gym"},
		{"keyword":"Vath", "display":"Charles Vath"},
		{"keyword":"Rizal", "display":"Jose P. Rizal"},
		{"keyword":"Hahn", "display":"Otto Hahn"}
	],

	"FloorFilters":[ // keywords = the values for the "floor" attributes in the "Points" array
		{"keyword":"", "display":"No Filter"},
		{"keyword":"1st", "display":"1st Floor"},
		{"keyword":"2nd", "display":"2nd Floor"},
		{"keyword":"3rd", "display":"3rd Floor"},
		{"keyword":"4th", "display":"4th Floor"},
		{"keyword":"5th", "display":"5th Floor"},
		{"keyword":"6th", "display":"6th Floor"},
		{"keyword":"7th", "display":"7th Floor"}
	],

	"RoomFilters": [
		{"keyword":"", "display":"No Filter"},
		{"keyword":"department", "display":"Departments"},
		{"keyword":"faculty", "display":"Faculties"},
		{"keyword":"office", "display":"Offices"},
		{"keyword":"CR", "display":"Comfort Rooms"},
		{"keyword":"lab", "display":"Laboratories"},
		{"keyword":"other", "display":"Miscellaneous"}
	],


	"Points":[
{
		"pointname":"Perfecto Multiple",
		"building":"Perfecto",
		"type":"multiple",
		"floor": [{"floor":"1st","name":"SLU Band Room", "class":"other"},
				  {"floor":"5th","name":"STELA SSC KASAMA Office", "class":"office"},
				  {"floor":"6th","name":"SCIS SSC KASAMA Office", "class":"office"}],
		"x": "345",
		"y": "230",
		"class":""
},
{
		"pointname":"Faculty Room",
		"building":"Perfecto",
		"type":"multiple_similar",
		"floor":[{"floor":"1st", "name":"Faculty Room - Philosophy"},
				 {"floor":"3rd", "name":"Faculty Room - Professional Education"},
				 {"floor":"5th", "name":"Faculty Room - Political Science"}],
		"x": "415",
		"y": "258",
		"class":"faculty"
},
{
		"pointname":"Conference, Faculty, Department Head Office",
		"building":"Perfecto",
		"type":"multiple_similar",
		"floor":[{"floor":"3rd", "name":"Conference Room - STELA"},
				 {"floor":"6th", "name":"Dept. Head's Office and Faculty Room - Psychology"}],
		"x": "381",
		"y": "232",
		"class":"office"
},
{
		"pointname":"STELA GPCS Office",
		"building":"Perfecto",
		"floor":"3rd",
		"x": "374",
		"y": "262",
		"class":"office"
},
{
		"pointname":"Faculty Room - General Education",
		"building":"Perfecto",
		"floor":"3rd",
		"x": "398",
		"y": "247",
		"class":"faculty"
},
{
		"pointname":"Faculty Room - Supervising Instructors",
		"building":"Perfecto",
		"floor":"3rd",
		"x": "434",
		"y": "270",
		"class":"faculty"
},
{
		"pointname":"Dean's Office - STELA",
		"building":"Perfecto",
		"floor":"3rd",
		"x": "422",
		"y": "291",
		"class":"office"
},
{
		"pointname":"STELA URGCS Office",
		"building":"Perfecto",
		"floor":"4th",
		"x": "362",
		"y": "250",
		"class":"office"
},
{
		"pointname":"Department Head Office of Philophy | Department Head Office of Legal Studies | Department Head Office of Theology",
		"building":"Perfecto",
		"floor": "6th",
		"x": "415",
		"y": "258",
		"class":"office"
},
{
		"pointname":"Audio Visual Room",
		"building":"Perfecto",
		"floor":"7th",
		"x": "346",
		"y": "242",
		"class":"other"
},

{
		"pointname":"Female's Comfort Room",
		"building":"Perfecto",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Female's Comfort Room"},
				{"floor":"2nd","name":"Female's Comfort Room"},
				{"floor":"3rd","name":"Female's Comfort Room"},
				{"floor":"4th","name":"Female's Comfort Room"},
				{"floor":"5th","name":"Female's Comfort Room"},
				{"floor":"6th","name":"Female's Comfort Room"},
				{"floor":"7th","name":"Female's Comfort Room"}],
		"x": "455",
		"y": "325",
		"class":"CR"
},

{
		"pointname":"Male's Comfort Room",
		"building":"Perfecto",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Male's Comfort Room"},
				{"floor":"2nd","name":"Male's Comfort Room"},
				{"floor":"3rd","name":"Male's Comfort Room"},
				{"floor":"4th","name":"Male's Comfort Room"},
				{"floor":"5th","name":"Male's Comfort Room"},
				{"floor":"6th","name":"Male's Comfort Room"},
				{"floor":"7th","name":"Male's Comfort Room"}],
		"x": "445",
		"y": "320",
		"class":"CR"
},

{
		"pointname":"Department of Mining Engineering",
		"building":"Aden",
		"floor": "3rd",
		"x": "536",
		"y": "524",
		"class":"department"
},
{
		"pointname":"Department of Chemical Engineering",
		"building":"Aden",
		"floor": "3rd",
		"x": "416",
		"y": "446",
		"class":"department"
},
{
		"pointname":"Faculty Room - Chemical Engineering",
		"building":"Aden",
		"floor": "3rd",
		"x": "428",
		"y": "440",
		"class":"faculty"
},
{
		"pointname":"Chemistry Laboratory Office / Equipment and Work Room",
		"building":"Aden",
		"type":"multiple",
		"floor": [{"floor":"1st", "name":"Equipment and Work Room",	"class":"other"},
				  {"floor":"3rd", "name":"Chemistry Laboratory Office",	"class":"office"}],
		"x": "564",
		"y": "472",
		"class":""
},
{
		"pointname":"Laboratory Technician Office",
		"building":"Aden",
		"floor": "1st",
		"x": "436",
		"y": "448",
		"class":"office"
},
{
		"pointname":"Faculty Room - Physics",
		"building":"Aden",
		"floor": "2nd",
		"x": "429",
		"y": "449",
		"class":"faculty"
},

{
		"pointname":"Male's Comfort Room",
		"building":"Aden",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Male's Comfort Room"},
				{"floor":"2nd","name":"Male's Comfort Room"},
				{"floor":"3rd","name":"Male's Comfort Room"}],
		"x": "520",
		"y": "506",
		"class":"CR"
},

{
		"pointname":"Female's Comfort Room",
		"building":"Aden",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Female's Comfort Room"},
				{"floor":"2nd","name":"Female's Comfort Room"},
				{"floor":"3rd","name":"Female's Comfort Room"}],
		"x": "538",
		"y": "468",
		"class":"CR"
},


{
		"pointname": "Conference Room - Silang" ,
		"building": "Silang",
		"x": "310",
		"y": "295",
		"floor": "3rd",
		"class": "other",
},
{
		"pointname": "ICT Research Laboratory",
		"building": "Silang",
		"floor": "3rd",
		"x": "324",
		"y": "299",
		"class": "lab"
},
{
		"pointname": "Students Affairs Office",
		"building": "Silang",
		"floor": "3rd",
		"x": "256",
		"y": "308",
		"class": "office"

},
{
		"pointname": "Faculty Room - CAD",
		"building": "Silang",
		"floor": "3rd",
		"x": "354",
		"y": "316",
		"class": "faculty"
},
{
		"pointname": "Faculty Room - Mathematics",
		"building": "Silang",
		"floor": "3rd",
		"x": "365",
		"y": "323",
		"class": "faculty"
},
{
		"pointname": "Dean's Office - SCIS",
		"building": "Silang",
		"floor": "3rd",
		"x": "337",
		"y": "347",
		"class": "office"
},
{
		"pointname": "Registrar's Office",
		"building": "Silang",
		"floor": "2nd",
		"x": "272",
		"y": "358",
		"class": "office"
},
{
		"pointname": "Accounting Office",
		"building": "Silang",
		"floor": "2nd",
		"x": "368",
		"y": "349",
		"class": "office"
},
{
		"pointname": "Silang Canteen",
		"building": "Silang",
		"floor": "2nd",
		"x": "389",
		"y": "360",
		"class": "other"
},
{
		"pointname": "ATM Machine",
		"building": "Silang",
		"floor": "2nd",
		"x": "284",
		"y": "339",
		"class": "other"
},
{
		"pointname": "Security Guards Office",
		"building": "Silang",
		"floor": "2nd",
		"x": "291",
		"y": "318",
		"class": "office"
},
{
		"pointname": "Post Office",
		"building": "Silang",
		"floor": "2nd",
		"x": "332",
		"y": "341",
		"class": "office"
},
{
		"pointname": "Medical Clinic",
		"building": "Silang",
		"floor": "2nd",
		"x": "345",
		"y": "312",
		"class": "other"
},
{
		"pointname": "Dental Clinic",
		"building": "Silang",
		"floor": "2nd",
		"x": "366",
		"y": "325",
		"class": "other"
},
{
		"pointname": "Faculty Room - SON",
		"building": "Silang",
		"floor": "5th",
		"x": "259",
		"y": "315",
		"class": "faculty"
},

{
		"pointname":"Comfort Rooms",
		"building":"Silang",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Female's Comfort Room"},
				{"floor":"2nd","name":"Male's Comfort Room"},
				{"floor":"3rd","name":"Female's Comfort Room"},
				{"floor":"4th","name":"Male's Comfort Room"},
				{"floor":"5th","name":"Female's Comfort Room"}],
		"x": "186",
		"y": "451",
		"class":"CR"
},

{
		"pointname":"Comfort Rooms",
		"building":"Silang",
		"type":"multiple_similar",
		"floor": [
				{"floor":"2nd","name":"Male's Comfort Room"},
				{"floor":"3rd","name":"Female's Comfort Room"},
				{"floor":"4th","name":"Male's Comfort Room"},
				{"floor":"5th","name":"Female's Comfort Room"}],
		"x": "393",
		"y": "370",
		"class":"CR"
},


{
		"pointname":"Faculty Room",
		"building":"DH",
		"type":"multiple_similar",
		"floor": [{"floor":"4th","name":"Faculty Room 1 - Physical Education"},
				  {"floor":"5th","name":"Faculty Room 2 - Physical Education"}],
		"x": "258",
		"y": "150",
		"class":"faculty"
},
{
		"pointname": "Fitness Gym",
		"building": "DH",
		"floor": "1st",
		"x": "250",
		"y": "140",
		"class": "other"
},

{
		"pointname":"Comfort Rooms",
		"building":"DH",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Female's Comfort Room"},
				{"floor":"2nd","name":"Male's Comfort Room"},
				{"floor":"3rd","name":"Female's Comfort Room"},
				{"floor":"4th","name":"Male's Comfort Room"}],
		"x": "270",
		"y": "179",
		"class":"CR"
},

{
		"pointname": "Clinical Laboratory",
		"building": "Rizal",
		"floor": "1st",
		"x": "412",
		"y": "562",
		"class": "lab"
},
{
		"pointname": "Department Head's Office - SNS",
		"building": "Rizal",
		"floor": "2nd",
		"x": "433",
		"y": "590",
		"class": "office"
},
{
		"pointname": "Laboratory Technician's Office",
		"building": "Rizal",
		"floor": "2nd",
		"x": "453",
		"y": "605",
		"class": "office"
},
{
		"pointname": "X Ray Laboratory Room",
		"building": "Rizal",
		"floor": "3rd",
		"x": "452",
		"y": "611",
		"class": "office"
},
{
		"pointname": "Faculty Room - SNS",
		"building": "Rizal",
		"floor": "3rd",
		"x": "444",
		"y": "586",
		"class": "faculty"
},
{
		"pointname": "Audio Visual Room",
		"building": "Rizal",
		"floor": "3rd",
		"x": "393",
		"y": "563",
		"class": "other"
},
{
		"pointname": "College of Medicine International Division",
		"building": "Rizal",
		"floor": "4th",
		"x": "400",
		"y": "569",
		"class": "other"
},
{
		"pointname": "Dean's Office - SNS",
		"building": "Rizal",
		"floor": "4th",
		"x": "445",
		"y": "573",
		"class": "office"
},
{
		"pointname": "Serology / Blood Bank",
		"building": "Rizal",
		"floor": "4th",
		"x": "425",
		"y": "567",
		"class": "other"
},
{
		"pointname": "Dean's Office - SOM",
		"building": "Rizal",
		"floor": "5th",
		"x": "401",
		"y": "577",
		"class": "office"
},
{
		"pointname": "Instrument Room",
		"building": "Rizal",
		"floor": "6th",
		"x": "396",
		"y": "557",
		"class": "other"
},
{
		"pointname": "Laboratory Technician's Office",
		"building": "Rizal",
		"floor": "6th",
		"x": "444",
		"y": "599",
		"class": "office"
},

{
		"pointname":"Male's Comfort Room",
		"building":"Rizal",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Male's Comfort Room"},
				{"floor":"2nd","name":"Male's Comfort Room"},
				{"floor":"3rd","name":"Male's Comfort Room"},
				{"floor":"4th","name":"Male's Comfort Room"},
				{"floor":"5th","name":"Male's Comfort Room"},
				{"floor":"6th","name":"Male's Comfort Room"}],
		"x": "459",
		"y": "619",
		"class":"CR"
},

{
		"pointname":"Female's Comfort Room",
		"building":"Rizal",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Female's Comfort Room"},
				{"floor":"2nd","name":"Female's Comfort Room"},
				{"floor":"3rd","name":"Female's Comfort Room"},
				{"floor":"4th","name":"Female's Comfort Room"},
				{"floor":"5th","name":"Female's Comfort Room"},
				{"floor":"6th","name":"Female's Comfort Room"}],
		"x": "472",
		"y": "602",
		"class":"CR"
},

{
		"pointname": "Office of the President",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "138",
		"y": "561",
		"class": "office"
},
{
		"pointname": "Office of the VP for Administration",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "119",
		"y": "612",
		"class": "office"
},
{
		"pointname": "Advisory Board Room",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "126",
		"y": "590",
		"class": "other"
},
{
		"pointname": "Legal Office",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "119",
		"y": "635",
		"class": "office"
},
{
		"pointname": "Alejandro Roces Board Room",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "169",
		"y": "584",
		"class": "other"
},
{
		"pointname": "Reception Room",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "140",
		"y": "540",
		"class": "other"
},
{
		"pointname": "Men's Comfort Room",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "194",
		"y": "578",
		"class": "CR"
},
{
		"pointname": "Female's Comfort Room",
		"building": "BernhardGym",
		"floor": "1st",
		"x": "192",
		"y": "563",
		"class": "CR"
},
{
		"pointname": "Human Resources Development Office",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "152",
		"y": "554",
		"class": "office"
},
{
		"pointname": "Office of the Institutional Development and Quality Assurance",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "178",
		"y": "562",
		"class": "office"
},
{
		"pointname": "Research and Extension Office",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "188",
		"y": "562",
		"class": "office"
},
{
		"pointname": "Information Technology Center",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "193",
		"y": "581",
		"class": "other"
},
{
		"pointname": "Burgos Conference Room",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "146",
		"y": "558",
		"class": "other"
},
{
		"pointname": "Burgos Conference Room",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "132",
		"y": "583",
		"class": "other"
},
{
		"pointname": "Office of the VP for Academic Affairs",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "127",
		"y": "590",
		"class": "office"
},
{
		"pointname": "Male's Comfort Room",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "112",
		"y": "598",
		"class": "CR"
},
{
		"pointname": "Female's Comfort Room",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "118",
		"y": "613",
		"class": "CR"
},
{
		"pointname": "Office for Linkages and Exchange Programmes | Liaison Office for Alumni Affairs",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "120",
		"y": "627",
		"class": "office"
},
{
		"pointname": "I.T. Center for Software Development",
		"building": "BernhardGym",
		"floor": "2nd",
		"x": "137",
		"y": "632",
		"class": "other"
},
{
		"pointname": "Athletics Directors Office",
		"building": "BernhardGym",
		"floor": "3rd",
		"x": "109",
		"y": "598",
		"class": "office"
},
{
		"pointname": "Coaches Room",
		"building": "BernhardGym",
		"floor": "3rd",
		"x": "116",
		"y": "582",
		"class": "other"
},
{
		"pointname": "Male's Comfort Room",
		"building": "BernhardGym",
		"floor": "3rd",
		"x": "197",
		"y": "593",
		"class": "CR"
},
{
		"pointname": "Female's Comfort Room",
		"building": "BernhardGym",
		"floor": "3rd",
		"x": "185",
		"y": "627",
		"class": "CR"
},


{
		"pointname":"Multi-Media Library | Filipiniana Library",
		"building":"Vath",
		"floor": "4th",
		"x": "276",
		"y": "642",
		"class":"other"
},
{
		"pointname":"Philosophy/Psychology/Language/Pure Science/History/Geography Library",
		"building":"Vath",
		"type":"multiple_similar",
		"floor":[{"floor":"5th", "name":"Philosophy and Psychology Library | Language Library | Pure Science Library"},
				 {"floor":"6th", "name":"History / Geography Library"}],
		"x": "244",
		"y": "633",
		"class":"other"
},
{
		"pointname":"Religion/Applied Science Library",
		"building":"Vath",
		"type":"multiple_similar",
		"floor":[{"floor":"5th", "name":"Religion Library"},
				 {"floor":"6th", "name":"Applied Science Library"}],
		"x": "272",
		"y": "650",
		"class":"other"
},
{
		"pointname":"Social Sciences/Arts/Allied Sciences Library",
		"building":"Vath",
		"type":"multiple_similar",
		"floor":[{"floor":"5th", "name":"Social Sciences Library"},
				 {"floor":"6th", "name":"Arts/Allied Sciences Library"}],
		"x": "326",
		"y": "556",
		"class":"other"
},

{
		"pointname":"Female's Comfort Room",
		"building":"Vath",
		"type":"multiple_similar",
		"floor": [
				{"floor":"4th","name":"Female's Comfort Room"},
				{"floor":"5th","name":"Female's Comfort Room"},
				{"floor":"6th","name":"Female's Comfort Room"}],
		"x": "316",
		"y": "510",
		"class":"CR"
},

{
		"pointname":"Male's Comfort Room",
		"building":"Vath",
		"type":"multiple_similar",
		"floor": [
				{"floor":"4th","name":"Male's Comfort Room"},
				{"floor":"5th","name":"Male's Comfort Room"},
				{"floor":"6th","name":"Male's Comfort Room"}],
		"x": "228",
		"y": "666",
		"class":"CR"
},

{
        "pointname": "Ice Plant Room",
        "building": "Hahn",
        "floor": "1st",
        "x": "559",
        "y": "655",
        "class": "other"
},
{
        "pointname": "Foundry Room",
        "building": "Hahn",
        "type":"multiple",
        "floor": [{"floor":"1st", "name":"Foundry Room", "class": "other"},
        		  {"floor":"2nd", "name":"Mechanical Shop", "class": "other"},
        		  {"floor":"3rd", "name":"Electronics Department Laboratory", "class": "lab"},
        		  {"floor":"4th", "name":"Soil and Material Laboratory", "class": "lab"}],
        "x": "519",
        "y": "693",
        "class": ""
},
{
        "pointname": "Materials Testing Laboratory/Electronics Engineering Faculty Room",
        "building": "Hahn",
        "type":"multiple",
        "floor": [{"floor":"1st", "name":"Materials Testing Laboratory", "class": "lab"},
        		  {"floor":"3rd", "name":"Faculty Room - Electronics Engineering", "class": "faculty"},
        		  {"floor":"4th", "name":"Materials Testing Laboratory Office", "class": "office"}],
        "x": "505",
        "y": "721",
        "class": ""
},
{
        "pointname": "Boiler/Drafting Room",
        "building": "Hahn",
        "type":"multiple_similar",
        "floor": [{"floor":"1st", "name":"Boiler Room"},
        		  {"floor":"2nd", "name":"Drafting Room"}],
        "x": "492",
        "y": "748",
        "class": "other"
},
{
        "pointname": "Faculty Room and Organization Room Right",
        "building": "Hahn",
        "type":"multiple",
        "floor": [{"floor":"1st", "name":"Faculty Room - Civil/Geodetic Engineering", "class": "faculty"},
				  {"floor":"2nd", "name":"Faculty Room - Mechanical Engineering", "class": "faculty"},
				  {"floor":"3rd", "name":"Faculty Room - Electrical Engineering", "class": "faculty"},
				  {"floor":"4th", "name":"Buttress Office", "class": "office"},
        		  {"floor":"5th", "name":"School of Engineering and Architecture Honor Society", "class": "other"},
        		  {"floor":"6th", "name":"Philippine Institute of Industrial Engineering", "class": "other"},
        		  {"floor":"7th", "name":"United Architects of the Philippine Student Auxilliary", "class": "other"}],
        "x": "472",
        "y": "765",
        "class": ""
},
{
        "pointname": "Mechanical and Mechatronice Engineering Department",
        "building": "Hahn",
        "floor": "2nd",
        "x": "509",
        "y": "732",
        "class": "department"
},
{
        "pointname": "Digital Signal Processing Laboratory",
        "building": "Hahn",
        "floor": "2nd",
        "x": "482",
        "y": "750",
        "class": "lab"
},
{
        "pointname": "Electrical Engineering Laboratory Office",
        "building": "Hahn",
        "floor": "2nd",
        "x": "540",
        "y": "649",
        "class": "office"
},
{
        "pointname": "Faculty Room and Organization Room",
        "building": "Hahn",
        "type":"multiple",
        "floor": [{"floor":"1st", "name":"Mechanical Engineering Office", "class": "office"},
        		  {"floor":"2nd", "name":"Faculty Room - Mechanical Engineering", "class": "faculty"},
        		  {"floor":"3rd", "name":"Faculty Room - Electronics Engineering", "class": "faculty"},
        		  {"floor":"4th", "name":"Philippine Institute of Civil Engineering", "class": "other"}],
        "x": "561",
        "y": "616",
        "class": ""
},
{
        "pointname": "Hydraulics Room",
        "building": "Hahn",
        "floor": "4th",
        "x": "541",
        "y": "633",
        "class": "other"
},
{
        "pointname": "Faculty Room - Civil Engineering",
        "building": "Hahn",
        "floor": "4th",
        "x": "554",
        "y": "607",
        "class": "faculty"
},
{
        "pointname": "Faculty Room - Civil Engineering",
        "building": "Hahn",
        "floor": "4th",
        "x": "457",
        "y": "765",
        "class": "faculty"
},
{
        "pointname": "Research and Development Room",
        "building": "Hahn",
        "floor": "5th",
        "x": "531",
        "y": "643",
        "class": "office"
},
{
        "pointname": "Computer Application Department",
        "building": "Hahn",
        "floor": "5th",
        "x": "457",
        "y": "765",
        "class": "department"
},
{
        "pointname": "Dean's Office - SEA",
        "building": "Hahn",
        "floor": "5th",
        "x": "502",
        "y": "692",
        "class": "office"
},
{
        "pointname": "Engineering Urban Planning Research Laboratory",
        "building": "Hahn",
        "floor": "5th",
        "x": "467",
        "y": "747",
        "class": "lab"
},
{
        "pointname": "Audio Visual Room",
        "building": "Hahn",
        "floor": "5th",
        "x": "481",
        "y": "721",
        "class": "other"
},
{
        "pointname": "Faculty Room - Industrial Engineering",
        "building": "Hahn",
        "floor": "6th",
        "x": "513",
        "y": "728",
        "class":"faculty"
},
{
        "pointname": "Methods of Ergonomics Laboratory - Industrial Engineering",
        "building": "Hahn",
        "floor": "6th",
        "x": "500",
        "y": "746",
        "class":"lab"
},
{
        "pointname": "Faculty Room - Architecture",
        "building": "Hahn",
        "floor": "7th",
        "x": "492",
        "y": "712",
        "class":"faculty"
},
{
        "pointname": "Architecture Department",
        "building": "Hahn",
        "floor": "7th",
        "x": "513",
        "y": "677",
        "class":"department"
},
{
        "pointname": "Faculty Room - Architecture",
        "building": "Hahn",
        "floor": "8th",
        "x": "563",
        "y": "623",
        "class":"faculty"
},

{
		"pointname":"Male's Comfort Room",
		"building":"Hahn",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Male's Comfort Room"},
				{"floor":"2nd","name":"Male's Comfort Room"},
				{"floor":"3rd","name":"Male's Comfort Room"},
				{"floor":"4th","name":"Male's Comfort Room"},
				{"floor":"5th","name":"Male's Comfort Room"},
				{"floor":"6th","name":"Male's Comfort Room"}],
		"x": "485",
		"y": "780",
		"class":"CR"
},

{
		"pointname":"Female's Comfort Room",
		"building":"Hahn",
		"type":"multiple_similar",
		"floor": [
				{"floor":"1st","name":"Female's Comfort Room"},
				{"floor":"2nd","name":"Female's Comfort Room"},
				{"floor":"3rd","name":"Female's Comfort Room"},
				{"floor":"4th","name":"Female's Comfort Room"},
				{"floor":"5th","name":"Female's Comfort Room"},
				{"floor":"6th","name":"Female's Comfort Room"}],
		"x": "572",
		"y": "623",
		"class":"CR"
}
]
};
