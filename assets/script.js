//Declaring all of the variables needed for the webpage to function
var userFormEl = $("#user-form");
var cityInputEl = $("#cityname");
var cityButtonsEl = $("#city-buttons");
var citySearchTerm = $("#city-search-term");
var cityContainerEl = $("#city-container");
var temperature = $("#todayTemp");
var wind = $("#todayWind");
var humidity = $("#todayHumidity");
var UVindex = $("#todayUVIndex");

//Set up the Submit Form Button functionality
function formSubmitHandler (event) {
    event.preventDefault();

    var cityname = cityInputEl.val().trim();
    console.log(cityname);
    if(cityname) {
        getUserCityInfo(cityname);
        console.log(cityInputEl);
        
        cityContainerEl.textContent = '';
        cityInputEl.value = '';
    }   else {
        alert('Please enter a valid city name');
    }
};

//Set up a function to read the user input info from the form that the user submitted
function getUserCityInfo (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3eeec961c8a063dea77acf5a3a9e692f";
    
    fetch(apiUrl)
    .then(function (response) {
    if (response.ok) {
    response.json().then(function (data) {
        console.log(response);    
    displayInfo(data, city);
    console.log(city);
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

        cityContainerEl.textContent = '';
    }
};

//Set up a function to return API city weather information based off of button click city selection
function getFeaturedCityInfo (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3eeec961c8a063dea77acf5a3a9e692f";

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

        var tempF = (data.main.temp - 273.15) * (9/5) + 32;
        $(temperature).html((tempF).toFixed(2)+"&#8457");
        // Display the Humidity
        $(humidity).html(data.main.humidity+"%");
        //Display Wind speed and convert to MPH
        var ws=data.wind.speed;
        //Convert meters per second to miles per hour
        var windsmph=(ws*2.237).toFixed(1);
        $(wind).html(windsmph+"MPH");
      }); 
    } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to find weather information');
      });
};

function displayInfo (temp, wind, humidity, UVindex, searchTerm) {
    if (temp.length === 0) {
        
        return;
    }
}

//This calls an event for the two input methods the user can apply (form, button)
cityInputEl.on('click',formSubmitHandler);
cityButtonsEl.on('click',buttonClickHandler);
