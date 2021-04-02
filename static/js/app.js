d3.json("samples.json").then((data) => {

    // 1: Set up for drop down menu
    // Create and array of each individual's top 10 OTUs 
    
    // Use map() to build an array of the ids
    var ids = data.samples.map(row => row.id)
  
    var all_values = data.samples.map(row => row.otu_ids)
    console.log(all_values)
    
    // I will need to sort largest to smallest sample_values and slice the first 10 THEN I will need to filter all others were  

    // // Get values for horizontal bar chart x axis  *** I image I will need to filter each individual's sample values for the 10 largest values. The colect each of these. 
    // var sample_values = samples_data.filter("get sample_values" => "where samle_values are top 10") 
    // // Get values for horizontal bar chart y axis
    // var otu_ids = samples_date.filter("get otu_ids => where sample_values are top 10") 
    // // Get values for the hovertext 
    // var otu_labels = samples_date.filter("get otu_labels => where sample_values are top 10")





    // 2: Display the default plot
//     //  Create the Traces
//     var trace1 = {
//         x: data.otu_values,  
//         y: data.otu_ids,
//         type: "bar",
//         orientation: "h",
//         name: "Top 10 OTUs per Individual"
//     };

//     // data
//     var chartData = [trace1]

//     // Define the plot layout
//     var layout = {
//         title: "Top 10 OTUs per Individual",
//         xaxis: { title: "OTU Types" },
//         yaxis: { title: "OTU Values" },
//         margin: {
//             l: 100,
//             r: 100,
//             t: 100,
//             b: 100
//         }
//       };

//     // Figure out how to add `otu_labels` as the hover text

//     // Plot the chart to a div tag with id "plot"
//     Plotly.newPlot("plot", chartData, layout);

    // 3: On change to the DOM, call getData()
    // d3.selectAll("#selDataset").on("change", getData);

    // // Function called by DOM changes
    // function getData() {
    //   var dropdownMenu = d3.select("#selDataset");
    //   // Assign the value of the dropdown menu option to a variable
    //   var dataset = dropdownMenu.property("value");
    //   // Initialize an empty array for the country's data
    //   var data = [];
    
    //   if (dataset == 'us') {
    //       data = us;
    //   }
    //   else if (dataset == 'uk') {
    //       data = uk;
    //   }
    //   else if (dataset == 'canada') {
    //       data = canada;
    //   }
    //   // Call function to update the chart
    //   updatePlotly(data);
    // }
    
    // // Update the restyled plot's values
    // function updatePlotly(newdata) {
    //   Plotly.restyle("pie", "values", [newdata]);
    // }
    
    // init();
    
 })