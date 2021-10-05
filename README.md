# Weather_Dashboard
Short description of website: This website displays a weather dashboard that displays a city's 5-Day Forecast and other relevant weather info.

Screenshot of deployed application:

GitHub Pages URL of deployed application: https://chris-noriega14.github.io/Weather_Dashboard/

Description of webpage:

This webpage is a weather dashboard that displays today's common weather data for a city as well as a 5-day forecast for that same city.

The user can input the city in two ways: By typing in the city in a form and submitting the information, or by clicking on one of the buttons that show featured cities.

Once the user clicks/submits the information, the weather dashboard webpage populates the data for the city name, today's date, temperature, wind speed, humidity, and UV index for the day.

Additionally, the 5-day forecast is populated with the future dates, an icon describing the weather, temperature, wind speed, and humidity.

In order to achieve this, the webpage has to fetch the open weather app API and retrieve the following elements: Temperature: data.main.temp, Wind Speed: data.wind.speed, Humidity:data.main.humidity, Weather icon:
data.weather[0].icon.
