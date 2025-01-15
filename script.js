const input = document.querySelector('.search');
const btn = document.querySelector('.search-btn');
const mycity = document.querySelector('.city');
const tempDisplay = document.querySelector('.temp');
const weatherDisplay = document.querySelector('.status');
const max = document.querySelector('.todaysHigh span');
const min = document.querySelector('.todaysLow span');
const myicon = document.querySelector('.status-img');

btn.addEventListener('click', fetchWeather);

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

async function fetchWeather() {
    const cityName = input.value.trim();
    const apiKey = 'bd03e7ee897349f79cd191646250401'; // Replace with your actual API key
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=1&aqi=yes`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
    
    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const wrappedData = await response.json();
        const data = JSON.parse(wrappedData.contents); // Extract actual data

        const name = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const weatherText = data.current.condition.text;
        const weatherIcon = data.current.condition.icon;
        const feelslike = data.current.feelslike_c;
        const temperature = Math.floor(data.current.temp_c);
        const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
        const minTemp = data.forecast.forecastday[0].day.mintemp_c;
        
        mycity.textContent = `${name.toUpperCase()}, ${region.toUpperCase()}, ${country.toUpperCase()}`;
        tempDisplay.textContent = `${temperature}°C`;
        weatherDisplay.textContent = `Feelslike ${feelslike}°C | ${weatherText}`;
        max.textContent = `${maxTemp}`;
        min.textContent = `${minTemp}`;
        myicon.src = `https:${weatherIcon}`;
        myicon.alt = weatherText;
    } catch (error) {
        console.error('Error:', error.message);
        mycity.textContent = `Error: ${error.message}`;
        tempDisplay.textContent = '';
        weatherDisplay.textContent = '';
        max.textContent = '';
        min.textContent = '';
        myicon.src = '';
        myicon.alt = '';
    }
}