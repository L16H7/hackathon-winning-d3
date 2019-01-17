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
  dataObj.unsafe_sanitation = 
    obj[0]["bucket_surface_latrine"]
    + obj[0]["other"] + obj[0]["none"];

  dataObj.unsafe_sanitation_percentage = (100 * dataObj.unsafe_sanitation / obj[0].total).toFixed(2);
  result.push(dataObj);
  console.log(result);
  var json = JSON.stringify(result);
  fs.writeFile("i3.json", json, "utf8");
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
    getFromApi(regions[i], "I-3");
  }
}

initData();
