// ==================== BOT Controls ====================
// ==================== App Pet Virtual==================

// ======== Import API ==============
// import {displayResults} from './apis.js';

// ==================== Command List ==================== 
var listComands = {
    
    timer: '',
    clima: '',
    cep: '',
    settings: '',
    
};

var personalSettings = {
    name: '',
    age: '',
    cityMain: 'defina uma cidade como padrão com "settings"',
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
        let comandsReq = document.querySelector('#comands').value;
        let comands = comandsReq.toLocaleLowerCase();
        
        Object.keys(listComands).forEach(function(item) {
            
            if(item === comands)
            {
                comandsSettings();
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

    let comandsRes = document.querySelector('#comands').value;
    let comands = comandsRes.toLocaleLowerCase();



    //===== Timer =======
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    hours = (hours < 10 ? '0' + hours : hours);
    minutes = (minutes < 10 ? '0' + minutes : minutes);

    listComands.timer = `${hours}:${minutes}`;

    // ========== Api Clima ==========

    if(comands === "clima")
    {
        var reqCity = window.prompt("Digite o nome da cidade:", `${SettingsPersonal.cityMain}`);
        if(reqCity)
        {
            searchResults(reqCity);
        }else {
            alert(`Digite algo válido.`);
        };
    };
    

    //==== CEP ========
    if(comands === "cep")
    {
        var reqCep = window.prompt("Digite o CEP :", `${SettingsPersonal.cityMain}`);
        if(reqCep.length == 8 && /^[0-9]+$/.test(reqCep))
        {
            apiCep(reqCep);
        }else {
            alert(`"${reqCep}" não é um CEP válido`)
        };
    };

    //==== Settings ========
    if(comands === "settings")
    {
        var reqSettings = window.prompt("1 - Nome | 2 - Cidade | 3 - Idade");

        if(reqSettings.length == 1 && /^[0-3]$/.test(reqSettings))
        {
            SettingsPersonal(reqSettings);
        } else
        {
            alert("Digite algo válido!");
        }
        
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

// ================= API cep (Viacep); ===========================
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

// ================= Settings personal; ===========================
const SettingsPersonal = (reqSettings) =>
{
    if(reqSettings == 1)
    {
        let newName = window.prompt("Digite como deseja ser chamado :");
        if(newName)
        {
            SettingsPersonal.name = newName;

            alert(`Olá ${newName}`);
        };
    };
    if(reqSettings == 2)
    {
        let cityMainReq = window.prompt("Digite qual cidade você deseja usar como padrão :");
        if(cityMainReq)
        {
            SettingsPersonal.cityMain = cityMainReq;

            alert(`A cidade de ${cityMainReq} foi definida como padrão.`);
        };
    };
    if(reqSettings == 3)
    {
        let newName = window.prompt("Digite como deseja ser chamado :");
        if(newName)
        {
            SettingsPersonal.name = newName;

            alert(`Olá ${newName}`);
        };
    };

};