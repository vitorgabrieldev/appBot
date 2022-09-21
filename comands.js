// ==================== BOT Controls ====================
// ==================== App Pet Virtual==================

// ======== Import API ==============
import {displayResults} from './apis.js';

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

                let msg = document.querySelector('#msg').innerHTML = listComands[item];

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
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    listComands.timer = `${hours}:${minutes}`;


    //===== Clima =====
    listComands.clima = displayResults.resClima;

    //==== CEP ========
                        //===== Temporary =====
    listComands.cep = '83320-000 = Congonhinhas-pr';
};