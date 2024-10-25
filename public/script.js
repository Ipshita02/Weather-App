const today = new Date();
const month = today.toLocaleString('default', { month: 'long' });
const formattedDate = `${month} ${today.getDate()}, ${today.getFullYear()}`;
document.querySelector('.date').textContent = formattedDate;

const getWeather = async function fetchWeather(city) {

    const cityValue = document.querySelector('.searchBarInput').value;
    if (cityValue === "") {
        alert("Please enter a city");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/weather?city=${cityValue}`);
        const data = await response.json();
        // Handle the weather data here
        if (response.ok) {
            displayWeather(data);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }    
}

function displayWeather(data){
    const city = data.name;
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const tempMax = data.main.temp_max;
    const tempMin = data.main.temp_min;

    document.querySelector('.tempMax').innerText = `${tempMax.toFixed(2)}°C`;
    document.querySelector('.tempMin').innerText = `${tempMin.toFixed(2)}°C`;
    
    document.querySelector('.main-name').innerText = `${city}`;
    document.querySelector('.description').innerText = weatherDescription;
    document.querySelector('.degree').innerText = `${temperature}°C`;

    const weatherDesc = data.weather[0].main.toLowerCase();
    const iconClass = getWeatherIcon(weatherDesc);
    document.querySelector('.imgContainer i').className = iconClass;

    // Call function to change background color based on weather conditions
    // changeBackground(data.weather[0].main.toLowerCase());
    changeBackground(weatherDesc)
}

document.querySelector('.search-icon').addEventListener('click', getWeather);

const input = document.querySelector('.searchBarInput');
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();     // Cancel the default action
    document.querySelector('.search-icon').click();     // Trigger the button element with a click
  }
});


function getWeatherIcon(weather) {
    switch (weather) {
        case 'clear':
            return 'fa-solid fa-sun'; // Sunny
        case 'clouds':
            return 'fa-solid fa-cloud'; // Clouds
        case 'rain':
            return 'fa-solid fa-cloud-showers-heavy'; // Rain
        case 'thunderstorm':
            return 'fa-solid fa-bolt'; // Thunderstorm
        case 'snow':
            return 'fa-solid fa-snowflake'; // Snow
        case 'mist':
        case 'fog':
            return 'fa-solid fa-smog'; // Mist and Fog
        case 'haze':
        case 'smoke':
            return 'fa-solid fa-smog'; // Haze and Smoke
        case 'squall':
        case 'wind':
            return 'fa-solid fa-wind'; // Squall and wind
        case 'tornado':
            return 'fa-solid fa-tornado'; // Tornado
        default:
            return 'fa-solid fa-cloud'; // Default Cloud
    }
}

function changeBackground(weather){
    const app = document.querySelector('#app');

    switch (weather) {
        case 'clear':
            app.style.backgroundImage = "linear-gradient(325deg, hsl(33deg 100% 62%) 0%, hsl(33deg 100% 72%) 50%, hsl(33deg 100% 88%) 100%)";
            break;
        case 'rain':
            app.style.backgroundImage = "linear-gradient(325deg, hsl(270deg 100% 62%) 0%, hsl(270deg 100% 72%) 50%, hsl(270deg 100% 88%) 100%)";
            break;
        case 'clouds':
            app.style.backgroundImage = "linear-gradient(325deg, hsl(120deg 40% 62%) 0%, hsl(120deg 40% 72%) 50%, hsl(120deg 40% 88%) 100%)";
            break;
        case 'snow':
            app.style.backgroundImage = "linear-gradient(325deg, hsl(350deg 100% 62%) 0%, hsl(350deg 100% 72%) 50%, hsl(350deg 100% 88%) 100%)";
            break;
        case 'mist':
            app.style.backgroundImage = "linear-gradient(325deg, hsl(0deg 100% 62%) 0%, hsl(0deg 100% 72%) 50%, hsl(0deg 100% 88%) 100%)";
            break;
        case 'haze':
            app.style.backgroundImage = "linear-gradient(325deg, hsl(210deg 15% 55%) 0%, hsl(210deg 10% 70%) 50%, hsl(210deg 5% 90%) 100%)";
            break;
        default:
            app.style.backgroundImage = "linear-gradient(325deg,hsl(240deg 97% 55%) 0%,hsl240deg 97% 65%) 32%,hsl(240deg 97% 70%) 59%,hsl(240deg 96% 75%) 74%,hsl240deg % 79%) 84%,hsl(240deg 96% 82%) 90%,hsl(240deg 96% 85%) 94%,hsl(240deg 96% 88%) %,hsl(240deg 96% 91%) 99%,hsl(240deg 96% 93%) 100%,hsl(240deg 96% 96%) 100%,hsl240deg 95% 98%) 100%,hsl(0deg 0% 100%) 100%)"
    }
}
