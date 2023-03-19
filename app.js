//Interação
const citysearchinput = document.getElementById('city-search-input')
const citysearchbutton = document.getElementById('city-search-button')

//Exibição
const currentdate = document.getElementById('current-date')
const cityname = document.getElementById('city-name')
const weathericon = document.getElementById('weather-icon')
const weatherdescription = document.getElementById('weather-description')
const currenttemperature = document.getElementById('current-temperature')
const windspeed = document.getElementById('wind-speed')
const feelsliketemperature = document.getElementById('feels-like-temperature')
const currenthumidity = document.getElementById('current-humidity')
const sunrisetime = document.getElementById('sunrise-time')
const sunsettime = document.getElementById('sunset-time')

const api_key = "d9e5dedd68f52b65952cad21a240feb2"

citysearchbutton.addEventListener("click", () => {
    let cityname = citysearchinput.value
    getCityWeather(cityname)
})

navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
    
        getCurrentLocationWeather(lat, lon)
    },
    (err) => {
        if (err.code === 1) {
            alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade por meio da barra de pesquisa")
        }
        else {
            { console.log(err) }
        }
    }
)

function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayweather(data))
}

function getCityWeather(cityname) {

    weathericon.src = `/assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayweather(data))
}

function displayweather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data

    currentdate.textContent = formatDate(dt);
    cityname.textContent = name;

    weathericon.src = `/assets/${icon}.svg`
    weatherdescription.textContent = description
    currenttemperature.textContent = `${Math.round(temp)}ºC`
    windspeed.textContent = `${Math.round(speed * 3.6)} km`
    feelsliketemperature.textContent = `${Math.round(feels_like)}ºC`
    currenthumidity.textContent = `${humidity}%`
    sunrisetime.textContent = formatTime(sunrise)
    sunsettime.textContent = formatTime(sunset)
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)

    let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' })

    return `Hoje, ${formattedDate}`
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}