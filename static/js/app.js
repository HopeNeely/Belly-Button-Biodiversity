// -------------------------------
// Get Data
// -------------------------------
// Read in `sample.json` with D3 library.
d3.json("../../data/samples.json").then((data) => {
    // filter for single id. gragh that and then the drop down will introduce the new 
    var filtered_ids = data.samples.filter(sample => sample.id === "940")

    // Get 'sample_values' for horizontal bar chart x axis    
    var all_values = filtered_ids.map(sample => sample.sample_values)
    var sliced_sample_values = all_values[0].slice(0, 10)
    var sample_values = sliced_sample_values.reverse()

    // Get 'otu_ids' for first ten to use as lables for the y axis
    var all_otu_ids = filtered_ids.map(sample => sample.otu_ids)
    var sliced_otu_ids = all_otu_ids[0].slice(0, 10)
    var added_otu_ids = sliced_otu_ids.map(i => 'OTU ' + i)
    var otu_ids = added_otu_ids.reverse()

    // Get 'otu_labels' for the hovertext 
    var all_otu_labels = filtered_ids.map(sample => sample.otu_labels)
    var sliced_otu_labels = all_otu_labels[0].slice(0, 10)
    var otu_labels = sliced_otu_labels.reverse()


    // Append options to dropdown in html with text and value
    var selDataset = d3.select("#selDataset")

    var dropdown_ids = data.samples.map(sample => sample.id)

    for (var i = 0; i < dropdown_ids.length; i++) {
        var option = selDataset.append("option")
        option.text(dropdown_ids[i])

        option.property("value", dropdown_ids[i])
    }



    // --------------------------------
    // buildPlot
    // --------------------------------

    function buildPlot() {
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
        Plotly.newPlot("bar", chartData, layout)

    }
    buildPlot()
})


// function init() {
//     initial_id = "940"
// }

// init()


//  ------------------------
// Event Handler
// -------------------------
d3.selectAll("body").on("change", optionChanged)

function optionChanged() {
    // d3.event.preventDefault(sample_selection)

    var sample_selection = d3.select("#selDataset").node().value

    console.log(sample_selection)

}