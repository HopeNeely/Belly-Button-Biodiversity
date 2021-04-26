
function buildPlot() {
    d3.json("../../data/samples.json").then((data) => {
        // filter for single id. gragh that and then the drop down will introduce the new 
        var filtered_ids = data.samples.filter(sample => sample.id === "940")

        // Get 'sample_values' for horizontal bar chart x axis    
        var all_values = filtered_ids.map(sample => sample.sample_values)
        var sample_values = all_values[0].slice(0, 10).reverse()

        // Get 'otu_ids' for first ten to use as lables for the y axis
        var all_otu_ids = filtered_ids.map(sample => sample.otu_ids)
        var sliced_otu_ids = all_otu_ids[0].slice(0, 10).reverse()
        var otu_ids = sliced_otu_ids.map(i => 'OTU ' + i)

        // Get 'otu_labels' for the hovertext 
        var all_otu_labels = filtered_ids.map(sample => sample.otu_labels)
        var otu_labels = all_otu_labels[0].slice(0, 10).reverse()

        // Append option tags to dropdown in html with text and value
        var selDataset = d3.select("#selDataset")

        var dropdown_ids = data.samples.map(sample => sample.id)

        for (var i = 0; i < dropdown_ids.length; i++) {
            var option = selDataset.append("option")
            option.text(dropdown_ids[i])
            option.property("value", dropdown_ids[i])
        }


        // --------------------------------
        // Initialize Plot
        // --------------------------------


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
    })


}

// ---------------------------
// Event Handler???
// ---------------------------

// d3.selectAll("body").on("change", optionChanged)


function optionChanged() {
    var dropdownMenu = d3.select("#selDataset").node()

    // var dropdownMenuID = dropdownMenu.id
    // Assign the dropdown menu option to a variable
    var selection = dropdownMenu.value;

    

    d3.json("../../data/samples.json").then((data) => {
        
        // var filteredIds = []

        var newFilteredIds = data.samples.filter(sample => sample.id === selection)
        // filteredIds.append(newFilteredIds)
        console.log(newFilteredIds)
    })


    
    // console.log(dropdownMenuID)

    // buildPlot(selection)

}




buildPlot()




// function updatePlotly(newData) {
//     initial_id = "940"
//     var Bar = document.getElementById("bar")
//     Plotly.restyle(Bar, "values", [newData])
// }



//  ------------------------
// Event Listener???
// -------------------------