// dark sky api key 635bf7b12da3244dca518136e0b65864
// currency layer api key http://www.apilayer.net/api/live?access_key=e7309c7b642881620d0502e49a7380e5

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

  var location = "";
  var queryURLDarkSky = "https://api.darksky.net/forecast/635bf7b12da3244dca518136e0b65864/" + location;
  var queryURLCurrencyLayer = "http://www.apilayer.net/api/live?access_key=e7309c7b642881620d0502e49a7380e5"

//Dark sky API

    $.ajax({
        URL: queryURLDarkSky,
        method: "GET"
    }).then(function(response){

    });

//curency layer API

    $.ajax({
        URL: queryURLCurrencyLayer,
        method: "GET"
    }).then(function(response){

    });