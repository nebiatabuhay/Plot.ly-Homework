function getPlots(id) {
// wfreq
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var wfreq = sampledata.metadata[0].wfreq;
        console.log(`WFREQ: ${wfreq}`)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
    
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
    
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
    
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
       
        var data = [trace];

       
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        var config={responsive:true};
    Plotly.newPlot("bar", data, layout,config);
     

            var data = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge",
            gauge: {
      axis: { range: [0, 9] },
      
      threshold: {
        line: { color: "perpal", width: 6 },
        thickness: 0.75,
        value: wfreq
      }
    }
            }
            ];

            var layout = { 
                    margin: {
                        t: 0,
                        b: 0
                    }
            };
        Plotly.newPlot('gauge', data, layout,config);

        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        
        var layout_2 = {
            xaxis:{title: "OTU ID"}
        };


        var data1 = [trace1];

        var config={responsive:true};

    Plotly.newPlot("bubble", data1, layout_2,config); 
    
    });
}  

function getDemoInfo(id) {

    d3.json("samples.json").then((data)=> {

        var metadata = data.metadata;

        console.log(metadata)


       var result = metadata.filter(meta => meta.id.toString() === id)[0];

       var demographicInfo = d3.select("#sample-metadata");
        

       demographicInfo.html("");


        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}


function init() {

    var dropdown = d3.select("#selDataset");


    d3.json("samples.json").then((data)=> {
        console.log(data)


        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });


        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();