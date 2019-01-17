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
  var malesObj = obj[1];
  var femaleObj = obj[2];

  var maleKeys = Object.keys(malesObj.age);
  maleKeys = maleKeys.slice(0, 15);
  // console.log(maleKeys);

  var result = [];
  var male5_9 = {};
  var male10_14 = {};
  var male15_19 = {};

  var totalM = [];
  var noneM = [];
  for (var i = 0; i < maleKeys.length; i++) {
    totalM.push(malesObj.age[maleKeys[i]].total);
    noneM.push(malesObj.age[maleKeys[i]].none);
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


  male5_9.male_total = a.reduce(add, 0);
  male10_14.male_total = b.reduce(add, 0);
  male15_19.male_total = c.reduce(add, 0);

//   console.log(male5_9);
  result.push(male5_9);
  result.push(male10_14);
  result.push(male15_19);

  console.log(result);
}

function add(a, b) {
  return a + b;
}

getFromApi("yangon", "D-5a");
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
