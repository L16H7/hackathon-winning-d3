function drawStackChart(svgId, plotData, dataField1, dataField2, dataField3) {
  d3.json(plotData, function(data) {
    stackChart(svgId, data, dataField1, dataField2, dataField3);
  });
}

function stackChart(svgId, data, dataField1, dataField2, dataField3) {
  var locations = data.map(d => d.location);

  var chart_width = 800;
  var chart_height = 600;
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // Stack Layout
  var stack = d3.stack().keys([dataField1, dataField2, dataField3]); 
  var stack_data = stack(data);

  // Scales
  var x_scale = d3
    .scaleBand()
    .domain(locations)
    .range([0, chart_width])
    .paddingInner(0.05);
  var y_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d.none + d.low + d.high;
      })
    ])
    .range([chart_height, 0]);

  // Create SVG Element
  var svg = d3
    .select("#" + svgId)
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

  // Groups
  var groups = svg
    .selectAll("g")
    .data(stack_data)
    .enter()
    .append("g")
    .style("fill", function(d, i) {
      return color(i);
    });

  // Rectangles
  groups
    .selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return x_scale(d.data.location);
    })
    .attr("y", function(d) {
      return y_scale(d[1]);
    })
    .attr("height", function(d) {
      return y_scale(d[0]) - y_scale(d[1]);
    })
    .attr("width", x_scale.bandwidth());

  var x_axis = d3.axisBottom(x_scale);
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (chart_height - 50) + ")")
    .call(x_axis);
}
