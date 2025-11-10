const apiKey = "b3f5be6173c0359528b4863b911fd9c6"; 
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

const searchbox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const weathericon = document.querySelector(".weather-icon")

searchbtn.addEventListener('click', ()=> {
    check(searchbox.value)
})

searchbox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    check(searchbox.value);
  }
});

async function check(city) {
    document.querySelector(".loading").style.display = "block";
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);
  document.querySelector(".loading").style.display = "none";

  if(response.status == 404) {
    document.querySelector(".error").style.display = "block"
    document.querySelector(".weather").style.display = "none"
  }
  else {
  var data = await response.json();
  document.querySelector(".city").innerHTML = data.name
  document.querySelector(".temp").innerHTML = Math.round(data.main['temp']) + "°C"
  document.querySelector(".humidity").innerHTML = data.main['humidity'] + "%"
  document.querySelector(".wind").innerHTML = data.wind['speed'] + " km/h"
  console.log(data);

  if (data.weather[0].main == "Clouds"){
    weathericon.src = "./images/clouds.png"
  }
  else if (data.weather[0].main == "Clear"){
    weathericon.src = "./images/clear.png"
  }
  else if (data.weather[0].main == "Drizzle"){
    weathericon.src = "./images/drizzle.png"
  }
  else if (data.weather[0].main == "Haze" || data.weather[0].main == "Fog"){
    weathericon.src = "./images/mist.png"
  }
  else if (data.weather[0].main == "Rain"){
    weathericon.src = "./images/rain.png"
  }
  else if (data.weather[0].main == "Snow"){
    weathericon.src = "./images/snow.png"
  }
  else if (data.weather[0].main == "Wind"){
    weathericon.src = "./images/wind.png"
  }

  document.querySelector(".weather").style.display = "block"
  document.querySelector(".error").style.display = "none"
  }
}

