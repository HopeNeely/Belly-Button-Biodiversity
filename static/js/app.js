d3.json("../data/samples.json").then((data) => {
  //  Create the Traces
  var trace1 = {
    x: data.otu_types,  // this should be searchable per individaul
    y: data.otu_values,
    type: "bar",  // make sure th is is a horizontal bar chart
    name: "Top 10 OTUs per Individual",
  };

  // Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "Top 10 OTUs per Individual",
    xaxis: { title: "OTU Types" },
    yaxis: { title: "OTU Values" }
  };

// Figure out how to add `otu_labels` as the hover text

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
})