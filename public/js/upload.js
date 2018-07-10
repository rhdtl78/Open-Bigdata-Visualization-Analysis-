var fileInput = document.getElementById("upload-csv");
var submit = document.getElementById('submit-csv');

submit.addEventListener("click", function() {
  try{
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
    success: function(res) {    
      showSummary(res.data);
      $('#close-modal').trigger('click');
    },
    error: function(res) {
    }
  });
}catch(error){
  $('#close-modal').trigger('click');
}
});