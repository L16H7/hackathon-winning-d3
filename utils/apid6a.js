
var result = [];
var fs = require('fs');
var request = require("request-promise");

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
  var totalObj = obj[0].sex.total;
  console.log(totalObj);

  var data = {};
  data.location = region;
  data.total = totalObj.total;
  data.none = totalObj.none; 

  data.low = totalObj["primary_school_grade_1-5"] + totalObj["middle_school_grade_6-9"];
  data.high = totalObj["high_school_grade_10-11"] + totalObj.diploma + totalObj.university_or_college
    + totalObj["post-graduate_and_above"] + totalObj["vocational_training"] + totalObj["other"];  
  result.push(data);
  console.log(result);
  
  var json = JSON.stringify(result);
  fs.writeFile("output2.json", json, "utf8");

}

function add(a, b) {
  return a + b;
}

// getFromApi("yangon", "D-6a");
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
    getFromApi(regions[i], "D-6a");
  }
}

initData();