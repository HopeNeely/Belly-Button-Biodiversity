//inialized the page with default plot

// -------------------------------
// Get Data
// -------------------------------
// Read in `sample.json` with D3 library.
d3.json("samples.json").then((data) => {
    
    // filter for single id. gragh that and then the drop down will introduce the new 
    var filtered_ids = data.samples.filter(sample => sample.id === "940") 
    
   
    // Get values for horizontal bar chart x axis    
    var all_values = filtered_ids.map(sample => sample.sample_values)
    var sample_values = all_values[0].slice(0,10)
    // Get 'otu_ids' for first ten to use as lables for the bar chart
    var all_otu_ids = filtered_ids.map(sample => sample.otu_ids)
    var otu_ids = all_otu_ids[0].slice(0,10) 
    // Get values for the hovertext 
    var all_otu_labels = filtered_ids.map(sample => sample.otu_labels)
    var otu_labels = all_otu_labels[0].slice(0,10)







    // console.log(filtered_ids)
    console.log(otu_labels)

    
    
    
    

    // var ids = data.samples.map(row => row.id)
  
    
    
    
    

//  ------------------------
// Event Handler
// -------------------------
// // Use D3 to create an event handler
// d3.selectAll("body").on("change", updatePage);

// function updatePage() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.selectAll("#selectOption").node();
//   // Assign the dropdown menu item ID to a variable
//   var dropdownMenuID = dropdownMenu.id;
//   // Assign the dropdown menu option to a variable
//   var selectedOption = dropdownMenu.value;

//   console.log(dropdownMenuID);
//   console.log(selectedOption);
  


// ------------------
// BuildPlot
// ------------------
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
    //   // Initialize an empty array for the id's data
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






// -----------------
//  Event listener
// -----------------