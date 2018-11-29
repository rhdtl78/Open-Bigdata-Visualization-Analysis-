var fileOutput = document.getElementById("output-csv");
var download = document.getElementById('download-csv');


download.addEventListener("click", function() {
  console.log("download");
  try {
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;
    console.log(uid)
    window.open(`/download?uid=${uid}`,'newWindow');
    // $.ajax({
    //   data:{
    //     uid: uid
    //   } ,
    //   url: "/download",
    //   beforeSend: function () {
    //     loading();
    //   },
    //   complete: function () {
    //     complete()
    //   },
    //   success: function(res) {
        
    //     console.log(res);
    //     $('#close-modal').trigger('click');
    //   },
    //   error: function(res) {}
    // });
    // reader.readAsText(file, 'euc-kr');
    $('#close-modal').trigger('click');

  } catch (error) {
    console.log(error);
    
    $('#close-modal').trigger('click');
  }
});
