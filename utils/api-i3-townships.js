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
  console.log("townships in " + region);
  console.log(obj.length);

  for (var i = 1; i < obj.length; i++) {
    var dataObj = {};
    dataObj.total = obj[i].total;
    dataObj.location = obj[i].location;
    dataObj.unsafe_sanitation =
      obj[i]["bucket_surface_latrine"] + obj[i]["other"] + obj[i]["none"];

    dataObj.unsafe_sanitation_percentage = parseFloat((
      100 *
      dataObj.unsafe_sanitation /
      obj[i].total
    ).toFixed(2));
    result.push(dataObj);
 }
  var json = JSON.stringify(result);
  fs.writeFile("i3_townships.json", json, "utf8");
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
