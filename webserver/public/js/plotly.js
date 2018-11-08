plotlyIndex = 0;
analIndex = 0;

function showplotly(variable, Xdata, Ydata, type) {
    var trace = new Array()
    if (type == "scatter" || type == "bar" || type == "box") {
        trace = lineBarBox(variable, Xdata, Ydata, type);
    } else if (type == "markers") {
        trace = scatter(variable, Xdata, Ydata, type);
    } else if (type == "pie") {
        trace = pie(variable, Xdata, Ydata, type);
    }
    if(plotlyIndex==0){
        $('#graph').empty();  
    }
    //$('#plotlyGraph').empty();
    var name = "plotlyGraph" + plotlyIndex;
    plotlyIndex++;
    var btnName = "btn"+name;
    var btn= $('<input type="button" id='+btnName+' class="btn btn-outline-danger btn-sm" onclick="plotlyClose(this.id)" value="X"/>');
    $('#graph').append(btn);
    var div= $('<div id='+name+'/>');
    $('#graph').append(div);
    Plotly.newPlot(name, trace)
    
}

function show3dplotly(variable, Xdata, Ydata,Zdata, type) {
    var trace = new Array()
    for (i = 0; i < variable.length; i++) {
        if (type == "markers" || type == "lines") {
            trace[i] = {
                x: Xdata[i],
                y: Ydata[i],
                z: Zdata[i],
                mode: type,
                // marker: {
                //     size: 12,
                //     line: {
                //     color: 'rgba(217, 217, 217, 0.14)',
                //     width: 0.5},
                //     opacity: 0.8},
                type: 'scatter3d'
            };
        } else if (type == "bubble") {
            trace[i] = {
                x: Xdata[i],
                y: Ydata[i],
                mode: 'markers',
                marker: {
                    size: Zdata[i]
                }
            };
        }
    }
    if(plotlyIndex==0){
        $('#graph').empty();  
    }
    //$('#plotlyGraph').empty();
    var name = "plotlyGraph" + plotlyIndex;
    plotlyIndex++;
    var btnName = "btn"+name;
    var btn= $('<input type="button" id='+btnName+' class="btn btn-outline-danger btn-sm" onclick="plotlyClose(this.id)" value="X"/>');
    $('#graph').append(btn);
    var div= $('<div id='+name+'/>');
    $('#graph').append(div);
    Plotly.newPlot(name, trace)
    
}

function plotlyClose(id){
    $('#'+id).remove()
    id = id.slice(3,id.length);
    $('#'+id).remove()
    //$('#'.remove();
}
function showOutlierBox(variable, Ydata) {
    var trace = new Array()
    for (i = 0; i < variable.length; i++) {
        trace[i] = {
            y: Ydata[i],
            type: "box",
            name: variable[i]
        };
    }

    Plotly.newPlot('outlierBox', trace)
}

function showStrScatter(variable, Ydata) {
    trace = {
        y: Ydata,
        mode: "markers",
        type: "scatter",
        name: variable
    }
    var data = [trace]
    Plotly.newPlot("stratificationScatter", data, { dragmode: 'select' })
    var gd = document.getElementById('stratificationScatter');
    var d3 = Plotly.d3;
    var formatter = d3.format('.2f');
    gd.on('plotly_selected', (eventData) => {
        yRange = eventData.range.y;
        xRange = eventData.range.x;
        Plotly.relayout('stratificationScatter', 'title', `index range:[${xRange.map(formatter).join(', ')}]<br>y range:[${yRange.map(formatter).join(', ')}]`);
    })
}





function lineBarBox(variable, Xdata, Ydata, type) {
    var trace = new Array();
    // if (Xdata.length < 1) {
    //     for (i = 0; i < variable.length; i++) {
    //         trace[i] = {
    //             y: Ydata[i],
    //             type: type,
    //             name: variable[i]
    //         };
    //     }
    //     return trace;
    // }
    for (i = 0; i < variable.length; i++) {
        trace[i] = {
            x: Xdata[i],
            y: Ydata[i],
            type: type,
            name: variable[i]
        };
    }
    return trace;
}


function scatter(variable, Xdata, Ydata, type) {
    var trace = new Array();
    // if (Xdata.length < 1) {
    //     for (i = 0; i < variable.length; i++) {
    //         trace[i] = {
    //             y: Ydata[i],
    //             mode: type,
    //             type: "scatter",
    //             name: variable[i]
    //         };
    //     }
    //     return trace;
    // }
    for (i = 0; i < variable.length; i++) {
        trace[i] = {
            x: Xdata[i],
            y: Ydata[i],
            mode: type,
            type: "scatter",
            name: variable[i]
        };
    }
    return trace;
}


function pie(variable, Xdata, Ydata, type) {
    var trace = new Array();
    for (i = 0; i < variable.length; i++) {
        trace[i] = {
            labels: Xdata[i],
            values: Ydata[i],
            type: type,
            name: variable[i]
        };
    }
    return trace;
}
