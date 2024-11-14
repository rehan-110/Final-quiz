const firebaseConfig = {
    apiKey: "AIzaSyCHD65l6gcs1jY37aEL1QGKXdERoafvCBs",
    authDomain: "quiz-app-df399.firebaseapp.com",
    databaseURL: "https://quiz-app-df399-default-rtdb.firebaseio.com",
    projectId: "quiz-app-df399",
    storageBucket: "quiz-app-df399.firebasestorage.app",
    messagingSenderId: "111660359669",
    appId: "1:111660359669:web:8958aa72de451418a2cabc"
  };
  
  var app = firebase.initializeApp(firebaseConfig);
  
  var auth = firebase.auth();
  
  function signUp() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
  
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        window.location.href = './home.html'
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  
  function Login() {
    var email = document.getElementById("email1");
    var password = document.getElementById("password1");
  
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        window.location.href = "./home.html";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }