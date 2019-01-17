function drawScatterPlot(svgId, plotData, xField, yField, rField, xLabel, yLabel) {
  d3.json(plotData, function(data) {
    scatterPlot(svgId, data, xField, yField, rField, xLabel, yLabel);
  });
}

var chart_width = 1000;
var chart_height = 600;
var padding = 50;

function scatterPlot(svgId, data, xField, yField, rField, xLabel, yLabel) {
  // Create SVG Element
  var svg = d3
    .select("#" + svgId)
    .append("svg")
    .attr("viewBox", "0 0 1000 600")
    .attr("preserveAspectRatio", "xMidYMid")
    .style("padding", 50);

  // Create Scales
  var x_scale = d3
    .scaleLinear()
    .domain([
      // d3.min(data, function(d) {
      //   return d[xField];
      // }),
      0,
      d3.max(data, function(d) {
        return d[xField];
      })
    ])
    .range([padding, chart_width - padding * 2]);

  var y_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d[yField];
      })
    ])
    .range([chart_height - padding, padding]);

  var r_scale = d3
    .scaleSqrt()
    .domain([
      d3.min(data, function(d) {
        return d[rField];
      }),
      d3.max(data, function(d) {
        return d[rField];
      })
    ])
    .range([5, 10]);

  // Create Axis
  var x_axis = d3.axisBottom(x_scale);
  // .ticks( 5 )
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (chart_height - padding) + ")")
    .call(x_axis);

  // text label for the x axis
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + chart_width / 2 + " ," + (chart_height + padding / 2) + ")"
    )
    .style("text-anchor", "middle")
    .text(xLabel);

  var y_axis = d3.axisLeft(y_scale).tickFormat(function(d) {
    return d;
  });
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate( " + padding + ", 0 )")
    .call(y_axis);

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - padding) 
    .attr("x", 0 - chart_height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(yLabel);

  // Create Circles
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return x_scale(d[xField]);
    })
    .attr("cy", function(d) {
      return y_scale(d[yField]);
    })
    .attr("r", function(d) {
      return r_scale(d[rField]);
    })
    .attr("fill", "#D1AB0E");

  // Create Labels
  /*
  svg
    .append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) {
      return d.location;
    })
    .attr("x", function(d) {
      return x_scale(d[xField]);
    })
    .attr("y", function(d) {
      return y_scale(d[yField]);
    })
    .attr("font-size", 14)
    .attr("fill", "#fff");
    */
}
