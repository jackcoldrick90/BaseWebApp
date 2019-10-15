function getWeather(searchQuery){
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=metric&APPID="+apiKey;
  
  $(".city").text("");
  $(".temp").text((""));
  $(".error-message").text((""));
  
  $.ajax(url, {
    success: function(data){
      console.log(data);
      $(".city").text(data.name);
      $(".temp").text(data.main.temp);
    },
    error: function(error){
      $(".error-message").text("An error occured");
    }
  });
}

function searchWeather(){
  console.log('searching the weather');
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
}

function handleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function handleFormSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  console.log(postTitle);
  console.log(postBody);
  addMessage(postTitle,postBody);
}

function addMessage(postTitle,postBody){
  var postData = {
    title: postTitle,
    body: postBody
  }
  var database = firebase.database().ref("jacks-web-app");
  var newPostRef = database.push();
  newPostRef.set({
    postData
  }, function(error) {
      if (error) {
        console.log("THERE WAS AN ERROR");
      } else {
        window.location.reload();
        console.log("SUCCESS");
    }
  });
}

function getPosts(){
  return firebase.database().ref('jacks-web-app').once('value').then(function(snapshot) {
    var posts = snapshot.val();
    console.log(posts);

    for(var postKey in posts){
      var post = posts[postKey];
      console.log(post);
      $("#post-listing").append("<div>" + post.postData.title + " - " + post.postData.body + "</div>");
    }


  });
}

$(document).ready(function(){
  getPosts();

});