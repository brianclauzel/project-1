// open weather api key cd03ae7d8279897013fd57ac14371c18
// currency layer api key http://www.apilayer.net/api/liveaccess_key=e7309c7b642881620d0502e49a7380e5
//google places api key AIzaSyB_Xfhs13XHrV22XM0BH6cxMe3gu3yx4eg
var config = {
    apiKey: "AIzaSyDhKEhP_x-HQhGALn5FPwE9oWsLWeg5xMM",
    authDomain: "project-1-d73ca.firebaseapp.com",
    databaseURL: "https://project-1-d73ca.firebaseio.com",
    projectId: "project-1-d73ca",
    storageBucket: "",
    messagingSenderId: "884487038041"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

   
  
  var queryURLCurrencyLayer = "http://www.apilayer.net/api/live?access_key=e7309c7b642881620d0502e49a7380e5";
//   var queryURLGooglePlaces = "AIzaSyB_Xfhs13XHrV22XM0BH6cxMe3gu3yx4eg"


//google places api 
 function activatePlacesSearch() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });

  

  
    var input = document.getElementById('search-term');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
          });
          marker.setVisible(true);

          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-id'].textContent = place.place_id;
          infowindowContent.children['place-address'].textContent =
              place.formatted_address;
          infowindow.open(map, marker);
        });
        
      }


  //getting the value of the entered city to add into the weather api
  $("body").on("click", ".search-button", function(){
    var inputChange = $("#search-term").val().trim();
    var weatherLocation = inputChange.replace(" ", "+");
    var cityWeather = $(".city-info").text(weatherLocation);
    
    
    var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation + "&units=imperial&appid=cd03ae7d8279897013fd57ac14371c18";
    console.log(weatherLocation);

    //weather api call
    $.ajax({
        url: queryURLOpenWeather,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $(".body").append("the temp is: " + response.main.temp + " in farenheit.");
     });
  });

  

//curency layer API

    $.ajax({
        url: queryURLCurrencyLayer,
        method: "GET"
    }).then(function(response){
        
    });