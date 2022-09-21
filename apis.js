// ================= API clima (openWeather); ===========================

const apiClima = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

function coordResults(lat, long) {
    fetch(`${apiClima.base}weather?lat=${lat}&lon=${long}&lang=${apiClima.lang}&units=${apiClima.units}&APPID=${apiClima.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
};

window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let comands = document.querySelector('#comands').value;
        searchResults(comands)
    }
});

function searchResults(comands) {
    fetch(`${apiClima.base}weather?q=${comands}&lang=${apiClima.lang}&units=${apiClima.units}&APPID=${apiClima.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
};

export function displayResults(weather) {

    let temperature = `${Math.round(weather.main.temp)}`

    var resClima = temperature + "°C"; 

    console.log(resClima)

};