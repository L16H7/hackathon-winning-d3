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
  var dataObj2 = obj[2]; // Female

  var maleKeys = Object.keys(dataObj.age);
  maleKeys = maleKeys.slice(0, 2);
  // console.log(maleKeys);

  var m10_14 = {};
  var m15_19 = {};
  var f10_14 = {};
  var f15_19 = {};

  m10_14.location = region;
  m15_19.location = region;
  f10_14.location = region;
  f15_19.location = region;

  m10_14.age_group = "10 - 14 M";
  m15_19.age_group = "15 - 19 M";
  f10_14.age_group = "10 - 14 F";
  f15_19.age_group = "15 - 19 F";

  m10_14.employed = dataObj.age[maleKeys[0]].employed;
  m15_19.employed = dataObj.age[maleKeys[1]].employed;
  f10_14.employed = dataObj2.age[maleKeys[0]].employed;
  f15_19.employed = dataObj2.age[maleKeys[1]].employed;

  m10_14.unemployed = dataObj.age[maleKeys[0]].unemployed;
  m15_19.unemployed = dataObj.age[maleKeys[1]].unemployed;
  f10_14.unemployed = dataObj2.age[maleKeys[0]].unemployed;
  f15_19.unemployed = dataObj2.age[maleKeys[1]].unemployed;

  m10_14.economically_inactive = dataObj.age[maleKeys[0]].economically_inactive;
  m15_19.economically_inactive = dataObj.age[maleKeys[1]].economically_inactive;
  f10_14.economically_inactive = dataObj2.age[maleKeys[0]].economically_inactive;
  f15_19.economically_inactive = dataObj2.age[maleKeys[1]].economically_inactive;



  result.push(m10_14);
  result.push(f10_14);
  result.push(m15_19);  
  result.push(f15_19);  

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
