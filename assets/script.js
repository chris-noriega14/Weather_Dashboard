var userFormEl = $("#user-form");
var cityInputEl = $("#cityname");
var cityButtonsEl = $("#city-buttons");
var citySearchTerm = $("#city-search-term");
var cityContainerEl = $("#city-container");
var temperature = $("#temp1");
var wind = $(".wind");
var humidity = $(".humidity");

// var weatherinfo = document.querySelector()
// var forecast = document.querySelector

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

//Breakpoint
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

function  buttonClickHandler (event) {
    var city = event.target.getAttribute('data-city');

    if(city) {
        getFeaturedCityInfo(city);

        cityContainerEl.textContent = '';
    }
};

//Breakpoint

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
        
        function getTemp(data) {
            const TempEl = data.main.temp(city);
            TempEl.textContent("Temp:" + data.main.temp);
            console.log(TempEl);
        }
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

cityInputEl.on('click',formSubmitHandler);
cityButtonsEl.on('click',buttonClickHandler);
// fetch (api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key})