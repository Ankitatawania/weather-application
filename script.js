const inputBox =document.querySelector('.input-box');
const searchBtn =document.getElementById('searchbtn');
const weather_img =document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const sea_level = document.getElementById('sea-level');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key ="5cb8e1453586a0fafad0a2b268e1128e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response=> response.json());
    
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    weather_body.style.display = "flex";
    location_not_found.style.display = "none";

   temperature.innerHTML =`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;

    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    pressure.innerHTML = `${weather_data.main.pressure}hpa`;
    function convertTimestampTo24Hour(timestamp) {
        // Convert timestamp to milliseconds and create a Date object
        const date = new Date(timestamp * 1000);
    
        // Get hours and minutes in 24-hour format
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        // Return formatted time as HH:MM
        return `${hours}:${minutes}`;
    }
    sunrise.innerHTML = convertTimestampTo24Hour(weather_data.sys.sunrise);
    sunset.innerHTML = convertTimestampTo24Hour(weather_data.sys.sunset);
    sea_level.innerHTML = `${weather_data.main.sea_level}m`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src ="/asset/cloud.png";
            break;
        case 'Clear':
            weather_img.src ="/asset/clear.png";
            break;
        case 'Rain':
            weather_img.src ="/asset/rain.png";
            break;
        case 'Mist':
            weather_img.src ="/asset/mist.png";
            break;
        case 'Snow':
            weather_img.src ="/asset/snow.png";
            break;
        


    }

}
searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});
document
  .querySelector(".input-box").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        checkWeather(inputBox.value);
    }
  });

