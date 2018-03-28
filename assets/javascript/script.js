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

          // infowindowContent.children['place-name'].textContent = place.name;
          // infowindowContent.children['place-id'].textContent = place.place_id;
          // infowindowContent.children['place-address'].textContent =
          //     place.formatted_address;
          // infowindow.open(map, marker);
        });
        
      }


  //getting the value of the entered city to add into the weather api
  $(document).on("click", "#searchButton", function(event){
    event.preventDefault();

      console.log("hi");
    var inputChange = $("#locationSearch").val().trim();

    console.log($("#locationSearch").val().trim());

    var weatherLocation = inputChange.replace(" ", "+");

    var testy = inputChange.replace(" ", "+").split(",");

    var testy1 = testy[0];

    console.log(testy1);

    var stringSplit = inputChange.split(",");
    
    var stringOne = stringSplit[0];

    $("#weatherInfo").append(stringOne);
    
    
    
    var queryURLOpenWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherLocation + "&units=imperial&appid=cd03ae7d8279897013fd57ac14371c18";
    var queryURLOpenWeatherTwo = "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherLocation + "&units=imperial&appid=cd03ae7d8279897013fd57ac14371c18";
    var queryURLAmadeus = "https://api.sandbox.amadeus.com/v1.2/points-of-interest/yapq-search-text?city_name=" + testy1 + "&geonames=true&number_of_results=5&apikey=0t376ZdSmzCLYEX2EkTXpb8iEABUZ2Hp"
 
    console.log(weatherLocation);


    var weatherData = {
      locationSearch: inputChange
    }

    database.ref().push(weatherData);

    $("#locationSearch").val("");

    
    //current weather api call
    $.ajax({
        url: queryURLOpenWeather,
        method: "GET"
    }).then(function(response){
        console.log(response);  
        console.log(response.main.temp);
       
        
        var tempy = response.main.temp;
        console.log(tempy + ": hi");
        var temp = "<div>The temp is: " + response.main.temp + "°F.</div>";
        var humid = "<div>The humidity is: " + response.main.humidity + "%.</div>";
        var pressure = "<div>The pressure  is: " + response.main.pressure + ".</div>";
        console.log(temp);
        $("#weatherInfo").text("");
        $("#weatherInfo").append(stringOne);
        $("#weatherInfo").append(temp);
        $("#weatherInfo").append(humid);
        $("#weatherInfo").append(pressure);


        // var weatherInfo = $(weatherDiv).text(temp, humid, pressure);
       
      // $("#weatherInfo").text(response.main.temp);
      
      

     });

     //forecast weather api call
     $.ajax({
      url: queryURLOpenWeatherTwo,
      method: "GET"
      }).then(function(response){
        console.log(response);
        console.log(response.list[0].main.temp);  
        $("#dayOne").text("Date: " + response.list[0].dt_txt);
        $("#dayTwo").text("Date: " + response.list[8].dt_txt);
        $("#dayThree").text("Date: " + response.list[16].dt_txt);
        $("#dayFour").text("Date: " + response.list[24].dt_txt);
        $("#dayFive").text("Date: " + response.list[32].dt_txt);
        $("#fDescription1").text(response.list[0].weather[0].description);
 $("#fDescription2").text(response.list[8].weather[0].description);
$("#fDescription3").text(response.list[16].weather[0].description);
$("#fDescription4").text(response.list[24].weather[0].description);
$("#fDescription5").text(response.list[32].weather[0].description);
$("#temp2").text(response.list[0].main.temp + "°F");
$("#temp1").text(response.list[8].main.temp + "°F");
$("#temp3").text(response.list[16].main.temp + "°F");
$("#temp4").text(response.list[24].main.temp + "°F");
$("#temp5").text(response.list[32].main.temp + "°F");
$("#row1").text(response.list[0].main.humidity);
 $("#row2").text(response.list[8].main.humidity);
$("#row3").text(response.list[16].main.humidity);
$("#row4").text(response.list[24].main.humidity);
$("#row5").text(response.list[32].main.humidity);
$("#wind1").text(response.list[0].wind.speed + " mph");
 $("#wind2").text(response.list[8].wind.speed + " mph");
$("#wind3").text(response.list[16].wind.speed + " mph");
$("#wind4").text(response.list[24].wind.speed + " mph");
$("#wind5").text(response.list[32].wind.speed + " mph");
$("#p1").text(response.list[0].main.pressure);
 $("#p2").text(response.list[8].main.pressure);
$("#p3").text(response.list[16].main.pressure);
$("#p4").text(response.list[24].main.pressure);
$("#p5").text(response.list[32].main.pressure);

   
      });
      

      $.ajax ({
        url: queryURLAmadeus,
        method: "GET",
      }).then(function(response) {
     
        console.log(response);
        console.log(response.current_city.name);
        console.log(response.points_of_interest[0].details.short_description)
        console.log(response.points_of_interest[0].main_image)
        console.log(response.points_of_interest[0].title)
        console.log(response.points_of_interest[0].location.google_maps_link)
     
        var cityName = response.current_city.name;
     
        var description = response.points_of_interest[0].details.short_description;
     
        var image = response.points_of_interest[0].main_image;
     
        var title = response.points_of_interest[0].title; 
     
        //City Name
        //$("#cityName").html('City Name: ' + response.current_city.name);
        $("#cityName").html(response.current_city.name);
     
        //Attraction 0 
        $("#title0").html('Attraction: ' + response.points_of_interest[0].title);
        $("#description0").html('Description: ' + response.points_of_interest[0].details.short_description);
        $(".image0").attr("src", response.points_of_interest[0].main_image);
     
        //Attraction 1 
        $("#title1").html('Attraction: ' + response.points_of_interest[1].title);
        $("#description1").html('Description: ' + response.points_of_interest[1].details.short_description);
        $(".image1").attr("src", response.points_of_interest[1].main_image);
     
        //Attraction 2
        $("#title2").html('Attraction: ' + response.points_of_interest[2].title);
        $("#description2").html('Description: ' + response.points_of_interest[2].details.short_description);
        $(".image2").attr("src", response.points_of_interest[2].main_image);
     
        //Attraction 3   
        $(".image3").attr("src", response.points_of_interest[3].main_image);
        $("#title3").html('Attraction: ' + response.points_of_interest[3].title);
        $("#description3").html('Description: ' + response.points_of_interest[3].details.short_description);
        
        //Attraction 4
       $(".image4").attr("src", response.points_of_interest[4].main_image);
       $("#title4").html('Attraction: ' + response.points_of_interest[4].title);
       $("#description4").html('Description: ' + response.points_of_interest[4].details.short_description);
     
      });



  });

  
  

//curency layer API

$.ajax ({
  url: queryURLCurrencyLayer,
  method: "GET",  
  }).then(function(source) {
    console.log(source);
    $("#GBP").html('$'+source.quotes.USDGBP);
    $("#EUR").html('$'+source.quotes.USDEUR);
    $("#CHF").html('$'+source.quotes.USDCHF);
    $("#JPY").html('$'+source.quotes.USDJPY);
    $("#AUD").html('$'+source.quotes.USDAUD);
    $("#MXN").html('$'+source.quotes.USDMXN);
    
    
  }).catch(function(error) {
    console.log(error)
  })

  //recent search pull from firebase
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var travelLocation = childSnapshot.val().locationSearch;
    $("#recentSearchLocations").prepend("<div>" + travelLocation + "</div>");
  });

 
 


 
  //FLight details 
$(".btn").on("click", function(event){
  event.preventDefault();

  var origin = $("#exampleInputFrom").val().trim();
  var destination = $("#exampleInputTo").val().trim();
  var dates = $("#exampleInputDates").val().trim();
  var toDates= $("#exampleInputToDates").val().trim();
  var trav = $("#exampleInputTravelers").val().trim();
  var budget = $("#max_price").val().trim();

console.log(origin)
console.log(destination)
console.log(dates)
console.log(toDates)
console.log(trav) 
console.log(budget)

var corsProxy = "https://cors-anywhere.herokuapp.com/";
var queryURLAmadeus = corsProxy +"https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?origin=" + origin + "&destination=" + destination + "&departure_date=" + dates + "&return_date=" + toDates + "&max_price=" + budget + "&currency=USD" + "&number_of_results=5&apikey=0t376ZdSmzCLYEX2EkTXpb8iEABUZ2Hp"

console.log(queryURLAmadeus)

$.ajax ({
  url: queryURLAmadeus,
  method: "GET",
}).then(function(response) {
 console.log(response);
 console.log(response.results[0].fare.price_per_adult.total_fare);
 console.log(response.results[0].itineraries[0].outbound.flights[0].departs_at);
 console.log(response.results[0].itineraries[0].outbound.flights[0].arrives_at);
 
    var fare = response.results[0].fare.price_per_adult.total_fare;
    $("#fare").text("$" + fare);
    
    var depart = response.results[0].itineraries[0].outbound.flights[0].departs_at;
    $("#depart").text(depart);
    
    var ariv = response.results[0].itineraries[0].outbound.flights[0].arrives_at;
    $("#arrive").text(ariv);
   
    var fare2 = response.results[1].fare.price_per_adult.total_fare;
    $("#fare2").text("$" + fare2);
    
    var depart2 = response.results[1].itineraries[0].outbound.flights[0].departs_at;
    $("#depart2").text(depart2);
    
    var ariv2 = response.results[1].itineraries[0].outbound.flights[0].arrives_at;
    $("#arrive2").text(ariv2);

    var fare3 = response.results[2].fare.price_per_adult.total_fare;
    $("#fare3").text("$" + fare3);

    var depart3 = response.results[2].itineraries[0].outbound.flights[0].departs_at;
    $("#depart3").text(depart3);

    var ariv3 = response.results[2].itineraries[0].outbound.flights[0].arrives_at;
    $("#arrive3").text(ariv3);

    var fare4 = response.results[3].fare.price_per_adult.total_fare;
    $("#fare4").text("$" + fare4);

    var depart4 = response.results[3].itineraries[0].outbound.flights[0].departs_at;
    $("#depart4").text(depart4);

    var ariv4 = response.results[3].itineraries[0].outbound.flights[0].arrives_at;
    $("#arrive4").text(ariv4);

    var fare5 = response.results[4].fare.price_per_adult.total_fare;
    $("#fare5").text("$" + fare5);

    var depart5 = response.results[4].itineraries[0].outbound.flights[0].departs_at;
    $("#depart5").text(depart5);

    var ariv5 = response.results[4].itineraries[0].outbound.flights[0].arrives_at;
    $("#arrive5").text(ariv5);


});
})


//hotel details 
$(".btn").on("click", function(event){
  event.preventDefault();
 
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
  console.log(response.results[0].total_price.amount);

     var price = response.results[0].total_price.amount;
     $("#price").text("$" + price);
    
     var address = response.results[0].address.line1;
     $("#address").text(address);
    
     var hotelName = response.results[0].property_name;
     $("#hotelName").text(hotelName);
    
     var price2 = response.results[1].total_price.amount;
     $("#price2").text("$" + price);
    
     var address2 = response.results[1].address.line1;
     $("#address2").text(address2);
    
     var hotelName2 = response.results[1].property_name;
     $("#hotelName2").text(hotelName2);

     var price3 = response.results[2].total_price.amount;
     $("#price3").text("$" + price3);
     
     var address3 = response.results[2].address.line1;
     $("#address3").text(address3);
    
     var hotelName3 = response.results[2].property_name;
     $("#hotelName3").text(hotelName3);

     var price4 = response.results[3].total_price.amount;
     $("#price4").text("$" + price4);
    
     var address4 = response.results[3].address.line1;
     $("#address4").text(address4);
    
     var hotelName4 = response.results[3].property_name;
     $("#hotelName4").text(hotelName4);

     
     var price5 = response.results[4].total_price.amount;
     $("#price5").text("$" + price5);
    
     var address5 = response.results[4].address.line1;
     $("#address5").text(address5);
    
     var hotelName5 = response.results[4].property_name;
     $("#hotelName5").text(hotelName5);
})
});
  

  //firebase user sign in 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        var email_verified = user.emailVerified;

        if (email_verified) {

          document.getElementById('verify-btn').style.display = "none";
          document.getElementById("recentSearches").style.display = "block";
          document.getElementById("recentSearchLocations").style.display = "block";

        } else {
          
          document.getElementById("verify-btn").style.display = "block";

        }

        document.getElementById("user_para").innerHTML = "Welcome: " + email_id
        + "<br/> Verfied: " + email_verified;
  
      }
  
    } 
    
      else {
      // No user is signed in.
  
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        document.getElementById("recentSearches").style.display = "none";
        document.getElementById("recentSearchLocations").style.display = "none";
  
    }

  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
    
    });
  
  }
  
  function create_account() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
    });

  }

  function logout(){
    firebase.auth().signOut();
  }

  function send_verification() {

    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      document.getElementById("user_para").innerHTML = "Verification Email Sent.";
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });

  }
  