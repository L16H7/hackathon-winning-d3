function drawDataTable(tableId, data, columns) {
  var table = d3
    .select("#" + tableId)
    .append("table");
  var thead = table.append("thead");
  var tbody = table.append("tbody");

  // append the header row
  var headers = ["Location", ""];
  thead
    .append("tr")
    .selectAll("th")
    .data(headers)
    .enter()
    .append("th")
    .attr("class", function(h) {
      if (h !== "") return;
      return "fa fa-sort-amount-desc table-cell";
    }) 
    .text(function(h) {
      return h;
    })
    .on("click", function (d) {
      tbody.selectAll("tr")
        .sort(function(a, b) { 
          if (d === '') {
            return d3.descending(a[columns[1]], b[columns[1]]); 
          }
          return d3.ascending(a[columns[0]], b[columns[0]]);
        });
    });

  // create a row for each object in the data
  var rows = tbody
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

  // create a cell in each row for each column
  var cells = rows
    .selectAll("td")
    .data(function(row) {
      return columns.map(function(column) {
        return { column: column, value: row[column] };
      });
    })
    .enter()
    .append("td")
    .text(function(d) {
      return d.value;
    });
}
