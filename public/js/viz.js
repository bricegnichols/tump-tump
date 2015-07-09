// example visualization

//Load the request module
var request = require('request');
var http = require('http');
var fs = require('fs');

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
    //console.log('BODY: ' + chunk);
    console.log(JSON.stringify(chunk['date']));

  });
})

// Another way to access the data, using the request module
// request(dataUrl, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     //console.log(body)
//     var data = JSON.parse(body);
//     console.log(data);
//   }
// });

// Access directly with d3
// d3.json(dataUrl, function(json) {
//     console.log(json);
// });

// Write JSON response directly to disk for now
request(dataUrl).pipe(fs.createWriteStream('data.json'))