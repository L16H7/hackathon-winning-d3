function drawBarChart(svgId, plotData, dataField, region) {
  d3.select("#bar1").remove();
  d3.json(plotData, function(data) {
    barChart(svgId, data, dataField, region);
  });
}

function barChart(svgId, plotData, dataField, region) {
  plotData = plotData.filter(e => e.location === region);
  // console.log(plotData[0].plotdata);
  plotData = plotData[0].plotdata;

  // plotData = plotData[0].plotData;
  var key = function(d) {
    return d.label;
  };

  // Create SVG Element
  var chart_width = 1000;
  var chart_height = 600;
  var bar_padding = 5;
  var padding = 50;

  var svg = d3
    .select("#" + svgId)
    .append("svg")
    .attr("id", "bar1")
    .attr("viewBox", "0 0 1000 600")
    .attr("preserveAspectRatio", "xMidYMid")
    .style("padding", 50);

  // Create Scales
  // 800 / 15 = 53.33
  // 0, 53.33, 106.66
  var labels = plotData.map(d => d.label);
  // console.log(labels);
  var x_scale = d3
    .scaleBand()
    // .domain(d3.range(plotData.length))
    .domain(labels)
    .rangeRound([bar_padding + padding, chart_width - padding])
    .paddingInner(0.25);

  var y_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(plotData, function(d) {
        return d[dataField];
      })
    ])
    .range([chart_height - padding, 0]);

  // Bind Data and create bars
  svg
    .selectAll("rect")
    .data(plotData, key)
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return x_scale(d.label);
    })
    .attr("y", function(d) {
      return y_scale(d[dataField]);
    })
    .attr("width", x_scale.bandwidth())
    .attr("height", function(d) {
      return y_scale(0) - y_scale(d[dataField]);
    })
    .attr("fill", "#7ED26D");

  // Create Labels
  svg
    .selectAll("text")
    .data(plotData, key)
    .enter()
    .append("text")
    .text(function(d) {
      return d[dataField];
    })
    .attr("x", function(d) {
      return x_scale(d.label) + x_scale.bandwidth() / 2;
    })
    .attr("y", function(d) {
      return y_scale(d[dataField]) + 15;
    })
    .attr("font-size", 14)
    .attr("fill", "#fff")
    .attr("text-anchor", "middle");

  var x_axis = d3.axisBottom(x_scale);
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr(
      "transform",
      "translate(0," + (chart_height - padding + bar_padding) + ")"
    )
    .call(x_axis);

  // text label for the x axis
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + chart_width / 2 + " ," + (chart_height + padding / 2) + ")"
    )
    .style("text-anchor", "middle")
    .text("Family Member");

  var y_axis = d3.axisLeft(y_scale);
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(y_axis);

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - padding)
    .attr("x", 0 - chart_height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Total Households");
}
