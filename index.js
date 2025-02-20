const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const images = document.querySelector('.not-found');
search.addEventListener('click', () => {
    const APIKey = '3d841ec25bcf758f41b86c26314247e9';
    const city = document.querySelector('.search-box input').value;
    if (city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                images.style.display = 'block';
                images.classList.add('fadeIn');
                return;
            }
            images.style.display = 'none';
            images.classList.remove('fadeIn');
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.jpg';
                    break;
                case 'Rain':
                    image.src = 'rain.jpg';
                    break;
                case 'Snow':
                    image.src = 'snow.jpg';
                    break;
                case 'Clouds':
                    image.src = 'cloud.jpg';
                    break;
                case 'Haze':
                    image.src = 'mist.jpg';
                    break;
                default:
                    image.src = '';
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});