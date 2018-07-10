var fileInput = document.getElementById("upload-csv");
var submit = document.getElementById('submit-csv');

$('#filegroup').click(function(e) {
  $('#upload-csv').change(function () {
    var files = this.files;
    $('#userfile').val(files[0].name);
  });

  var files = $('#upload-csv').click();

});

submit.addEventListener("click", function() {
  try {
    var file = fileInput.files[0];
    var formData = new FormData();
    var uid = firebase.auth().currentUser.uid;
    formData.append('csvfile', file, file.name);

    $.ajax({
      data: formData,
      url: "/parse/csv?uid=" + uid,
      processData: false,
      contentType: false,
      type: 'post',
      beforeSend: function () {
        loading();
      },
      complete: function () {
        complete()
      },
      success: function(res) {
        showSummary(res.data);
        $('#close-modal').trigger('click');
      },
      error: function(res) {}
    });
  } catch (error) {
    $('#close-modal').trigger('click');
  }
});
