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