
function getBackgroundImage() {
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `Picture by: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `Picture by: Dodi Achmad`
    })
}

function getCurrency() {
fetch("https://api.polygon.io/v2/aggs/ticker/C:CADUSD/prev?adjusted=true&apiKey=Vm8sQX2qRFYIU0t4PEliZCRB2mb7VLKc")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("currency").innerHTML += `
            <h3 class="white"><i class="fas fa-money-bill-alt"></i>Canadian Dolar</h3>
            <p class="currency"><i class="fas fa-gavel"></i> : CAD ${data.results[0].c}</p>
            <p class="currency"><i class="fas fa-arrow-up green"></i> : CAD ${data.results[0].h}</p>
            <p class="currency"><i class="fas fa-arrow-down red"></i> : CAD ${data.results[0].l}</p>
        `
    })
    .catch(err => console.error(err))
}


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p>${Math.round(data.main.temp)}º</p>
                <p>${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "medium"})
}

setInterval(getCurrentTime, 1000)
getBackgroundImage()
getCurrency()

