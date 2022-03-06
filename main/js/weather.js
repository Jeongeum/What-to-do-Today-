const API_KEY = "1dc020747cfb98cfd4b8798e43b76b65";
function onGeoOk(position) {
  const lat = position.coords.latitude; // 위도 경도를 표시해줌
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let weatherImg = document.getElementById("weatherImg");
      let Icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      const weather = document.querySelector(".weather p:nth-child(2)");
      const temp = document.querySelector(".weather sub:nth-child(3)");
      const city = document.querySelector(".weather p:nth-child(4)");

      const description = document.querySelector(".weather p:last-child");

      city.innerText = data.name;
      description.innerText = data.weather[0].main;
      weather.innerText = `${data.main.temp}°`;
      weatherImg.src = Icon;
      temp.innerText = `최고:${data.main.temp_max}° 최저:${data.main.temp_min}°`;
      //tempMin.innerText = `최저:${data.main.temp_min}°`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
