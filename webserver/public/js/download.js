function downloadCSV() {
  try {
    var currentUser = firebase.auth().currentUser;
    var uid = currentUser.uid;
    console.log(uid)
    window.open(`/download?uid=${uid}`,'newWindow');

    $('#close-modal').trigger('click');

  } catch (error) {
    console.log(error);

    $('#close-modal').trigger('click');
  }
}
