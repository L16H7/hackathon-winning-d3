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
  dataObj.unsafe_non_drinking_water = obj[0]["unprotected_well_or_spring"]
    + obj[0]["pool_or_pond_or_lake"]
    + obj[0]["river_or_stream_or_canal"]
    + obj[0]["waterfall_or_rain_water"]
    + obj[0]["tanker_or_truck"]
    + obj[0]["other"];

  dataObj.unsafe_non_drinking_water_percentage = (100 * dataObj.unsafe_non_drinking_water / obj[0].total_conventional_households).toFixed(2);
  result.push(dataObj);
  console.log(result);
  var json = JSON.stringify(result);
  fs.writeFile("j3.json", json, "utf8");
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
    getFromApi(regions[i], "J-3");
  }
}

initData();
