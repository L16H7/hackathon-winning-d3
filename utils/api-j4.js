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
  var dataObj = {};
  dataObj.location = region;
  dataObj.unsafe_fuel = 
    obj[0]["firewood"]
    + obj[0]["other"] + obj[0]["straw_or_grass"];
  
  dataObj.unsafe_fuel_percentage = dataObj.unsafe_fuel / obj[0].total * 100;
  dataObj.unsafe_fuel_percentage = dataObj.unsafe_fuel_percentage.toFixed(2);
  result.push(dataObj);
  console.log(result);
  var json = JSON.stringify(result);
  fs.writeFile("j4.json", json, "utf8");
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
    getFromApi(regions[i], "J-4");
  }
}

initData();
