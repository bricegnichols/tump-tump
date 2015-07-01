var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

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

	// Add counter location markers
	var markerDict = 	[ {
							'name': 'Ballard',
							'lat': 47.671035,
							'long': -122.384772
						}
						, {
							'name': 'Fremont Bridge',
							'lat': 47.647544,
							'long': -122.349784
						}
						, {
							'name': '39th Ave NE Greenway',
							'lat': 47.673979,
							'long': -122.285820	
						}
						, {
						  	'name': 'Burke-Gilman at NE 70th St.',
							'lat': 47.679505,
							'long': -122.265328
						}
						, {
							'name': 'Elliott Bay Trail',
							'lat': 47.615184,
							'long': -122.355407
						}
						, {
							'name': 'I-90 Trail',
							'lat': 47.590443,
							'long': -122.286351
						}
						, {
							'name': 'S. Spokane St. Bridge',
							'lat': 47.571331,
							'long': -122.351986
						}
						, {
							'name': '26th Sve. SW Greenway',
							'lat': 47.562917,
							'long': -122.365480
						}
						, {
							'name': 'Chief Sealth Trail',
							'lat': 47.527868,
							'long': -122.280981	
						}
						  ]

	// Make marker size a function of zoom...
	markerSize = 500;

	var marker = [];

	for (var i = 0; i < markerDict.length; i++) {
		marker[i] = new L.marker([markerDict[i]['lat'],markerDict[i]['long']], {
		    title: markerDict[i]['name'],
		    opacity: 0.7,
		}).addTo(map).on('click', onClick);
	};
}

// show stats when a location is clicked
 function onClick(e) {

 	// List Counter Name
 	$("div.counterLoc").html(this.options.title);

    // make a fake chart first for testing
	var data = [4, 8, 15, 16, 23, 42];

	var x = d3.scale.linear()
	    .domain([0, d3.max(data)])
	    .range([0, 420]);

    d3.select(".chart")
	  .selectAll("div")
	    .data(data)
	  .enter().append("div")
	    .style("width", function(d) { return x(d) + "px"; })
	    .text(function(d) { return d; });

	// Load in data from an API or local db?

}

// execute the functions
initmap();