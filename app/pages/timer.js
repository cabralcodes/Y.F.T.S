const { createElement } = require("react");

//VARIÁVEIS NECESSÁRIAS
let intervaloID = null;
let SpanHours = document.getElementById('hours');
let SpanMinutes = document.getElementById('minutes');
let SpanSeconds = document.getElementById('seconds');
let iniciarTimer = document.getElementById('start');
let reinciarTimer = document.getElementById('restart');
let pausarTimer = document.getElementById('pause');
let periodoAtual = document.getElementById('period');
let modoAtual = 'foco';
let ContadorDeCiclos = 0;
let horasFoco = Number(localStorage.getItem("HorasFoco"));
let MinutosFoco = Number(localStorage.getItem("MinutosFoco"));
let segundos = Number(SpanSeconds.innerText);
let horas = horasFoco;
let minutos = MinutosFoco;
SpanHours.innerText = format(horas);
SpanMinutes.innerText = format(minutos);
let HorasPausa = Number(localStorage.getItem("HorasPausa"));
let minutosPausa = Number(localStorage.getItem("MinutosPausa"));

//------------------------------------------------------------------

// FUNÇÕES
function format(valor){
    return String(valor).padStart(2, "0");
}    

function iniciarContagem (){

    if(!intervaloID){
        intervaloID = setInterval(() => { 
            if (segundos === 0) {
                if (minutos === 0) {
                    if (horas > 0) {
                        horas--;
                        minutos = 59;
                    }
                } else {
                    minutos--;
                }
                segundos = 59;
            } else {
                segundos--;
            }


            if(segundos === 0 && minutos === 0 && horas === 0 && modoAtual === 'foco'){
                modoAtual = 'pausa'
                console.log("oi");
                periodoAtual.textContent = "Período de Pausa";
                horas = HorasPausa
                minutos = minutosPausa;
                return;

            }

            if (horas === 0 && minutos === 0 && segundos ===0 && modoAtual === 'pausa'){
                modoAtual = 'foco';
                periodoAtual.innerText = "Período de Foco";
                horas = horasFoco;
                minutos = MinutosFoco;
                ContadorDeCiclos++;
                console.log(ContadorDeCiclos);
           
                if ( ContadorDeCiclos >= 4){
                    clearInterval(intervaloID);
                        intervaloID = null;
                }
            }
            


            SpanHours.innerText = format(horas);
            SpanMinutes.innerText = format(minutos);
            SpanSeconds.innerText = format(segundos);

        },1000)
    }
}        

//------------------------------------------------------------------

// EVENTOS DE CLIQUE
iniciarTimer.addEventListener("click", iniciarContagem);

reinciarTimer.addEventListener("click", (e) => {
    clearInterval(intervaloID);
    intervaloID = null;
    horas = horasFoco;
    minutos = MinutosFoco;
    segundos = 0
    modoAtual = 'foco';
    ContadorDeCiclos = 0;

    SpanHours.innerText = format(horas);
    SpanMinutes.innerText = format(minutos);
    SpanSeconds.innerText = format(segundos);
    
    iniciarContagem();

});
    
    
    pausarTimer.addEventListener("click", (e) =>{
        
        if (intervaloID !== null) {
            clearInterval(intervaloID);
            intervaloID = null;
        } else {
            iniciarContagem();
        }
    });


window.addEventListener("beforeunload", (e) => {
    clearInterval(intervaloID);
    intervaloID = null;

    horas = 0;
    minutos =  0;
    segundos = 0;

    SpanHours.innerText = format(horas);
    SpanMinutes.innerText = format(minutos);
    SpanSeconds.innerText = format(segundos);
});
//------------------------------------------------------------------

// CRIAÇÃO DA ADIÇÃO DE TAREFAS

// VARIÁVEIS NECESSÁRIAS PARA A CRIAÇÃO
let AbrirTarefas = document.getElementById('div__tarefas');
let FecharTarefas = document.getElementById('fechar__gerenciador');
let GerenciarTarefas = document.getElementById('Gerenciador__de__tarefas');
let CorpoDaTarefa = createElement("div")


//------------------------------------------------------------------

//FUNÇÕES

function MostrarGerenciador(){
    GerenciarTarefas.style.display = ("block");
}

function AdicionarTarefas(){
    // let CorpoDaTarefa = createElement("div");
    // let NomeTarefa = document.createElement('p');
    
}


function FecharGerenciador(){
    GerenciarTarefas.style.display = ("none");
}


//------------------------------------------------------------------

//EVENTOS
AbrirTarefas.addEventListener("click", MostrarGerenciador);
FecharTarefas.addEventListener("click", FecharGerenciador);




