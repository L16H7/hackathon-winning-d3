function drawLineChart(svgId, plotData, dataField) {
  d3.json(plotData, function(data) {
    LineChart(svgId, data, dataField);
  });
}

function LineChart(svgId, data, dataField) {
  var chart_width = 1000;
  var chart_height = 800;
  var padding = 50;

var locations = data.map(d => d.location);
  // Scales
  var x_scale = d3
    .scaleBand()
    .domain(locations)
    .range([padding, chart_width - padding]);

  var y_scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d[dataField];
      })
    ])
    .range([chart_height - padding, padding]);

  // Create SVG
  var svg = d3
    .select("#" + svgId)
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

  // Create Axes
  var x_axis = d3
    .axisBottom(x_scale)
    .ticks(10)
  var y_axis = d3.axisLeft(y_scale).ticks(12);
  svg
    .append("g")
    .attr("transform", "translate(0," + (chart_height - padding) + ")")
    .call(x_axis);
  svg
    .append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(y_axis);

  // Create Line
  var line = d3
    .line()
    // .defined(function(d) { return d[dataField] >= 0 && d[dataField] <= 100;
    // })
    .x(function(d) {
      return x_scale(d.location);
    })
    .y(function(d) {
      return y_scale(d[dataField]);
    });
//   var red_line = d3
//     .line()
//     .defined(function(d) {
//       return d.num >= 100;
//     })
//     .x(function(d) {
//       return x_scale(d.date);
//     })
//     .y(function(d) {
//       return y_scale(d.num);
//     });

//   var area = d3
//     .area()
//     .defined(function(d) {
//       return d.num >= 0;
//     })
//     .x(function(d) {
//       return x_scale(d.date);
//     })
//     .y0(function(d) {
//       return y_scale.range()[0];
//     })
//     .y1(function(d) {
//       return y_scale(d.num);
//     });

//   var red_area = d3
//     .area()
//     .defined(function(d) {
//       return d.num >= 100;
//     })
//     .x(function(d) {
//       return x_scale(d.date);
//     })
//     .y0(function(d) {
//       return y_scale(100);
//     })
//     .y1(function(d) {
//       return y_scale(d.num);
//     });

  svg
    .append("path")
    .datum(data)
    .attr("fill", "#73FF36")
    // .attr( 'stroke', '#73FF36' )
    // .attr( 'stroke-width', 5 )
    // .attr("d", area);

  svg
    .append("path")
    .datum(data)
    .attr("fill", "#E82C0C")
    // .attr( 'stroke', '#E82C0C' )
    // .attr( 'stroke-width', 5 )
    // .attr("d", red_area);

  // Example Blue Lines
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 10)
    .attr("d", line);
  svg
    .append("line")
    .attr("stroke", "blue")
    .attr("stroke-width", 10)
    .attr("x1", padding)
    .attr("y1", chart_height - padding)
    .attr("x2", 400)
    .attr("y2", chart_height - padding);
}
