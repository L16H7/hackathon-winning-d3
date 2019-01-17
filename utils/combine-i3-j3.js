"use strict";

var fs = require("fs");
var obj;
var result = [];
fs.readFile("i3_townships.json", function(err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  fs.readFile("j3_townships.json", function(err, dataj) {
    var jObj = JSON.parse(dataj);

    // for (var i = 0; i < obj.length; i++) {
    //   obj[i].unsafe_non_drinking_water = jObj.filter(function( o ) {
    //     return o.location == obj[i].location;
    //   }).unsafe_non_drinking_water;
    //   // obj[i].unsafe_non_drinking_water_percentage = jObj.unsafe_non_drinking_water_percentage;
    // }

    for (var i = 0; i < obj.length; i++) {
    // for (var i = 0; i < 10; i++) {
      var found = jObj.filter(function(o) {
        return o.location === obj[i].location;
      });
      console.log(i);
      if (found) {
        obj[i].unsafe_non_drinking_water = found[0].unsafe_non_drinking_water;
        obj[i].unsafe_non_drinking_water_percentage =
          found[0].unsafe_non_drinking_water_percentage;
      }
      console.log(obj[i]);
      result.push(obj[i]);
    }
  var json = JSON.stringify(result);
  fs.writeFile("output7.json", json, "utf8");
  });
  // var json = JSON.stringify(obj);
  // fs.write("i3_j3_townships.json", json, "utf8");
});

// console.log(obj[1]);
