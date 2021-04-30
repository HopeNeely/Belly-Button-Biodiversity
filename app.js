
function optionChanged() {
    var selection = d3.select("#selDataset").node().value

    buildPlot(selection)
    buildBubblePlot(selection)
}




function buildPlot(selection) {
    d3.json("data/samples.json").then((data) => {

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
        else { selction = selection }

        // Filter samples for single id. 
        var filtered_ids = data.samples.filter(sample => sample.id === selection)

        var all_values = filtered_ids.map(sample => sample.sample_values)
        var sample_values = all_values[0].slice(0, 10).reverse()

        var all_otu_ids = filtered_ids.map(sample => sample.otu_ids)
        var sliced_otu_ids = all_otu_ids[0].slice(0, 10).reverse()
        var otu_ids = sliced_otu_ids.map(i => 'OTU ' + i)

        var all_otu_labels = filtered_ids.map(sample => sample.otu_labels)
        var otu_labels = all_otu_labels[0].slice(0, 10).reverse()

        // Filter metadata for single id.
        var filtered_meta = data.metadata.filter(meta => meta.id === parseInt(selection))

        var id = filtered_meta.map(meta => meta.id)
        var ethnicity = filtered_meta.map(meta => meta.ethnicity)
        var gender = filtered_meta.map(meta => meta.gender)
        var age = filtered_meta.map(meta => meta.age)
        var location = filtered_meta.map(meta => meta.location)
        var bbtype = filtered_meta.map(meta => meta.bbtype)
        var wfreq = filtered_meta.map(meta => meta.wfreq)


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

        var layout1 = {
            xaxis: { title: "OTU Values" },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        }
        Plotly.newPlot("bar", chartData, layout1)


        //Info to fill demographics info
        const infoFiller = (`<strong> id:</strong> ${id} <br>
                <br>    
                <strong> ethnicity:</strong> ${ethnicity} <br>
                <br>
                <strong> gender:</strong> ${gender} <br>
                <br>
                <strong> age:</strong> ${age} <br> 
                <br>
                <strong> location:</strong> ${location} <br>
                <br>
                <strong> bbtype:</strong> ${bbtype} <br>
                <br>
                <strong> wfreq:</strong> ${wfreq} <br>`
        )
        document.getElementById("sample-metadata").innerHTML = infoFiller

    })

}




buildPlot()


// Create Plotly Bubble Chart with marker size and color
function buildBubblePlot(selection) {
    d3.json("data/samples.json").then((data) => {

        // Give 'selection' an initial value. Then allow event handler information to pass through.
        if (!selection) {
            selection = "940"
        }
        else { selction = selection }

        // Filter samples for single id. 
        var filtered_ids = data.samples.filter(sample => sample.id === selection)
        var all_values = filtered_ids.map(sample => sample.sample_values)
        var sample_values = all_values[0].reverse()

        var all_otu_ids = filtered_ids.map(sample => sample.otu_ids)
        var otu_ids = all_otu_ids[0].reverse()

        var all_otu_labels = filtered_ids.map(sample => sample.otu_labels)
        var otu_labels = all_otu_labels[0].reverse()


        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                colorscale: [[0, 'rgb(73, 71, 191)'], [0.5, 'rgb(71, 191, 99)'], [1, 'rgb(191, 173, 71)']],
                cmin: 0,
                cmax: 3500,
                size: sample_values
            }
        }

        var bubbleData = [trace2]

        var layout2 = {
            showlegend: false,
            xaxis: { title: "OTU ID" },

        }

        Plotly.newPlot("bubble", bubbleData, layout2)

    })
}
buildBubblePlot()