
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
      var tBody = $("<div>");
      var fare = response.results[0].fare.price_per_adult.total_fare;
      var addingF = $(tBody).html(fare);
      $("#fare").append(addingF);
     
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
  }).then(function(source) {
    console.log(source);
    $("#exampleInputFrom").html(source.origin)
  })
  })

