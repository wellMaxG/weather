const API_KEY = 'b379c2c91b9d1792b04a63bd0cc17bb9';

const form = document.querySelector('#form');
const input = document.querySelector('.form__input');

form.onsubmit = submitHandler;


async function submitHandler(e) {
    e.preventDefault();

    if(!input.value.trim()) {
        console.log("Введите город");
        return
    }

    const cityName = input.value.trim();

    input.value = '';


    const cityInfo = await getGeo(cityName);

    if(!cityInfo.length) return;

    
    const weathertInfo = await getWeather (cityInfo[0]['lat'], cityInfo[0]['lon']);
    
    
    console.log(weathertInfo.name);
    console.log(weathertInfo);
    console.log(weathertInfo.coord.lat);
    

switch (weathertInfo.name) {
  case "Новая Голландия":
    weathertInfo.name = ( 'Санкт-Петербург' );
    break;
    case "Старое Барятино":
        weathertInfo.name = ( 'Уфа' );
    break;
    case "Posëlok Rabochiy":
        weathertInfo.name = ( 'Екатеринбург' );
    break;
    case "Кондока":
        weathertInfo.name = ( 'Костомукша' );
    break;
    case "Степной":
        weathertInfo.name = ( 'Курск' );
    break;
    case "Али-Юрт":
        weathertInfo.name = ( 'Магас' );
    break;
    case "Ugol’nyy":
        weathertInfo.name = ( 'Нарьян-Мар' );
    break;
}

    const weatherData = {
        name: weathertInfo.name,
        temp: weathertInfo.main.temp,
        humidity: weathertInfo.main.humidity,
        speed: weathertInfo.wind.speed,
        main: weathertInfo.weather[0]['main'],
        description: weathertInfo.weather[0]['description'],
    };

    renderWeatherData(weatherData);
}

    async function getGeo(name) {

        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;

        const response = await fetch(geoUrl);
        
        const data = await response.json();

        return data;
    }

   
    async function getWeather (lat, lon) {
    
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=ru`;
       
        const response = await fetch(weatherUrl);

        const data = await response.json();

        return data;
    }

    function renderWeatherData (data) {

        // Отображаем блоки с информацией
        document.querySelector('.weather__info').classList.remove('none')
        document.querySelector('.weather__details').classList.remove('none')
        
        // Отображаем данные по погоде
        const temp = document.querySelector('.weather__temp');
        const city = document.querySelector('.weather__city');
        const description = document.querySelector('.weather__description');
        const humidity = document.querySelector('#humidity');
        const speed = document.querySelector('#speed');
        const img = document.querySelector('.weather__img');

        temp.innerText = Math.round(data.temp) + '°с';

    
        city.innerText = data.name;
        description.innerText = data.description;
        
        humidity.innerText = data.humidity + '%';
        // speed.innerText = Math.round(data.speed) + ' м/с';
        speed.innerText = data.speed + ' м/с';
       
        const fileNames = {
            'Clouds': 'clouds',
            'Clear': 'clear',
            'Drizzle': 'drizzle',
            'Mist': 'mist',
            'Rain': 'rain',
            'Snow': 'snow',
        }

        if(fileNames[data.main]) {
            img.src = `./img/weather/${fileNames[data.main]}.png`;
        }
    }
    

 