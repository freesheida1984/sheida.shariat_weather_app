function formatDate(timetamp) {
    let date = new Date(timetamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;       
}
function formatDay(timetamp){
    let date = new Date(timetamp*1000);
    let day = date.getDay();
     let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];
    return days[day];
}

function displayForecast(response){
    console.log(response.data.daily);
    let forecast = response.data.daily;
    let forecastHtml = `<div class = "row">`;    
    forecast.forEach(function(forecastDay,index)
    {
        if (index<6){
    forecastHtml = forecastHtml +
       `<div class = "col-2 col-forecast"><div class = "weather-forecast-date">${formatDay(forecastDay.time)}</div> 
            <img src=${forecastDay.condition.icon_url} id="icon-image"
            alt = "icon"
            width = "40"
            />                   
        <div class = "weather-forecast-temp">    
        <span class = "weather-forecast-temp-max">${Math.round(forecastDay.temperature.maximum)}° - </span>
        <span class = "weather-forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>        
        </div>
        </div>`; }
    })     
    forecastHtml = forecastHtml + `</div>`    
    document.querySelector("#forecast").innerHTML = forecastHtml;
}
function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "t90dd4fb0b4eobe0b39b7a843048d63e";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&unit=metric`;
    axios.get(apiUrl).then(displayForecast);
}



function displayTemperature(response) {
    console.log(response.data);
    document.querySelector("#temperature").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#description").innerHTML = response.data.condition.description;
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#pressure").innerHTML = (response.data.temperature.pressure);
    document.querySelector("#date").innerHTML = formatDate(response.data.time*1000);
    document.querySelector("#icon").setAttribute("src", response.data.condition.icon_url);
    celsiusTemperature = response.data.temperature.current;
    getForecast(response.data.coordinates);

}



function search(city) {
    let apiKey = "t90dd4fb0b4eobe0b39b7a843048d63e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-city-input");
    search(cityInput.value);
}
function showFarenheitNumber(event){
    event.preventDefault();
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");  
    let fahrenheitTemp = document.querySelector("#temperature")
    let fahrenheitConvert = (celsiusTemperature*9)/5+32;
    fahrenheitTemp.innerHTML = Math.round(fahrenheitConvert);
}
function showcelsiusNumber(event){
    event.preventDefault(); 
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");    
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFarenheitNumber);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusNumber);

search("New York");