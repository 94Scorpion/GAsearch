const apiKey = "f895b17c966d9d85d70298d1320b1d0f";

function search() {
    const query = document.getElementById('search').value.trim();
    const results = document.getElementById('results');

    if (query.toLowerCase().startsWith("meteo ")) {
        const city = query.slice(6).trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        getWeather(city);
    } else if (
        query.toLowerCase().startsWith("orario ") ||
        query.toLowerCase().startsWith("che ore sono a ") ||
        query.toLowerCase().startsWith("ora ")
    ) {
        const city = query
            .toLowerCase()
            .replace("orario ", "")
            .replace("che ore sono a ", "")
            .replace("ora ", "")
            .trim();
        getTime(city);
    } else {
        results.innerHTML = `Hai cercato: <strong>${query}</strong><br>Funzionalità avanzate in arrivo!`;
    }
}

function getWeather(city) {
    const results = document.getElementById('results');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=it&units=metric`;

    results.innerHTML = "Caricamento meteo...";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Città non trovata");
            }
            return response.json();
        })
        .then(data => {
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;

            results.innerHTML = `
                <h3>Meteo a ${city}</h3>
                <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}"> ${desc}, ${temp}°C</p>
            `;
        })
        .catch(error => {
            results.innerHTML = `Errore: ${error.message}`;
        });
}

function getTime(city) {
    const results = document.getElementById('results');
    const cityFormatted = city.toLowerCase().replace(/ /g, "_");

    results.innerHTML = "Caricamento orario...";

    fetch(`https://worldtimeapi.org/api/timezone`)
        .then(res => res.json())
        .then(zones => {
            const match = zones.find(zone => zone.toLowerCase().includes(cityFormatted));
            if (!match) {
                throw new Error("Città non trovata");
            }

            return fetch(`https://worldtimeapi.org/api/timezone/${match}`);
        })
        .then(res => res.json())
        .then(data => {
            const time = new Date(data.datetime);
            results.innerHTML = `<h3>Ora attuale a ${city}</h3><p>${time.toLocaleTimeString()}</p>`;
        })
        .catch(err => {
            results.innerHTML = `Errore: ${err.message}`;
        });
}
