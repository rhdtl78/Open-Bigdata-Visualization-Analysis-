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
    var reader = new FileReader();
    reader.onload = function (event) {
      var result = event.target.result;
      var encodedFile = new File([result], file.name);
      var formData = new FormData();
      var uid = firebase.auth().currentUser.uid;
      formData.append('csvfile', encodedFile);

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
          showData(res.data2,res.variable);
          $('#close-modal').trigger('click');
        },
        error: function(res) {}
      });
    }
    reader.readAsText(file, 'euc-kr');


  } catch (error) {
    $('#close-modal').trigger('click');
  }
});
