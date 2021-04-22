// -------------------------------
// Get Data
// -------------------------------
// Read in `sample.json` with D3 library.
d3.json("../data/samples.json").then((data) => {
    // filter for single id. gragh that and then the drop down will introduce the new 
    var filtered_ids = data.samples.filter(sample => sample.id === "940")

    // Get values for horizontal bar chart x axis    
    var all_values = filtered_ids.map(sample => sample.sample_values)
    var sliced_sample_values = all_values[0].slice(0, 10)
    var sample_values = sliced_sample_values.reverse()

    // Get 'otu_ids' for first ten to use as lables for the y axis
    var all_otu_ids = filtered_ids.map(sample => sample.otu_ids)
    var sliced_otu_ids = all_otu_ids[0].slice(0, 10)
    var added_otu_ids = sliced_otu_ids.map(i => 'OTU ' + i)
    var otu_ids = added_otu_ids.reverse()

    // Get values for the hovertext 
    var all_otu_labels = filtered_ids.map(sample => sample.otu_labels)
    var sliced_otu_labels = all_otu_labels[0].slice(0, 10)
    var otu_labels = sliced_otu_labels.reverse()



    // --------------------------------
    // BuildPlot
    // --------------------------------

    function init() {
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: sample_values,
            y: otu_ids,
            hovertemplate: '<b>%{text}</b>',
            text: otu_labels
        }

        var chartData = [trace1]

        // Define the plot layout
        var layout = {
            title: "Top 10 OTUs per Individual",
            xaxis: { title: "OTU Values" },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        }
        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("plot", chartData, layout)


        //  ------------------------
        // Event Handler
        // -------------------------

        var selDataset = d3.select("#selDataset")



        function dropdownOptions(dropdown_ids) {
            // Get values for the dropdown box
            var dropdown_ids = data.samples.map(sample => sample.id)
            // console.log(dropdown_ids)

            selDataset.append("option")

            
        }
        dropdownOptions()

    }
    init()
})