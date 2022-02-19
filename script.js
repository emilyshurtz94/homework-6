var apiKey = "c5d61dc25eb8f6eb71d75c8959de217b"

var pastSearch = JSON.parse(localStorage.getItem("city")) || []
var cityDivEl = $('#city-name')
var pastSearchEl = $('#past-search')
// Form to search for a city
// Search button-- present with current and future conditions, save in history
function currentWeather() {
    // get user input
    console.log($(this))
    if($(this).parent().attr("id")=== "past-search"){
        var userInput= $(this).text()
    } else{
        var userInput = $(this).parent().siblings(".input-group").children(".form-control").val().trim()
        console.log(userInput)
        pastSearch.push(userInput)
        localStorage.setItem("city", JSON.stringify(pastSearch))
        var cityButtonEl = $('<button>')
        cityButtonEl.text(userInput)
        cityDivEl.append(cityButtonEl)
    }
    // convert to lat and long
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&appid=" + apiKey
    fetch(geoURL).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data)
        var lat = data[0].lat
        var lon = data[0].lon
        var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
        fetch(apiURL).then(function (response) {
            return response.json()
        }).then(function (data) {
            localStorage.setItem("name", data)
            console.log(data)
            renderWeather(data, userInput)
            renderFiveDay(data)
        })
    })
    // put into API
}
function renderWeather(data, userInput) {
    var ulEl = $('#city-name').children("ul");
    var cityLiEl= $('<li>')
    cityLiEl.addClass('current-city');
    cityLiEl.text(userInput)
    var tempLiEl = $('<li>');
    tempLiEl.addClass('current-temp');
    tempLiEl.text('Temp: ' + data.current.temp)
    var windLiEl = $('<li>');
    windLiEl.addClass('current-wind');
    windLiEl.text('Wind:' + data.current.wind_speed);
    var humidityLiEl = $('<li>');
    humidityLiEl.addClass('current-humidity');
    humidityLiEl.text('Humidity:' + data.current.humidity);
    var uvIndexLiEl = $('<li>');
    uvIndexLiEl.addClass('current-index');
    if (data.current.uvi <= 0.4) {
        uvIndexLiEl.addClass('low')
    } else if (data.current.uvi >= 0.4 || data.current.uvi <= 0.7) {
        uvIndexLiEl.addClass('medium')
    } else {
        uvIndexLiEl.addClass('high')
    }

    uvIndexLiEl.text('UV Index:' + data.current.uvi)

    ulEl.empty()
    ulEl.append(cityLiEl,tempLiEl, windLiEl, humidityLiEl, uvIndexLiEl)
}

function renderFiveDay(data) {
    var fiveDayRowEl = $('#five-day-row')
    fiveDayRowEl.empty()
    for (let i = 1; i < 6; i++) {
        const day = data.daily[i];
        const fiveDayEl = `<div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Day ${i}</h5>
            <div class="p-2 bd-highlight" id="day-one-temp">Temp: ${day.temp.day} °F </div>
            <div class="p-2 bd-highlight" id="day-one-wind">Wind: ${day.wind_speed} mph</div>
            <div class="p-2 bd-highlight" id="day-one-humidity">
              Humidity:${day.humidity} %
            </div>
            <div class="p-2 bd-highlight" id="day-one-index">UV Index:${day.uvi}</div>
          </div>
        </div>
      </div>`
        fiveDayRowEl.append(fiveDayEl)
    }
}

for (let i = 0; i < pastSearch.length; i++) {
    const city = pastSearch[i];
    var cityButton = $('<button>')
    cityButton.text(city)
    pastSearchEl.append(cityButton)
   
}




// click on a city in search history
// Presented with current and future conditions 
$("#searchBtn").click(currentWeather)
pastSearchEl.on("click","button",currentWeather)

