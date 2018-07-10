function showplotly(variable, Xdata, Ydata, type) {
    var trace = new Array()
    if (type == "scatter" || type == "bar" || type == "box") {
        trace = lineBarBox(variable, Xdata, Ydata, type);
    } else if (type == "markers") {
        trace = scatter(variable, Xdata, Ydata, type);
    } else if (type == "pie") {
        trace = pie(variable, Xdata, Ydata, type);
    }

    $('#plotlyGraph').empty();
    Plotly.newPlot('plotlyGraph', trace)
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
    if (Xdata.length < 1) {
        for (i = 0; i < variable.length; i++) {
            trace[i] = {
                y: Ydata[i],
                type: type,
                name: variable[i]
            };
        }
        return trace;
    }
    for (i = 0; i < variable.length; i++) {
        trace[i] = {
            x: Xdata[0],
            y: Ydata[i],
            type: type,
            name: variable[i]
        };
    }
    return trace;
}


function scatter(variable, Xdata, Ydata, type) {
    var trace = new Array();
    if (Xdata.length < 1) {
        for (i = 0; i < variable.length; i++) {
            trace[i] = {
                y: Ydata[i],
                mode: type,
                type: "scatter",
                name: variable[i]
            };
        }
        return trace;
    }
    for (i = 0; i < variable.length; i++) {
        trace[i] = {
            x: Xdata[0],
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
            labels: Xdata[0],
            values: Ydata[i],
            type: type,
            name: variable[i]
        };
    }
    return trace;
}
