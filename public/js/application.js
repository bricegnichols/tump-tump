


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

	// Add a marker
	var marker = L.marker([47.61, -122.3]).addTo(map);

	var markerArray =  [[47.61, -122.3], [47.57, -122.361]];
	var arrayLength = markerArray.length;

	for (var i = 0; i < arrayLength; i++) {
		var circle = L.circle(markerArray[i], 500, {
		    color: 'red',
		    fillColor: '#f03',
		    fillOpacity: 0.5
		}).addTo(map);
	};
}

initmap();