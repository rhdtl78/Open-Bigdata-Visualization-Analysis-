var fileInput = document.getElementById("upload-csv");
fileInput.addEventListener("change", function () {
  var file = this.files[0];
  var storage = firebase.storage();
  var storageRef = storage.ref().child('/CSV/' + file.name);
  storageRef.put(file).then(function(snapshot) {
    $.ajax({
      data : {"name" : file.name},
      url : "/parse/csv",
      success : function (res) {
        console.log(res);
      },
      error : function (res) {
        console.log(res);
      }
    });
  })
});
