function init() {
  /* drawChoroplethMap(svgId, plotData, dataField) */
  drawChoroplethMap(
    "choropleth-map-1",
    "./../graph_data/e1a_map.json",
    "total_employed"
  );
  drawChoroplethMap(
    "choropleth-map-4",
    "./../graph_data/j2.json",
    "unsafe_drinking_water_percentage"
  );

  /* drawBarChart(svgId, plotData, dataField) */
  // drawBarChart(
  //   "bar-chart-1",
  //   "./../graph_data/sample.json",
  //   "total"
  // );
//  drawLineChart(
//     "bar-chart-1",
//     "./../graph_data/povertyline.json",
//     "below_poverty_line"
//   );

  /* drawScatterPlot(svgId, plotData, xField, yField, rField) */
  drawScatterPlot(
    "scatter-plot-1",
    "./../graph_data/output7.json",
    "unsafe_sanitation",
    "unsafe_non_drinking_water",
    "total",
    "Number of population with unsafe sanitation",
    "Number of population with unsafe non-drinking water"
  );

  drawScatterPlot(
    "scatter-plot-2",
    "./../graph_data/output7.json",
    "unsafe_sanitation_percentage",
    "unsafe_non_drinking_water_percentage",
    "total",
    "Number of population with unsafe sanitation",
    "Number of population with unsafe non-drinking water"
  );

  drawUnsafeFuel();
}

function drawDropOutChart(region) {
  /* stackChartWithLabels(svgId, data, region, xLabel, dataField1, dataField2, dataField3) */

  drawStackChartWithLabels(
    "stack-chart-1",
    "./../graph_data/d3male.json",
    region,
    "age_group",
    "never_attended",
    "attended_previously",
    "currently_attending"
  );
  drawStackChartWithLabels(
    "stack-chart-2",
    "./../graph_data/d3female.json",
    region,
    "age_group",
    "never_attended",
    "attended_previously",
    "currently_attending"
  );
}

function drawChildLabour(region) {
  drawStackChartWithLabels(
    "stack-chart-3",
    "./../graph_data/e1a.json",
    region,
    "age_group",
    "employed",
    "unemployed",
    "economically_inactive"
  );
}

function drawUnsafeFuel() {
  drawChoroplethMap(
    "choropleth-map-2",
    "./../graph_data/j4.json",
    "unsafe_fuel_percentage"
  );
  drawChoroplethMap(
    "choropleth-map-3",
    "./../graph_data/j4.json",
    "unsafe_fuel"
  );
}

function drawFamilySize(region) {
  // drawBarChart(svgId, plotData, dataField) 
  drawBarChart("bar-chart-1", "./../graph_data/a7.json", "total", region);
}