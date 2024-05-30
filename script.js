const apikey = "49f4254953aaebae2698a894a3582490";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const clothingAdvice = document.querySelector(".clothing-advice");

async function checkWeather(city) {
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  
  const response = await fetch(apiurl + city + '&appid=' + apikey);
  const data = await response.json();

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none"; 
  } else {
    document.querySelector(".error").style.display = "none";
    
    switch(data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
    }
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".weather").style.display = "block";
    
    // Add clothing advice based on weather condition
    let clothingAdviceText = "";
    if (data.main.temp < 10) {
      clothingAdviceText = "Wear warm clothing, such as a coat, gloves, and a hat.";
    } else if (data.main.temp < 20) {
      clothingAdviceText = "Wear light jacket or sweater, and consider bringing an umbrella.";
    } else if (data.main.temp < 30) {
      clothingAdviceText = "Wear light and breathable clothing, such as a t-shirt and shorts.";
    } else {
      clothingAdviceText = "Wear light and loose clothing, and don't forget to stay hydrated.";
    }
    
    if (data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle") {
      clothingAdviceText += " Don't forget to bring an umbrella or raincoat.";
    }
    
    if (data.weather[0].main === "Snow") {
      clothingAdviceText += " Wear warm and waterproof clothing, including a coat, gloves, and boots.";
    }
    
    clothingAdvice.innerHTML = clothingAdviceText;
  }
}

// Event listener for the search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Event listener for the Enter key press in the search box
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});


function clearSuggestions() {
  const suggestionsList = document.getElementById('suggestions');
  suggestionsList.innerHTML = '';
}
console.log ("Push changes to github")