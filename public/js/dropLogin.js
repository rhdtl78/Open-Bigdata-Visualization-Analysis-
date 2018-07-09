function dropLogin(std){
    if(std){
        $('#signIn').hide();
        $('#signUp').hide();
        // $('.fa-user').hide();
        // $('.fa-gear').hide();
        $('#signOutLi').show();
        // $('.fa-sign-out').show();
    } else {
        $('#signIn').show();
        $('#signUp').show();
        // $('.fa-user').show();
        // $('.fa-gear').show();
        $('#signOutLi').hide();
        // $('.fa-sign-out').hide();
    }
}
$('#signOutLi').hide();
$('.modal').on('hidden.bs.modal', function (e) {

  $(this).find('input').val('')
});
$('#exampleModalCenter').on('shown.bs.modal', function (e) {
    if(loginCheck()){
        
    }else{
        alert("Please login first")
        $('#close-modal').trigger('click');
    }
});

function loginCheck(){
    try{
    var uid = firebase.auth().currentUser.uid;
    return true;
    }catch(error){
        //alert("Please login first")
        //$('#close-modal').trigger('click');
        return false;
    }
}