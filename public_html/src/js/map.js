var greens = d3
  .scaleQuantize()
  .range([
    "#B2DFDB",
    "#80CBC4",
    "#4DB6AC",
    "#26A69A",
    "#009688",
    "#00897B",
    "#00796B",
    "#00695C",
    "#004D40"
  ]);

function drawChoroplethMap(svgId, plotData, dataField) {
  d3.json(plotData, function(data) {
    choroplethMap(svgId, data, dataField);
  });
}

const STATE_NAME_FIELD = "location";

function choroplethMap(svgId, data, dataField) {
  var reds = d3
    .scaleQuantize()
    .range([
      "#FFCCBC",
      "#FFAB91",
      "#FF8A65",
      "#FF7043",
      "#FF5722",
      "#F4511E",
      "#E64A19",
      "#D84315",
      "#BF360C"
    ]);

  var projection = d3
    .geoMercator()
    .scale(1500)
    .translate([-2340, 800]);
  var path = d3.geoPath().projection(projection);

  var svg = d3
    .select("#" + svgId)
    .append("svg")
    .attr("viewBox", "0 0 400 600")
    .attr("preserveAspectRatio", "xMidYMid");

  // Load Data to be Plotted on Choropleth Map
  reds.domain([
    d3.min(data.map(d => d[dataField])),
    d3.max(data.map(d => d[dataField]))
  ]);

  // NEVER CHANGE map_data properties
  // Load Map Data
  d3.json("./src/data/myanmar.json", function(map_data) {
    map_data.features.forEach(function(map_data_element, map_data_index) {
      data.forEach(function(data_element, data_index) {
        if (
          map_data_element.properties.NAME_1 !== data_element[STATE_NAME_FIELD]
        ) {
          return null;
        }
        map_data.features[map_data_index].properties[dataField] = parseFloat(
          data_element[dataField]
        );
      });
    });

    svg
      .selectAll("path")
      .data(map_data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", function(d) {
        var num = d.properties[dataField];
        return num ? reds(num) : "green";
      })
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .append("title")
      .text(function(d) {
        return d.properties.NAME_1;
      });

    svg
      .selectAll("text")
      .data(map_data.features)
      .enter()
      .append("svg:text")
      .text(function(d) {
        return d.properties[dataField];
      })
      .attr("x", function(d) {
        return path.centroid(d)[0];
      })
      .attr("y", function(d) {
        return path.centroid(d)[1];
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "8pt")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      // .style("stroke", "black");

  });

  drawDataTable(svgId + "-table", data, ["location", dataField]);
}
