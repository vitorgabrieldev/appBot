// ==================== BOT Controls ====================
// ==================== App Pet Virtual==================

// ======== Import API ==============
// import {displayResults} from './apis.js';

// ==================== Command List ==================== 
var listComands = {
    
    timer: '',
    clima: '',
    cep: '',
    
};

// ==================== Main Bot Controls ===============
var controls = {
    
    originMain: function()
    {
        let comands = document.querySelector('#comands').value;
        if(comands)
        {
            this.comandsGeral();
        };
    },

    comandsGeral: function()
    {
        let comands = document.querySelector('#comands').value;
        
        Object.keys(listComands).forEach(function(item) {
            
            if(item === comands)
            {

                comandsSettings();

                let msgReq = document.querySelector('#msg').innerHTML = listComands[item];

            };

        });

    }
};

// ==================== Click Event ==================
let Send = document.querySelector('#Send').addEventListener('click', () =>
{
    this.controls.originMain();
});
window.addEventListener('keypress', (e) =>
{
    if(e.key === 'Enter')
    {
        this.controls.originMain();
    };
});

// ==================== Settings Comands =============
function comandsSettings()
{

    let comands = document.querySelector('#comands').value;


    //===== Timer =======
    // let hours = new Date().getHours();
    // let minutes = new Date().getMinutes();

    let hours = 9;
    let minutes = 5;

    hours = (hours > 10 ? "0" + hours : hours);

    listComands.timer = `${hours}:${minutes}`;

    // ========== Api Clima ==========

    if(comands === "clima")
    {
        var reqCity = window.prompt("Digite o nome da cidade:");
        searchResults(reqCity);
    };
    

    //==== CEP ========
                        //===== Temporary =====
    if(comands === "cep")
    {
        var reqCep = window.prompt("Digite o CEP :");
        if(reqCep.length == 8 && /^[0-9]+$/.test(reqCep))
        {
            apiCep(reqCep);
        }else {
            alert(`"${reqCep}" não é um CEP válido`)
        };
    };
};

// ================= API clima (openWeather); ===========================

const apiClima = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
};

function searchResults(reqCity) {
    fetch(`${apiClima.base}weather?q=${reqCity}&lang=${apiClima.lang}&units=${apiClima.units}&APPID=${apiClima.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message);
        })
        .then(response => {
            displayResults(response, reqCity);
        });
};

function displayResults(weather, reqCity) {

    let temperature = `${Math.round(weather.main.temp)}`;
    
    var resClima = temperature + "°C"; 

    listComands.clima = resClima;

    // ============= Res End ===============
    let msgComands = document.querySelector('#msg').innerHTML = `${reqCity} - ${temperature}°C`;

    let resetValue = document.querySelector('#comands').value = "";

};

// ================= API cep (); ===========================
const apiCep = async(reqCep) => {
    const cep = reqCep;
    const urlCep = `http://viacep.com.br/ws/${cep}/json/`;

    const dataMain = await fetch(urlCep);
    const datasEnd = await dataMain.json();

    if(datasEnd.hasOwnProperty('erro'))
    {
        document.querySelector('#msg').innerHTML = `"${reqCep}" não foi encontrado!`;

    } else {
        // ============= Res End ===============
        document.querySelector('#msg').innerHTML = datasEnd.localidade;
    };

    document.querySelector('#comands').value = "";

};