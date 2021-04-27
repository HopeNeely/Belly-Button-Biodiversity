function buildPlot(selection) {
    d3.json("../../data/samples.json").then((data) => {

        // Append option tags to dropdown in html with 'text' and 'value'.
        var selDataset = d3.select("#selDataset")
        var dropdown_ids = data.samples.map(sample => sample.id)

        for (var i = 0; i < dropdown_ids.length; i++) {
            var option = selDataset.append("option")
            option.text(dropdown_ids[i])
            option.property("value", dropdown_ids[i])
        }

        // Give 'selection' an initial value. Then allow event handler information to pass through.
        if (!selection) {
            selection = "940"
        } 
        else {selction = selection}

        // Filter for single id. Gragh that and then the dropdown will introduce the new 'selection'. 
        var filtered_ids = data.samples.filter(sample => sample.id === selection)

        // Get 'sample_values' for horizontal bar chart x axis.    
        var all_values = filtered_ids.map(sample => sample.sample_values)
        var sample_values = all_values[0].slice(0, 10).reverse()

        // Get 'otu_ids' for horizontal bar chart y axis labels.
        var all_otu_ids = filtered_ids.map(sample => sample.otu_ids)
        var sliced_otu_ids = all_otu_ids[0].slice(0, 10).reverse()
        var otu_ids = sliced_otu_ids.map(i => 'OTU ' + i)

        // Get 'otu_labels' for horizontal bar chart hovertext. 
        var all_otu_labels = filtered_ids.map(sample => sample.otu_labels)
        var otu_labels = all_otu_labels[0].slice(0, 10).reverse()


        // Create Plotly hoizontal Bar Graph
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

function optionChanged() {
    var selection = d3.select("#selDataset").node().value

    buildPlot(selection)
}

buildPlot()