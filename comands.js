// ==================== BOT Controls ====================
// ==================== App Pet Virtual==================


// ==================== Command List ==================== 
var listComands = {
    
    timer: '21:08',
    clima: '25°',
    cep: '86320-000',
    
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
    //===== Timer =======
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    listComands.timer = `${hours}:${minutes}`;


    //===== Clima =====
                        //===== Temporary =====

    // let resConfirm = window.prompt('Digite o nome da cidade:');

       


    //==== CEP ========
                        //===== Temporary =====
    listComands.cep = '83320-000 = Congonhinhas-pr';
};