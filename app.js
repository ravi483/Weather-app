const temperatureDescription = document.querySelector(
  ".temperature-description"
);
const gustDescription = document.querySelector(".gust-description");
const humidityDescription = document.querySelector(".humidity-description");
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const weatherIconImage = document.querySelector(".weather-icon-image");
const degreeSection = document.querySelector(".degree-section");
const temperatureUnit = document.querySelector(".temperature-unit");

const WEATHER_API_KEY = "0db7ce0fc9ea405d98864231230808";

window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const locationQuerry = lat + "," + long;
      // const locationQuerry = 'amsterdam'
      const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${locationQuerry}`;
      fetch(weatherUrl)
        .then((res) => res.json())
        .then((data) => {
          const {
            temp_c,
            temp_f,
            gust_kph,
            humidity,
            condition: { text: weatherText, icon },
          } = data.current;
          console.log(data);
          const iconPath = icon.replace("//cdn.weatherapi.com", ".");
          const { name, country } = data.location;
          //console.log(temp_c, temp_f, weatherText);
          renderView(
            temp_c,
            temp_f,
            gust_kph,
            humidity,
            weatherText,
            iconPath,
            name,
            country
          );
        });
    });
  } else {
    alert("location permission denied,Please fix the problem");
  }
});

const renderView = (
  temp_c,
  temp_f,
  gust_kph,
  humidity,
  weatherText,
  iconPath,
  name,
  country
) => {
  temperatureDegree.textContent = temp_c;
  temperatureUnit.textContent = "°C";
  temperatureDescription.textContent = weatherText;
  gustDescription.textContent = gust_kph + "km/h";
  humidityDescription.textContent = humidity + "%";

  locationTimezone.textContent = `${name},${country}`;
  weatherIconImage.src = iconPath;
  //change weather unit on click
  degreeSection.addEventListener("click", () => {
    //console.log(temperatureUnit.textContent);
    let unit = temperatureUnit.textContent.slice(1);
    if (unit == "C") {
      temperatureUnit.textContent = "°F";
      temperatureDegree.textContent = temp_f;
    } else {
      temperatureUnit.textContent = "°C";
      temperatureDegree.textContent = temp_c;
    }
  });
};
