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
  dataObj.plotdata = [];

  var personObj = {};

  personObj.label = "1_person";
  personObj.total = obj[0]["1_person"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "2 persons";
  personObj.total = obj[0]["2_persons"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "3 persons";
  personObj.total = obj[0]["3_persons"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "4 persons";
  personObj.total = obj[0]["4_persons"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "5 persons";
  personObj.total = obj[0]["5_persons"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "6 persons";
  personObj.total = obj[0]["6_persons"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "7 persons";
  personObj.total = obj[0]["7_persons"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "8 persons";
  personObj.total = obj[0]["8_persons"]
  dataObj.plotdata.push(personObj);

  var personObj = {};
  personObj.label = "9 persons and more";
  personObj.total = obj[0]["9_and_more"]
  dataObj.plotdata.push(personObj);

  result.push(dataObj);
  console.log(result);
  var json = JSON.stringify(result);
  fs.writeFile("a7.json", json, "utf8");
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
    getFromApi(regions[i], "A-7");
  }
}

initData();
