
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
  })

