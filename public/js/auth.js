firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
  
    } else {
      $('#signInModal').modal('show');
    }
  });
  
  
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      $.ajax({
        url: '/db/sessionOut',
        type: 'post',
        data: {
          uid: firebase.auth().currentUser.uid
        },
        success: function(res) {
          console.log('s');
        },
        error: function(res) {
          console.log(res);
        }
      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  
  
  $('#submit-signIn').click(function() {
    var email = $('#signInEmail').val();
    var password = $('#signInPassword').val();
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function() {
        var currentUser = firebase.auth().currentUser;
        alert(currentUser.displayName + "님 환영합니다!!");
        $(".close").trigger('click');
      })
      .catch(function(error) {
        console.log(error.code, error.message);
      });
  });
  
  
  $("#submit-signUp").click(function() {
    // validating
    var $firstName = $('#inputName');
    var $lastName = $("#inputLastName");
    var $email = $('#inputEmail');
    var $password = $('#inputPassword');
    var $confPasswd = $('#confirmPassword');
  
  
    if ($password.val() != $confPasswd.val()) {
      alert("비밀번호를 다시 확인해 주십시오. 비밀번호 확인과 비밀번호는 같아야 합니다.");
    } else {
      firebase.auth().createUserWithEmailAndPassword($email.val(), $password.val())
        .then(function() {
          var currentUser = firebase.auth().currentUser;
          currentUser.updateProfile({
            displayName: $lastName.val() + " " + $firstName.val()
          }).then(function() {
            alert(currentUser.displayName + "님 환영합니다!!");
            $(".close").trigger('click');
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
  
    }
  
  });
  
  $('#signOut').click(function() {
    var uid = firebase.auth().currentUser.uid;
    console.log(uid);
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      $.ajax({
        url: '/db/sessionOut',
        type: 'post',
        data: {
          uid: uid
        },
        success: function(res) {
          console.log(res);
        },
        error: function(res) {
          console.log(res);
        }
      })
    }).catch(function(error) {
      // An error happened.
    });
  });