var fileInput = document.getElementById("upload-csv");
var submit = document.getElementById('submit-csv');

submit.addEventListener("click", function() {
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append('csvfile', file, file.name);
  $.ajax({
    data: formData,
    url: "/parse/csv",
    processData: false,
    contentType: false,
    type: 'post',
    success: function(res) {
      console.log(res);
      showSummary(res.data);
      $('#close-modal').trigger('click');
    },
    error: function(res) {
      console.log(res);
    }
  });
});
