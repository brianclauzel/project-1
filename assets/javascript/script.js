// open weather api key cd03ae7d8279897013fd57ac14371c18
// currency layer api key http://www.apilayer.net/api/live?access_key=e7309c7b642881620d0502e49a7380e5&currencies=EUR,GBP,CAD,CHF,JPY,AUD,MXN&source=USD&format=1
//google places api key AIzaSyB_Xfhs13XHrV22XM0BH6cxMe3gu3yx4eg
var config = {
      apiKey: "AIzaSyBRS1dAa6s1fEmqNluML-JTh8B-4efk1Ag",
      authDomain: "project-1-d9c1d.firebaseapp.com",
      databaseURL: "https://project-1-d9c1d.firebaseio.com",
      projectId: "project-1-d9c1d",
      storageBucket: "",
      messagingSenderId: "761973646492"
  };

  firebase.initializeApp(config);

  var database = firebase.database();



//   var location = "";
  var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + "san+diego" + "&appid=cd03ae7d8279897013fd57ac14371c18";

  var queryURLCurrencyLayer = "http://www.apilayer.net/api/live?access_key=e7309c7b642881620d0502e49a7380e5&currencies=EUR,GBP,CAD,CHF,JPY,AUD,MXN&source=USD&format=1";






//   var queryURLGooglePlaces = "AIzaSyB_Xfhs13XHrV22XM0BH6cxMe3gu3yx4eg"


//google places api 
 function activatePlacesSearch() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });

  

  
    var input = document.getElementById('locationSearch');
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
  $("body").on("click", ".searchButton", function(event){
    event.preventDefault();

    var inputChange = $("#locationSearch").val().trim();
    var weatherLocation = inputChange.replace(" ", "+");
    var cityWeather = $(".city-info").text(weatherLocation);
    
    
    var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation + "&units=imperial&appid=cd03ae7d8279897013fd57ac14371c18";
    console.log(weatherLocation);


    var weatherData = {
      locationSearch: inputChange
    }

    database.ref().push(weatherData);

    $("#locationSearch").val("");

    
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

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var travelLocation = childSnapshot.val().locationSearch;
    $("#places").append("<div>" + travelLocation + "</div>");
  });


 
  //updated flight ajax call
  //updated hotel ajax and endpoint call
  $(".btn").on("click", function(event) {
    event.preventDefault();
    var origin = $("#exampleInputFrom").val();
    var destination = $("#exampleInputTo").val();
    var dates = $("#exampleInputDates").val();
    var toDates= $("#exampleInputToDates").val();
    var trav = $("#exampleInputTravelers").val();
  console.log(origin);
  console.log(destination);
  console.log(dates);
  console.log(toDates);
  console.log(trav); 
  var corsProxy = "https://cors-anywhere.herokuapp.com/";
  var queryURLAmadeus = corsProxy +"https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?origin=" + origin + "&destination=" + destination + "&departure_date=" + dates + "&return_date=" + toDates + "&number_of_results=5&apikey=0t376ZdSmzCLYEX2EkTXpb8iEABUZ2Hp"
  console.log(queryURLAmadeus);
  var location = $("#exampleInputTo").val().trim();
      var checkIn = $("#exampleInputDates").val().trim();
      var checkOut= $("#exampleInputToDates").val().trim();
      
    console.log(location)
    console.log(checkIn)
    console.log(checkOut)
    
    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var queryURLAmadeus2 = corsProxy +"https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?location=" + location + "&check_in=" + checkIn + "&check_out=" + checkOut + "&currency=USD" + "&number_of_results=5&apikey=0t376ZdSmzCLYEX2EkTXpb8iEABUZ2Hp"
    
    console.log(queryURLAmadeus2)
    
    $.ajax ({
      url: queryURLAmadeus2,
      method: "GET",
    }).then(function(response) {
      console.log(response);
      console.log(response.results[0].property_name);
      var body = $("<div>");
      var hotel = response.results[0].property_name;
      var addingH = $(body).text(hotel);
      $("#hotelName").text(hotel);
    })
    
  $.ajax ({
    url: queryURLAmadeus,
    method: "GET",
  }).then(function(response) {
   console.log(response);
   console.log(response.results[0].fare.price_per_adult.total_fare);
   console.log(response.results[0].itineraries[0].inbound.flights[0].arrives_at);
   console.log(response.results[0].itineraries[0].outbound.flights[0].departs_at);
      var tBody = $("<div>");
      var fare = response.results[0].fare.price_per_adult.total_fare;
      
      var addingF = $(tBody).text(fare);
      
      var depart = response.results[0].itineraries[0].outbound.flights[0].departs_at;
      
      var addingDep = $(tBody).text(depart);
      
      var ariv = response.results[0].itineraries[0].inbound.flights[0].arrives_at;
      
      var addingAriv = $(tBody).text(ariv);
      $("#fare").text(fare);
      $("#arrive").text(ariv);
      $("#depart").text(depart);
  });
  })

  //point of interest 
  $(".btn").on("click", function(event){
    event.preventDefault();
    var origin = $("#exampleInputFrom").val().trim();
    
  console.log(origin)
  
 
  var queryURLAmadeus = "https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text?city_name=" + origin + "&geonames=true" + "&number_of_results=5&apikey=0t376ZdSmzCLYEX2EkTXpb8iEABUZ2Hp"
  console.log(queryURLAmadeus)
 
  $.ajax ({
    url: queryURLAmadeus,
    method: "GET",
  }).then(function(source) {
    console.log(source);
    $("#exampleInputFrom").html(source.origin)
  });
  })