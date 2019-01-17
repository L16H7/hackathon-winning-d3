var request = require("request-promise");
var result = [];

var fs = require("fs");

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
  var dataObj2 = obj[2]; // Female

  var maleKeys = Object.keys(dataObj.age);
  maleKeys = maleKeys.slice(0, 2);

  var regionData = {};
  regionData.location = region;

  regionData.total_employed =
    dataObj.age["10_14"].employed +
    dataObj.age["15_19"].employed +
    dataObj2.age["10_14"].employed +
    dataObj2.age["15_19"].employed +
    result.push(regionData);
  console.log(result);
  var json = JSON.stringify(result);
  fs.writeFile("e1a.json", json, "utf8");
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
    getFromApi(regions[i], "E-1a");
  }
}

initData();
