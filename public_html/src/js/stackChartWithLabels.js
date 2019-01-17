function drawStackChartWithLabels(
  svgId,
  plotData,
  region,
  xLabel,
  dataField1,
  dataField2,
  dataField3
) {
  d3.select("#c1").remove();
  d3.json(plotData, function(data) {
    stackChartWithLabels(
      svgId,
      data,
      region,
      xLabel,
      dataField1,
      dataField2,
      dataField3
    );
  });
}

function stackChartWithLabels(
  svgId,
  data,
  region,
  xLabel,
  dataField1,
  dataField2,
  dataField3
) {
  var padding = 50;
  data = data.filter(e => e.location === region);
  // console.log(xLabel);
  var x_axis_labels = data.map(d => d[xLabel]);

  var chart_width = 400;
  var chart_height = 500;
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // Stack Layout
  var stack = d3.stack().keys([dataField1, dataField2, dataField3]);
  var stack_data = stack(data);

  // console.log(x_axis_labels);
  // Scales
  var x_scale = d3
    .scaleBand()
    .domain(x_axis_labels)
    .range([0, chart_width])
    .paddingInner(0.05);
  var y_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d[dataField1] + d[dataField2] + d[dataField3];
      })
    ])
    .range([chart_height - padding, 0]);

  // Create SVG Element
  var svg = d3
    .select("#" + svgId)
    .append("svg")
    .attr("id", "c1")
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
      return x_scale(d.data[xLabel]);
    })
    .attr("y", function(d) {
      return y_scale(d[1]);
    })
    .attr("height", function(d) {
      return y_scale(d[0]) - y_scale(d[1]);
    })
    .attr("width", x_scale.bandwidth() / 2)
    .attr("title", function(d) {
      // console.log(d[1]);
      return d[0];
    });

  groups
    .selectAll("text")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("text")
    .text(function(d) {
      return d[1] - d[0];
    })
    .attr("x", function(d, i) {
      return x_scale(d.data[xLabel]);
    })
    .attr("y", function(d) {
      return y_scale(d[1]);
    })
    .attr("height", function(d) {
      return y_scale(d[0]) - y_scale(d[1]);
    })
    .attr("width", x_scale.bandwidth() / 2)
    .attr("fill", "#fff")
    .attr(
      "transform",
      "translate(10, 20)"
    );


  var x_axis = d3.axisBottom(x_scale);
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (chart_height - 30) + ")")
    .call(x_axis);
}
