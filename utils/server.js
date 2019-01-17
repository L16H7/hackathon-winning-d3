'use strict';

var fs = require('fs');
var obj;
fs.readFile('i3.json', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  fs.readFile('j3.json', function(err, dataj) {
    var jObj = JSON.parse(dataj);

    for (var i = 0; i < obj.length; i++) {
      obj[i].unsafe_non_drinking_water = jObj.filter(function( o ) {
        return o.location == obj[i].location;
      }).unsafe_non_drinking_water;
      // obj[i].unsafe_non_drinking_water_percentage = jObj.unsafe_non_drinking_water_percentage;
    }

    console.log(obj);
    var json = JSON.stringify(obj);
    fs.write("i3_j3.json", json, "utf8");
  }) 
})

// console.log(obj[1]);