// open weather api key cd03ae7d8279897013fd57ac14371c18
// currency layer api key http://www.apilayer.net/api/live?access_key=e7309c7b642881620d0502e49a7380e5&currencies=EUR,GBP,CAD,CHF,JPY,AUD&source=USD&format=1
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

//   var location = "";
  var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + "san+diego" + "&appid=cd03ae7d8279897013fd57ac14371c18";
  var queryURLCurrencyLayer = "http://www.apilayer.net/api/live?access_key=e7309c7b642881620d0502e49a7380e5&currencies=EUR,GBP,CAD,CHF,JPY,AUD,MXN&source=USD&format=1";
//   var queryURLGooglePlaces = "AIzaSyB_Xfhs13XHrV22XM0BH6cxMe3gu3yx4eg"

//open weather API

    


    var map;
    var infowindow;

    function initMap() {
      var pyrmont = {lat: -33.867, lng: 151.195};

      map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['store']
      }, callback);
    }

    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    $.ajax({
        url: queryURLOpenWeather,
        method: "GET"
    }).then(function(response){
        console.log(response);
     });

//curency layer API

$.ajax ({
  url: queryURLCurrencyLayer,
  method: "GET",  
  }).then(function(source) {
    console.log(source);
    $(".GBP").html('$'+source.quotes.USDGBP)
    $(".EUR").html('$'+source.quotes.USDEUR)
    $(".CHF").html('$'+source.quotes.USDCHF)
    $(".JPY").html('$'+source.quotes.USDJPY)
    $(".AUD").html('$'+source.quotes.USDAUD)
    $(".MXN").html('$'+source.quotes.USDMXN)
    
  }).catch(function(error) {
    console.log(error)
  })
