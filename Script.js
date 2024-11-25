function showWeatherInfo() {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.querySelector('.weather-info');
    const cityName = document.getElementById('city-name');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherIcon = document.getElementById('weather-icon');
    const errorMessage = document.getElementById('error-message');

    if (!city) {
        errorMessage.textContent = 'Ju lutem shkruani një qytet!';
        weatherInfo.style.display = 'none';
        return;
    }

    errorMessage.textContent = '';
    const apiKey = 'fbaa2a60ac0dff69d4c52144faf118f3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sq`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                cityName.textContent = `${city}, ${data.sys.country}`;
                weatherDescription.textContent = `Përshkrimi: ${data.weather[0].description}`;
                temperature.textContent = `Temperatura: ${data.main.temp}°C`;
                humidity.textContent = `Lagështia: ${data.main.humidity}%`;
                windSpeed.textContent = `Shpejtësia e erës: ${data.wind.speed} m/s`;

                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
                weatherIcon.src = iconUrl;

                switch (iconCode) {
                    case '01d':
                    case '01n':
                        document.body.style.backgroundColor = '#f9d71c'; // Diell
                        break;
                    case '02d':
                    case '02n':
                        document.body.style.backgroundColor = '#a1c4fd'; // Pjesërisht me re
                        break;
                    case '03d':
                    case '03n':
                        document.body.style.backgroundColor = '#b3cde0'; // Re të shpeshta
                        break;
                    case '04d':
                    case '04n':
                        document.body.style.backgroundColor = '#98c4d8'; // Re të errëta
                        break;
                    case '09d':
                    case '09n':
                        document.body.style.backgroundColor = '#6c7c7e'; // Shi
                        break;
                    case '10d':
                    case '10n':
                        document.body.style.backgroundColor = '#5b8a8e'; // Shi me diell
                        break;
                    case '11d':
                    case '11n':
                        document.body.style.backgroundColor = '#888888'; // Stuhi
                        break;
                    case '13d':
                    case '13n':
                        document.body.style.backgroundColor = '#e0f7fa'; // Borë
                        break;
                    case '50d':
                    case '50n':
                        document.body.style.backgroundColor = '#d3d3d3'; // Mist
                        break;
                    default:
                        document.body.style.backgroundColor = '#f0f0f0';
                }

                weatherInfo.style.display = 'block';
            } else {
                errorMessage.textContent = 'Nuk u gjet qyteti! Provoni përsëri.';
                weatherInfo.style.display = 'none';
            }
        })
        .catch(error => {
            errorMessage.textContent = 'Ka ndodhur një gabim. Provoni përsëri më vonë.';
            weatherInfo.style.display = 'none';
        });
}
