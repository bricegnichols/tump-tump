var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

//Load the request module
// var request = require('request');
// var http = require('http');
// var fs = require('fs');

// Add counter location markers
var counterDict = 	{
						'Ballard': {
							'lat': 47.671035,
							'long': -122.384772,
							'endpoint': '47yq-6ugv'
						}, 
						'Fremont Bridge': {
							'lat': 47.647544,
							'long': -122.349784,
							'endpoint': '65db-xm6k'
						},
						'39th Ave NE Greenway': {
							'lat': 47.673979,
							'long': -122.285820,
							'endpoint':	'0'
						},
						'Burke-Gilman at NE 70th St.': {
							'lat': 47.679505,
							'long': -122.265328,
							'endpoint': '0'
						},
						'Elliott Bay Trail': {
							'lat': 47.615184,
							'long': -122.355407,
							'endpoint': '0'
						},
						'I-90 Trail': {
							'lat': 47.590443,
							'long': -122.286351,
							'endpoint': '0'
						},
						'S. Spokane St. Bridge': {
							'lat': 47.571331,
							'long': -122.351986,
							'endpoint': '0'
						},
						'26th Sve. SW Greenway': {
							'lat': 47.562917,
							'long': -122.365480,
							'endpoint': '0'
						},
						'Chief Sealth Trail': {
							'lat': 47.527868,
							'long': -122.280981,
							'endpoint': '0'
						}
				    }

function initmap() {
	// set up the map
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.tileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});		

	// start the map in Seattle
	map.setView(new L.LatLng(47.61, -122.3),10);
	map.addLayer(osm);


	// Make marker size a function of zoom...
	markerSize = 500;

	var marker = [];

	for (var i = 0; i < Object.keys(counterDict).length; i++) {
		marker[i] = new L.marker([counterDict[Object.keys(counterDict)[i]]['lat'],counterDict[Object.keys(counterDict)[i]]['long']], {
		    title: Object.keys(counterDict)[i],
		    opacity: 0.7,
		}).addTo(map).on('click', onClick);
	};
}

// show stats when a location is clicked
function onClick(e) {

 	// List Counter Name
 	$("div.counterLoc").html(this.options.title);

    // Request data for this counter
    getData(this.options.title)

	// Load json data
	data = $.getJSON("public/js/data.json", function(json) {
		// Build a list of counts
		var northData = [];
		var southData = [];
		for (i = 0; i < 900; i++) { 
	        //console.log(data.responseJSON[i]['north']) 
	        northData.push(parseInt(data.responseJSON[i]['north']));
	        southData.push(parseInt(data.responseJSON[i]['south']));
	    };
	    //console.log(northData);

	    // Get the totals
	    var northTotal = 0;
	    for(var i = 0, len = northData.length; i < len; i++) {
	    	northTotal += northData[i];  
		}
		//console.log(northTotal);

		var southTotal = 0;
	    for(var i = 0, len = northData.length; i < len; i++) {
	    	southTotal += northData[i];  
		}
		//console.log(southTotal);

		newData = [northTotal, southTotal, 678, 2938, 3000]

	    // Add the data to the page with D3
	    var x = d3.scale.linear()
	    .domain([0, d3.max(newData)])
	    .range([0, 420]);

	    d3.select(".chart")
		  .selectAll("div")
		    .data(newData)
		  .enter().append("div")
		    .style("width", function(d) { return x(d) + "px"; })
		    .text(function(d) { return d; });
	});
}

function getData(location) {

	// load the latest counter data
	// a separate script should provide create and update the data json/xml data
    // maybe an ajax call to a python (pandas) script that downloads and processes data

	// var dataUrl = "https://data.seattle.gov/resource/mefu-7eau.json";
	//dataUrl = "https://data.seattle.gov/resource/" + counterDict[location]['endpoint']

	//console.log(dataUrl)

	// Get the data and print to screen 
	// http.get({
	//   hostname: 'data.seattle.gov',
	//   port: 80,
	//   path: dataUrl,
	//   agent: false  // create a new agent just for this one request
	// }, function (res) {
	//   //console.log(res.headers);
	//   res.on('data', function (chunk) {
	//   	// do something with the json data
	//     //console.log('BODY: ' + chunk);
	//     console.log(JSON.stringify(chunk['date']));

	//   });
	// });
};

// Get 
//locationEnds = counterDict[]

// execute the functions
initmap();