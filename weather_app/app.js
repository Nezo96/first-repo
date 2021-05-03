// Define consts
const searchInput = document.getElementById('search');
const button = document.getElementById('btn');
const weatherIcon = document.getElementById('weather_icon');
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const speed = document.getElementById('speed_value');
const pressure = document.getElementById('pressure_value');

// Define API[key, url]
const api = {
    key: "c5704079cd1b2ae378040917084d62a5",
    url: "https://api.openweathermap.org/data/2.5/"
};

// Define unit system
const units = "metric";

// Get Day, Month, Time
const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
};
const printDate = new Date().toLocaleTimeString('en-eu', options);
date.innerText = printDate;
//console.log(printDate);

// Create eventlistener on button on click
button.addEventListener('click', getInput);

// Create function to get user input from searchInput
function getInput(event) {
    event.preventDefault();
    if (event.type === "click") {
        console.log(searchInput.value);
        getData(searchInput.value);
    }
}

// Create function to fetch data from openweathermap.org
function getData(value) {
    //console.log(value);
    fetch(`${api.url}weather?q=${value}&units=${units}&appid=${api.key}`)
        .then(response => {
            return response.json(); // Format response as json
        })
        .then(data => {
            console.log(data);
            if (data.cod === "404") {
                city.innerText = "Please type valid city";
                temp.innerText = "-- °C";
                speed.innerText = "-- km/h";
                pressure.innerText = "-- hPa";
                weatherIcon.style.visibility = "hidden";
                return false;
            }
            displayData(data);
        });
}

// Create function to display data in html
function displayData(value) {
    city.innerText = value.name;
    temp.innerText = Math.floor(value.main.temp) + "°C";
    speed.innerText = value.wind.speed + " km/h";
    pressure.innerText = value.main.pressure + " hPa";
    weatherIcon.style.visibility = "visible";
    weatherIcon.src = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
}
