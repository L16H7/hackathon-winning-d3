var request = require("request-promise");
var result = [];

var fs = require('fs');

function getFromApi(region, table) {
  return request({
    url: `http://api.datavisualizationhackathon.org/api/dataset?reg=${region}&tb=${table}`,
    json: true
  }).then(function(data) {
    if (data.error && data.error.length) {
      throw new Error(`API error xyz for with params ...`);
    }
    // console.log(data);
    getChartData(data, region);
    return data;
  });
}

function getChartData(obj, region) {
  var dataObj = obj[1]; // Male
  // var dataObj = obj[2]; // Female

  var maleKeys = Object.keys(dataObj.age);
  maleKeys = maleKeys.slice(0, 15);
  // console.log(maleKeys);

  var male5_9 = {};
  var male10_14 = {};
  var male15_19 = {};

  var totalM = [];
  var never_attened = [];
  var attended_previously = [];
  var currently_attending = [];
  for (var i = 0; i < maleKeys.length; i++) {
    totalM.push(dataObj.age[maleKeys[i]].male.total);
    never_attened.push(dataObj.age[maleKeys[i]].male.never_attended);
    attended_previously.push(dataObj.age[maleKeys[i]].male.attended_previously);
    currently_attending.push(dataObj.age[maleKeys[i]].male.currently_attending);
  }

  var a = totalM.slice(0, 5);
  var b = totalM.slice(5, 10);
  var c = totalM.slice(10, 15);

  male5_9.location = region;
  male10_14.location = region;
  male15_19.location = region;

  male5_9.age_group = "5 - 9";
  male10_14.age_group = "10 - 14";
  male15_19.age_group = "15 - 19";

  male5_9.sex = "male";
  male10_14.sex = "male";
  male15_19.sex = "male";


  male5_9.male_total = a.reduce(add, 0);
  male10_14.male_total = b.reduce(add, 0);
  male15_19.male_total = c.reduce(add, 0);

  var d = never_attened.slice(0, 5);
  var e = never_attened.slice(5, 10);
  var f = never_attened.slice(10, 15);

  male5_9.never_attended = d.reduce(add, 0);
  male10_14.never_attended = e.reduce(add, 0);
  male15_19.never_attended = f.reduce(add, 0);

  var g = attended_previously.slice(0, 5);
  var h = attended_previously.slice(5, 10);
  var i = attended_previously.slice(10, 15);
  male5_9.attended_previously = g.reduce(add, 0);
  male10_14.attended_previously = h.reduce(add, 0);
  male15_19.attended_previously = i.reduce(add, 0);

  var j = currently_attending.slice(0, 5);
  var k = currently_attending.slice(5, 10);
  var l = currently_attending.slice(10, 15);
  male5_9.currently_attending = j.reduce(add, 0);
  male10_14.currently_attending = k.reduce(add, 0);
  male15_19.currently_attending = l.reduce(add, 0);

  result.push(male5_9);
  result.push(male10_14);
  result.push(male15_19);  

  console.log(result);
  var json = JSON.stringify(result);
  fs.writeFile("d3male.json", json, "utf8");

}

function add(a, b) {
  return a + b;
}

var regions = [
  "ayeyawady",
  "bago",
  "chin",
  "kachin",
  "kayah",
  "kayin",
  "magway",
  "mandalay",
  "mon",
  "naypyitaw",
  "rakhine",
  "sagaing",
  "shan",
  "tanintharyi",
  "yangon"
];
function initData() {
  for (var i in regions) {
    getFromApi(regions[i], "D-3");
  }
}

initData();
