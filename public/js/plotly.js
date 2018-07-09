
/*
    태훈이에게
    일단 해야하는 작업이 파이그래프랑 산점도인데 x축을 선택하지 않은 경우에도 그래프를
    그려줄 수 있어. 그래서 xdata길이 체크하는 거야
    plotly basic chart라고 구글에 검색해서 plotly사이트 가면 금방 예제 찾을 수 있어
    파이는 그냥 안해놓은건데 산점도는 타입이 라인과 같고 모드가 달라서 못해놓은 것.
    파이 그래프는 내가 잘 몰라서 안했었어.
    그리고 모달창에서 x축은 하나만 선택하게 바꿔줘. 그니까 x축을 선택을 마치 라디오버튼 선택
    하듯이 하나 선택하면 전에 선택한게 사라지게. jquery사용하면 할 수 있음
    그리고 모달창을 너 말대로 chart가 아닌 종류별로 선택하는 것으로 갈려면 모달창아래에 있는 
    라이오버튼이 없어도 됨. 너가 방식을 바꿔도 좋음. 
    
    요약
    1. 파이그래프와 산점도 완성. 산점도는 x축없이도 그릴 수 있게
    2. 그래프 모달창에서 x축 선택은 라디오 버튼처럼
    3. 그래프 모달창아래에 있는 라디오 버튼을 없애고 드롭박스에서 선택해서 그래프 그릴 수 있게 변경 

    다 못해와도 좋음. 일단 할 수 있는 만큼 하고 월요일날 봅세
*/

function showplotly(variable, Xdata, Ydata, type) {
    var trace = new Array()
    if (type == "scatter" || type == "bar" || type == "box") {
        trace = lineBarBox(variable, Xdata, Ydata, type);
    } else if (type == "markers") {
        trace = scatter(variable, Xdata, Ydata, type);
    } else if (type == "pie") {
        trace = pie(variable, Xdata, Ydata, type);
    }

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
        Plotly.relayout('stratificationScatter', 'title', `y range:[${yRange.map(formatter).join(', ')}]`);
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
