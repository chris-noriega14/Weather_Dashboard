//Declaring all of the variables needed for the webpage to function
var userForm = $("#user-form");
var cityName = $("#cityname");
var inputButton = $("#input-button");
var cityButtons = $("#city-buttons");
var citySearchTerm = $("#city-search-term");
var cityContainer = $("#city-container");
var temperature = $("#todayTemp");
var wind = $("#todayWind");
var humidity = $("#todayHumidity");
var UVindex = $("#todayUVIndex");

//Set up the Submit Form Button functionality
function formSubmitHandler (event) {
    event.preventDefault();
    var cityInput = $(".form-input").val();
    getUserCityInfo(cityInput);
    getForecast(cityInput);
};

//Set up a function to read the user input info from the form that the user submitted
function getUserCityInfo (cityInput) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3eeec961c8a063dea77acf5a3a9e692f&units=imperial";
    
    fetch(apiUrl)
    .then(function (response) {
    if (response.ok) {
    response.json().then(function (data) {
        console.log(data);    
    displayInfo(data, cityInput);
    console.log(cityInput);
    var weathericon = data.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
    var date = new Date(data.dt * 1000).toLocaleDateString();
    $("#city-search-term").html(
      data.name + "(" + date + ")" + "<img src=" + iconURL + ">"
    );

    var tempF = data.main.temp;
    $(temperature).html(tempF.toFixed(2) + "&#8457");
    // Display the Humidity
    $(humidity).html(data.main.humidity + "%");
    //Display Wind speed and convert to MPH
    var ws = data.wind.speed;
    //Convert meters per second to miles per hour
    $(wind).html(ws + "MPH");
    getForecast(data.coord.lat,data.coord.lon);
    }); 
    } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to find weather information');
      });
};

//Set up a function to create the event of the user clicking a popular city button
function  buttonClickHandler (event) {
    var city = event.target.getAttribute('data-city');

    if(city) {
        getFeaturedCityInfo(city);
        getForecast(city);

        cityContainer.textContent = '';
    }
};

//Set up a function to return API city weather information based off of button click city selection
function getFeaturedCityInfo (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3eeec961c8a063dea77acf5a3a9e692f&units=imperial";

    fetch(apiUrl)
    .then(function (response) {
    if (response.ok) {
    response.json().then(function (data) {
        console.log(response);
    displayInfo(data, city);
        console.log(data);
        console.log("Temp:" + data.main.temp);
        console.log("Wind:" + data.wind.speed);
        console.log("Humidity:" + data.main.humidity);
        console.log("Icon:" + data.weather[0].icon);

        var weathericon=data.weather[0].icon;
        var iconURL="https://openweathermap.org/img/wn/"+ weathericon +"@2x.png";
        var date=new Date(data.dt*1000).toLocaleDateString();
        $("#city-search-term").html(data.name +"("+date+")" + "<img src="+iconURL+">");

        var tempF = data.main.temp;
        $(temperature).html((tempF).toFixed(2)+"&#8457");
        // Display the Humidity
        $(humidity).html(data.main.humidity+"%");
        //Display Wind speed and convert to MPH
        var ws=data.wind.speed;
        //Convert meters per second to miles per hour
        $(wind).html(ws+"MPH");
        getForecast(data.coord.lat,data.coord.lon);
      }); 
    } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to find weather information');
      });
};

function getForecast(lat,lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3eeec961c8a063dea77acf5a3a9e692f&units=imperial`;
    fetch(apiUrl)
    .then(function (response) {
    if (response.ok) {
    response.json().then(function (data) {
        console.log(data);
        // displayInfo(data, city);
        for(var i=1;i<data.daily.length-2;i++) {
            console.log(data.daily[i].temp.day);
            var date1 = new Date(data.daily[1].dt*1000).toLocaleDateString();
            var date2 = new Date(data.daily[2].dt*1000).toLocaleDateString();
            var date3 = new Date(data.daily[3].dt*1000).toLocaleDateString();
            var date4 = new Date(data.daily[4].dt*1000).toLocaleDateString();
            var date5 = new Date(data.daily[5].dt*1000).toLocaleDateString();
            var F1icon=data.daily[1].weather[0].icon;
            var F2icon=data.daily[2].weather[0].icon;
            var F3icon=data.daily[3].weather[0].icon;
            var F4icon=data.daily[4].weather[0].icon;
            var F5icon=data.daily[5].weather[0].icon;
            var iconURL1="https://openweathermap.org/img/wn/"+ F1icon +".png";
            var iconURL2="https://openweathermap.org/img/wn/"+ F2icon +".png";
            var iconURL3="https://openweathermap.org/img/wn/"+ F3icon +".png";
            var iconURL4="https://openweathermap.org/img/wn/"+ F4icon +".png";
            var iconURL5="https://openweathermap.org/img/wn/"+ F5icon +".png";
            var temp = $("<p>").text(data.daily[i].temp.day);
            var windSpeed = $("<p>").text(data.daily[i].windspeed);
            var humidity = $("<p>").text(data.daily[i].humidity);
            //Add UV Index of daily weather
            $("#todayUVIndex").text(data.daily[0].uvi);
            //5-Day Forecast Date
            $("#F1date").text(date1);
            $("#F2date").text(date2);
            $("#F3date").text(date3);
            $("#F4date").text(date4);
            $("#F5date").text(date5);
            //5-Day Forecast Icon
            $("#F1icon").html("<img src="+iconURL1+">");
            $("#F2icon").html("<img src="+iconURL2+">");
            $("#F3icon").html("<img src="+iconURL3+">");
            $("#F4icon").html("<img src="+iconURL4+">");
            $("#F5icon").html("<img src="+iconURL5+">");
            //5-Day Forecast Temperature
            $("#F1temp").text("Temp: " + data.daily[1].temp.day + "℉");
            $("#F2temp").text("Temp: " + data.daily[2].temp.day + "℉");
            $("#F3temp").text("Temp: " + data.daily[3].temp.day + "℉");
            $("#F4temp").text("Temp: " + data.daily[4].temp.day + "℉");
            $("#F5temp").text("Temp: " + data.daily[5].temp.day + "℉");
            //5-Day Forecast Wind Speed
            $("#F1wind").text("Wind: " + data.daily[1].wind_speed + "MPH");
            $("#F2wind").text("Wind: " + data.daily[2].wind_speed + "MPH");
            $("#F3wind").text("Wind: " + data.daily[3].wind_speed + "MPH");
            $("#F4wind").text("Wind: " + data.daily[4].wind_speed + "MPH");
            $("#F5wind").text("Wind: " + data.daily[5].wind_speed + "MPH");
            //5-Day Forecast Humidity
            $("#F1humidity").text("Humidity: " + data.daily[1].humidity + "%");
            $("#F2humidity").text("Humidity: " + data.daily[2].humidity + "%");
            $("#F3humidity").text("Humidity: " + data.daily[3].humidity + "%");
            $("#F4humidity").text("Humidity: " + data.daily[4].humidity + "%");
            $("#F5humidity").text("Humidity: " + data.daily[5].humidity + "%");
        }
    });
}})}

function displayInfo (temp, wind, humidity, UVindex, searchTerm) {
    if (temp.length === 0) {
        
        return;
    }
}

//This calls an event for the two input methods the user can apply (form, button)
inputButton.on('click',formSubmitHandler);
cityButtons.on('click',buttonClickHandler);
