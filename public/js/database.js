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
      success: function(res, state) {
        alert('Save Success');
        $('.close').trigger('click');
      },
      error: function(res, state) {
        console.log(res, state);
      }
    })
  });
  
  $('#load-database').click(function() {
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;
    $.ajax({
      url: "/db/list",
      data: {
        uid: uid
      },
      type: 'post',
      success: function(res, state) {
        var list = res.data;
        console.log(list);
        if (list.length != 0) {
          var table = $('<table/>', {
            'class': 'table'
          }).appendTo($('#load-body'));
          table.append(
            $('<thead/>').append(
              $('<tr/>').append(
                $('<th/>').text('No.')
              ).append(
                $('<th/>').text('Name')
              ).append(
                $('<th/>').text('Select')
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
                'name' : 'work-name-col'
              }).text(value)
            ).append(
              $('<td/>').append(
                $('<input/>', {
                  "type": "radio",
                  'id': value,
                  'name': 'work-radio'
                })
              )
            )
          });
        } else {
          var div = $('<div/>').text('No Saved Work Now');
          $('#load-body').append(div);
        }
      },
      error: function(res, state) {
  
      }
    })
  });
  
  
  
  $('#submit-load').click(function() {
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;
    var workName = $('input[name="work-radio"]:checked').attr('id');
    console.log(workName);
    $.ajax({
      url: "/db/load",
      data: {
        uid: uid,
        name: workName
      },
      type: "post",
      success: function(res, state) {
        console.log(res);
        alert("Load success");
        showSummary(res.data);
        $('.close').trigger('click');
  
      },
      error: function(res, state) {
        console.log(res, state);
      }
    })
  });