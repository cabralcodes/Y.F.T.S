//------------------------------------------------------------------

let AbrirTarefas = document.getElementById('div__tarefas');
let FecharTarefas = document.getElementById('fechar__gerenciador');
let GerenciarTarefas = document.getElementById('Gerenciador__de__tarefas');



// funções de abrir e fechar o gerenciador
function MostrarGerenciador(){
    GerenciarTarefas.style.display = ("block");
}

function FecharGerenciador(){
    GerenciarTarefas.style.display = ("none");
}


//------------------------------------------------------------------

//EVENTOS
AbrirTarefas.addEventListener("click", MostrarGerenciador);
FecharTarefas.addEventListener("click", FecharGerenciador);
//------------------------------------------------------------------

// CRIAÇÃO DA ADIÇÃO DE TAREFAS

// VARIÁVEIS NECESSÁRIAS PARA A CRIAÇÃO
let AdicionarTarefa = document.getElementById('add_task');
let BtnTarefa = document.getElementById("BtnTarefa");
let DivHomeTarefa = document.getElementById('checklist');
let ApagarTarefa = document.getElementById('ApagarTarefa');
// let Nome = AdicionarTarefa.value.trim();

//-------------------------------------------------------------

//FUNÇÕES

// Array global para armazenar as tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function CriarTarefa() {
    // Pegar o nome da tarefa do input e tirar espaços em branco
    let Nome = AdicionarTarefa.value.trim();
    if (Nome === "") {
        alert("Digite uma tarefa válida!");
        return;
    }
    
    // Criar objeto da nova tarefa com id único
    let novaTarefa = {
        id: Date.now(),
        nome: Nome,
        feito: false
    };
    
    // Adiciona nova tarefa ao array
    tarefas.push(novaTarefa);
    
    // Salva no localStorage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    
    // Cria elementos na tela
    mostrarNaTela(novaTarefa);
    
}

function mostrarNaTela(tarefa) {
    let Nome = tarefa.nome;
    
    let taskItem = document.createElement("div");
    taskItem.className = "task__row";
    taskItem.id = "taskItem-" + tarefa.id;
    
    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    let paragrafo = document.createElement("p");
    // Label
    let label = document.createElement("label");
    label.id = "label-" + tarefa.id;
    label.append(checkbox, Nome);
    DivHomeTarefa.appendChild(label);
    
    // Botão apagar
    let botao = document.createElement("button");
    botao.className = "btn__apagar";
    let lixeira = document.createElement("img");
    lixeira.src = "./images/Trash 2.png";
    lixeira.alt = "Apagar tarefa";
    botao.appendChild(lixeira);
    
    // Montar o taskItem
    paragrafo.textContent  = Nome;
    taskItem.appendChild(paragrafo);
    taskItem.appendChild(botao);
    document.getElementById("div__task").appendChild(taskItem);
    
    // Marcar/desmarcar a tarefa visualmente
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            label.classList.add('checked');
            tarefa.feito = true;
        } else {
            label.classList.remove('checked');
            tarefa.feito = false;
        }
        // Atualiza o localStorage
        atualizarLocalStorage();
    });
    
    // Apagar tarefa
    botao.onclick = function() {
        ApagarTarefas(tarefa.id);
        taskItem.remove();
        label.remove();
    };
    
    return label;
}

// Função para apagar tarefa do array e atualizar localStorage
function ApagarTarefas(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    atualizarLocalStorage();
}

// Atualiza o localStorage com o array atual
function atualizarLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefasSalvas() {
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach(tarefa => {
        mostrarNaTela(tarefa);
    });
}

// Chama essa função quando a página carregar
window.onload = carregarTarefasSalvas;


BtnTarefa.addEventListener("click", CriarTarefa);

function removerTaskItemPorId(id) {
    let taskElement = document.getElementById(`taskItem-${id}`);
    if (taskElement) {
        taskElement.remove();
    }
}

function removerLabelTarefaPorId(id) {
    let label = document.getElementById(`label-${id}`);
    if (label) {
        label.remove();
    }
}

function LembreteNaPausa(){
    let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    lembretes.forEach(lembrete => {
        let NomeLembrete = lembrete.nome;
        let labelReminder = document.createElement("label");
        let checkboxReminder = document.createElement("input");
        checkboxReminder.type = "checkbox";
        labelReminder.append(checkboxReminder, NomeLembrete);
        DivHomeTarefa.appendChild(labelReminder);
    });
    
    
}

function removerLabelReminderPorId(id) {
    let labelReminder2 = document.getElementById(`lembrete-${id}`);
    if (labelReminder2) {
        labelReminder2.remove();
    }
}



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
                    tarefas.forEach(tarefa => {
                        removerTaskItemPorId(tarefa.id);
                        removerLabelTarefaPorId(tarefa.id);
                    });
                    LembreteNaPausa();    
                horas = HorasPausa;
                minutos = minutosPausa;
                segundos = 0;

                
                return;
            }

            let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
            if (segundos === 0 && minutos === 0 && horas === 0 && modoAtual === 'pausa') {
                modoAtual = 'foco';
                periodoAtual.innerText = "Período de Foco";
                notificarFimCiclo("pausa");
                lembretes.forEach(lembrete => {
                removerLabelReminderPorId(lembrete.id);
                });
                tarefas.forEach(tarefa => {
                 mostrarNaTela(tarefa);
                }); 
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
                tarefas.forEach(tarefa => {
                removerTaskItemPorId(tarefa.id);
                removerLabelTarefaPorId(tarefa.id);
            });
            if (localStorage.getItem("AtivarDiario") === "true") {
             localStorage.setItem("CriarDiarioProximaPagina", "true"); 
            }
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


