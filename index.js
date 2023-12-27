const urlImages =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const urlCurrency =
  "https://api.polygon.io/v2/aggs/ticker/C:CADUSD/prev?adjusted=true&apiKey=Vm8sQX2qRFYIU0t4PEliZCRB2mb7VLKc";

// Fetch and set background image
async function getBackgroundImage() {
  try {
    const response = await fetch(urlImages);
    if (!response.ok) {
      throw new Error("Cannot fetch background image");
    }
    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById(
      "author"
    ).textContent = `Picture by: ${data.user.name}`;
  } catch (error) {
    document.body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1560008511-11c63416e52d?ixlib=rb-1.2.1&q=80&w=1080)";
    document.getElementById("author").textContent = "Picture by: Dodi Achmad";
    console.error(error);
  }
}

async function getCurrency() {
  const url = urlCurrency;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Cannot fetch currency data");
    }
    const data = await response.json();
    const currencyElement = document.getElementById("currency");
    currencyElement.innerHTML = `
            <h3 class="white"><i class="fas fa-money-bill-alt"></i>Canadian Dollar</h3>
            <p class="currency"><i class="fas fa-gavel"></i> : CAD ${data.results[0].c}</p>
            <p class="currency"><i class="fas fa-arrow-up green"></i> : CAD ${data.results[0].h}</p>
            <p class="currency"><i class="fas fa-arrow-down red"></i> : CAD ${data.results[0].l}</p>
        `;
  } catch (error) {
    console.error(error);
  }
}

// Fetch and display weather data
async function getWeatherData(latitude, longitude) {
  const url = `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Cannot fetch weather data");
    }
    const data = await response.json();
    const weatherElement = document.getElementById("weather");
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherElement.innerHTML = `
            <img src=${iconUrl} alt="Weather Icon"/>
            <p>${Math.round(data.main.temp)}º</p>
            <p>${data.name}</p>
        `;
  } catch (error) {
    console.error(error);
  }
}

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "medium" }
  );
}

function getLocationAndWeather() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      await getWeatherData(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.error(error);
    }
  );
}

// Initialize
setInterval(getCurrentTime, 1000);
getBackgroundImage();
getCurrency();
getLocationAndWeather();
