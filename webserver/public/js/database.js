$('#submit-save').click(function() {
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;
  var workName = $('#work-name').val();
  $.ajax({
    data: {
      uid: uid,
      name: workName
    },
    url: "/db/save",
    type: 'post',
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function(res, state) {
      alert('Save Success');
      $('.close').trigger('click');
    },
    error: function(res, state) {
      // console.log(res, state);
    }
  })
});

$('#load-database').click(function() {
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;
  listUp(uid);
});

function listUp(uid) {
  $.ajax({
    url: "/db/list",
    data: {
      uid: uid
    },
    type: 'post',
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function(res, state) {
      var list = res.data;
      if (list.length != 0) {
        var table = $('<table/>', {
          'class': 'table'
        }).appendTo($('#load-body').empty());
        table.append(
          $('<thead/>').append(
            $('<tr/>').append(
              $('<th/>').text('No.')
            ).append(
              $('<th/>').text('Name')
            ).append(
              $('<th/>').text('Select')
            ).append(
              $('<th/>').text('Delete')
            )
          )
        )
        var tbody = $('<tbody/>').appendTo(table);
        list.forEach(function(value, index) {
          var tr = $('<tr/>').appendTo(tbody);
          tr.append(
            $('<td/>').text(index + 1)
          ).append(
            $('<td/>', {
              'name': 'work-name-col'
            }).text(value)
          ).append(
            $('<td/>').append(
              $('<input/>', {
                "type": "radio",
                'id': value,
                'name': 'work-radio'
              })
            )
          ).append(
            $('<td/>').append(
              $('<button/>', {
                'type': 'button',
                'class': 'btn btn-sm btn-danger',
                'onClick': 'deleteSave("' + value + '")'
              }).text('DELETE')
            )
          )
        });
      } else {
        var div = $('<div/>').text('No Saved Work Now');
        $('#load-body').empty().append(div);
      }
    },
    error: function(res, state) {

    }
  });
}

$('#submit-load').click(function() {
  var currentUser = firebase.auth().currentUser;
  var uid = currentUser.uid;
  var workName = $('input[name="work-radio"]:checked').attr('id');
  $.ajax({
    url: "/db/load",
    data: {
      uid: uid,
      name: workName
    },
    type: "post",
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function(res, state) {
      // console.log(res);
      alert("Load success");
      
      showData(res.data, res.variables);
      showSummary(res.summary);
      $('.close').trigger('click');
    },
    error: function(res, state) {
      // console.log(res, state);
    }
  })
});


function deleteSave(workName) {
  var currentUser = firebase.auth().currentUser
  var uid = currentUser.uid;
  $.ajax({
    url: '/db/delete',
    type: 'post',
    data: {
      uid: uid,
      name: workName
    },
    beforeSend: function () {
      loading();
    },
    complete: function () {
      complete()
    },
    success: function (res, state) {
      // console.log(state, 'del success');
      alert('Delete Success');
      listUp(uid)
    },
    error: function (res, state) {
      // console.log(statr, 'del error');
    }
  })
}
