var apiKey= "c5d61dc25eb8f6eb71d75c8959de217b"
// Form to search for a city
    // Search button-- present with current and future conditions, save in history
function currentWeather(){
    // get user input
   var userInput= $(this).parent().siblings(".input-group").children(".form-control").val().trim()
   console.log(userInput)
    // convert to lat and long
    var geoURL= "http://api.openweathermap.org/geo/1.0/direct?q="+userInput+"&appid="+ apiKey
    fetch(geoURL).then(function(response){ 
        return response.json()
    }).then(function(data){
        console.log(data)
        var lat= data[0].lat
        var lon= data[0].lon
        var apiURL= "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=imperial"
        fetch(apiURL).then(function(response){
            return response.json()
        }).then(function(data){
            localStorage.setItem("name",data)
            console.log(data)
        })
    })
    // put into API
}

for( var i=0;i<localStorage.length;i++)
var currentCity= localStorage.getItem(i);
var currentCityName= $("#city-name");
currentCityName.append("#city-name");
console.log(currentCityName)
// Current weather conditions
    // Name
    // Date
    // icon representing weather conditions
    // temperature
    // wind speed
    // humidity
    // UV Index-- color 
        // Green= favorable
        // yellow= moderate
        // red=severe

// Future Weather conditions
    // 5-day forecast
        // Date
         // icon representing weather conditions
        // temperature
        // wind speed
         // humidity

// click on a city in search history
    // Presented with current and future conditions 
    $("#searchBtn").click(currentWeather)