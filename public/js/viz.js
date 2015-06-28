// example visualization

//Load the request module
var request = require('request');
var http = require('http');

// Sample API output for a single counter location
var dataUrl = "https://data.seattle.gov/resource/mefu-7eau.json";

// Get the data and print to screen 
http.get({
  hostname: 'data.seattle.gov',
  port: 80,
  path: dataUrl,
  agent: false  // create a new agent just for this one request
}, function (res) {
  //console.log(res.headers);
  res.on('data', function (chunk) {
  	// do something with the json data
    console.log('BODY: ' + chunk);
    //console.log(JSON.stringify(chunk['date']));
  });
})