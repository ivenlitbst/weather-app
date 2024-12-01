let tempUnit = 'C'; // 默认温度单位为摄氏度

function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '4f17b745b58d452c3007c22701393715'; // 替换为你的API Key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('未找到该城市，请重新输入');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            document.getElementById('weatherResult').textContent = error.message;
        });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = '';

    // 天气类型与图标对应关系
    const weatherIcons = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Drizzle: '🌦️',
        Thunderstorm: '⛈️',
        Snow: '❄️',
        Mist: '🌫️',
        Smoke: '💨',
        Haze: '🌫️',
        Dust: '🌪️',
        Fog: '🌫️',
        Sand: '🏜️',
        Ash: '🌋',
        Squall: '🌬️',
        Tornado: '🌪️'
    };

    data.list.slice(0, 5).forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString();
        const temp = tempUnit === 'C' ? day.main.temp : (day.main.temp * 9/5) + 32;
        const description = day.weather[0].main; // 主天气类型
        const tempText = `${temp.toFixed(1)}°${tempUnit}`;
        const icon = weatherIcons[description] || '❓'; // 匹配图标，默认❓表示未知

        const dayWeather = document.createElement('div');
        dayWeather.className = 'day-weather';

        // 添加图标、文字和描述
        dayWeather.innerHTML = `
            <span class="weather-icon">${icon}</span>
            <span class="weather-info">${date}: ${tempText}, ${description}</span>
        `;

        weatherResult.appendChild(dayWeather);
    });
}

function toggleTempUnit() {
    if (tempUnit === 'C') {
        tempUnit = 'F';
    } else {
        tempUnit = 'C';
    }
    fetchWeather(); // 重新获取天气数据以更新温度单位
}
