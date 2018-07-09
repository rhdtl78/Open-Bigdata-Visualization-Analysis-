function correlation() {
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;

  $.ajax({
    data:{"uid":uid},
    url: "/correlation",
    success: function (res) {
      data = res.data;
      variable = res.variable
      showCorrelation(data, variable);
    },
    error: function (res) {
      console.log(res);
    }
  });

}
function showCorrelation(data, variable) {
  $('#analysis').empty();
  $('#analysis').append($('<div>').attr('id', 'analysisGraph'));
  var heatData = new Array();
  for (i = 0; i < variable.length; i++) {
    heatData.push(data[i]);
  }
  var trace = [
    {
      z: heatData,
      x: variable,
      y: variable,
      type: 'heatmap'
    }
  ];

  Plotly.newPlot('analysisGraph', trace);

}