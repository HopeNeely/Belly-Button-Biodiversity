
function optionChanged() {
    var selection = d3.select("#selDataset").node().value

    buildPlot(selection)
    buildBubblePlot(selection)
}


function buildPlot(selection) {
    d3.json("data/samples.json").then((data) => {

        // Append option tags to dropdown in html with 'text' and 'value'.
        var selDataset = d3.select("#selDataset")
        var dropdownIds = data.samples.map(sample => sample.id)

        for (var i = 0; i < dropdownIds.length; i++) {
            var option = selDataset.append("option")
            option.text(dropdownIds[i])
            option.property("value", dropdownIds[i])
        }

        // Give 'selection' an initial value. Then, allow event handler information to pass through.
        if (!selection) {
            selection = "940"
        }
        else { selction = selection }

        // Filter samples by single id. 
        var filteredIds = data.samples.filter(sample => sample.id === selection)

        var allValues = filteredIds.map(sample => sample.sample_values)
        var sampleValues = allValues[0].slice(0, 10).reverse()

        var allOtuIds = filteredIds.map(sample => sample.otu_ids)
        var slicedOtuIds = allOtuIds[0].slice(0, 10).reverse()
        var otuIds = slicedOtuIds.map(i => 'OTU ' + i)

        var allotuLabels = filteredIds.map(sample => sample.otu_labels)
        var otuLabels = allotuLabels[0].slice(0, 10).reverse()

        // Filter metadata by single id.
        var filteredMeta = data.metadata.filter(meta => meta.id === parseInt(selection))

        var id = filteredMeta.map(meta => meta.id)
        var ethnicity = filteredMeta.map(meta => meta.ethnicity)
        var gender = filteredMeta.map(meta => meta.gender)
        var age = filteredMeta.map(meta => meta.age)
        var location = filteredMeta.map(meta => meta.location)
        var bbtype = filteredMeta.map(meta => meta.bbtype)
        var wfreq = filteredMeta.map(meta => meta.wfreq)


        // Create Plotly hoizontal Bar Graph
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: sampleValues,
            y: otuIds,
            hovertemplate: '<b>%{text}</b>',
            text: otuLabels
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


// Create Plotly Bubble Chart with marker size and color.
function buildBubblePlot(selection) {
    d3.json("data/samples.json").then((data) => {

        // Give 'selection' an initial value. Then, allow event handler information to pass through.
        if (!selection) {
            selection = "940"
        }
        else { selction = selection }

        // Filter samples by single id. 
        var filteredIds = data.samples.filter(sample => sample.id === selection)
        var allValues = filteredIds.map(sample => sample.sample_values)
        var sampleValues = allValues[0].reverse()

        var allotuIds = filteredIds.map(sample => sample.otu_ids)
        var otuIds = allotuIds[0].reverse()

        var allotuLabels = filteredIds.map(sample => sample.otu_labels)
        var otuLabels = allotuLabels[0].reverse()


        var trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIds,
                colorscale: [[0, 'rgb(73, 71, 191)'], [0.5, 'rgb(71, 191, 99)'], [1, 'rgb(191, 173, 71)']],
                cmin: 0,
                cmax: 3500,
                size: sampleValues
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