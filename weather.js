const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");
async function getWeather() {
    const city = cityInput.value.trim();
    if (city === "") {
        return;
    }
    weatherResult.textContent = "loading...";
    try {
        const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1";
        const response = await fetch(url);
        const data = await response.json();
        if (!data.results) {
            weatherResult.textContent = "City not Found.";
            return;
        }
        const place = data.results[0];
        const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude + "&longitude=" + place.longitude + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        weatherResult.textContent = place.name + ": " + current.temperature_2m + "°C, humidity " + current.relative_humidity_2m + "%, wind " + current.wind_speed_10m + " km/h";
    } catch (error) {
        weatherResult.textContent = "Could not load data. Check your connection.";
    }
}
weatherButton.addEventListener("click", getWeather);
cityInput.addEventListener("keydown" , function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});