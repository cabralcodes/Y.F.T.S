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

function tocarSomSePermitido(tipo) {
  // Verifica se está habilitado no localStorage
  const notificacaoAtivada = localStorage.getItem("HabilitarNotificacao") === "true";
  if (!notificacaoAtivada) return; 

  // Mapeamento dos áudios
  const caminhos = {
    foco: "../audio/fim_foco.mp3",
    pausa: "../audio/fim_pausa.mp3",
    ciclos: "../audio/fim_4_ciclos.mp3",
  };

  const caminho = caminhos[tipo];
  if (caminho) {
    const audio = new Audio(caminho);
    audio.play().catch(e => console.error("Erro ao tocar áudio:", e));
  }
}


function notificarFimCiclo(tipo) {
  const notificacaoAtivada = localStorage.getItem("HabilitarNotificacao") === "true";
  if (!notificacaoAtivada) return;
  
  tocarSomSePermitido(tipo);
  
}



function iniciarContagem (){
    if (!intervaloID) {
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
            if(localStorage.getItem("TrocarPeriodo") ==="sim"){
            if (segundos === 0 && minutos === 0 && horas === 0 && modoAtual === 'foco') {
                modoAtual = 'pausa';
                periodoAtual.textContent = "Período de Pausa";
                notificarFimCiclo("foco");
                horas = HorasPausa;
                minutos = minutosPausa;
                segundos = 0;

                
                return;
            }

            if (segundos === 0 && minutos === 0 && horas === 0 && modoAtual === 'pausa') {
                modoAtual = 'foco';
                periodoAtual.innerText = "Período de Foco";
                notificarFimCiclo("pausa");                
                horas = horasFoco;
                minutos = MinutosFoco;
                segundos = 0;
                ContadorDeCiclos++;
                console.log(ContadorDeCiclos);

            } 
            if (ContadorDeCiclos >= 4) {
                clearInterval(intervaloID);
                intervaloID = null;
                notificarFimCiclo("ciclos");
                return;
            }
            

        }
        else{ 
            if( horas === 0 && minutos === 0 && segundos === 0){
                    clearInterval(intervaloID);
                    intervaloID = null;
                    notificarFimCiclo("ciclos");
                    
                }
        }
            
            SpanHours.innerText = format(horas);
            SpanMinutes.innerText = format(minutos);
            SpanSeconds.innerText = format(segundos);

        }, 1000);
    }
}
   

//------------------------------------------------------------------

// EVENTOS DE CLIQUE
iniciarTimer.addEventListener("click", iniciarContagem);

reinciarTimer.addEventListener("click", (e) => {
    clearInterval(intervaloID);
    intervaloID = null;
   if(localStorage.getItem("TrocarPeriodo") ==="sim"){
    horas = horasFoco;
    minutos = MinutosFoco;
    segundos = 0
    modoAtual = 'foco';
    periodoAtual.innerText = "Período de Foco";
    ContadorDeCiclos = 0;
   }
   else {
    if( horas === 0 && minutos === 0 && segundos === 0){
            clearInterval(intervaloID);
            intervaloID = null;
            notificarFimCiclo("ciclos");
                    
    }
   }
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
let AdicionarTarefa = document.getElementById('add_task');
let BtnTarefa = document.getElementById("BtnTarefa");

function NomeTarefa (){
    let Nome = AdicionarTarefa.value.trim();
    if (Nome === ""){
        alert("Digite uma tarefa válida!");
        return;
    }

    let taskItem = document.createElement("div");
    taskItem.className = "task__row";


    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task-" + Date.now();

    let paragrafo = document.createElement("p");
    paragrafo.htmlFor = checkbox.id;
    paragrafo.textContent = Nome;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(paragrafo);

     document.getElementById("div__task").appendChild(taskItem);
}

BtnTarefa.addEventListener("click", NomeTarefa);



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




