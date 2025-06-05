// ESQUEMA DE LEMBRETES
let AdicionarLembrete = document.getElementById('reminder__bar');
let BtnLembrete = document.getElementById('btn__reminder');
let GerenciadorLembrete = document.getElementById('add__task');
let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

function AdicionarLembretes(){
  // pegar o nome do lembrete
  let Nome = AdicionarLembrete.value.trim();
  if (Nome === ""){
       alert("Digite um lembrete válido!");
       return;
   }

  
  let novoLembrete = {
    id: Date.now(),
    nome: Nome,
  };
  
  lembretes.push(novoLembrete);
  
  localStorage.setItem("lembretes", JSON.stringify(lembretes));
  
  MostrarLembrete(novoLembrete);
}

function MostrarLembrete(lembrete){
  let Nome = lembrete.nome;
  // criando o item que aparece no gerenciador
  let reminderItem = document.createElement("div");
    reminderItem.className = "task__row";
    reminderItem.id = "reminderItem-" + lembrete.id;

      let checkboxReminder = document.createElement("input");
      checkboxReminder.type = "checkbox";

      let paragrafoReminder = document.createElement("p");

       let labelReminder = document.createElement("label");
      labelReminder.id = "labelReminder-" + lembrete.id;
      labelReminder.append(checkboxReminder, Nome);
      localStorage.setItem("labelReminder", labelReminder);

    let botao = document.createElement("button");
    botao.className = "btn__apagar";
    let lixeira = document.createElement("img");
    lixeira.src = "../images/Trash 2.png";
    lixeira.alt = "Apagar tarefa";
    botao.appendChild(lixeira);

    // mostrando o item
     paragrafoReminder.textContent  = Nome;
    reminderItem.appendChild(paragrafoReminder);
    reminderItem.appendChild(botao);
    GerenciadorLembrete.appendChild(reminderItem);

     checkboxReminder.addEventListener('change', function() {
        if (checkboxReminder.checked) {
            labelReminder.classList.add('checked');
        } else {
            labelReminder.classList.remove('checked');
        }
        // Atualiza o localStorage
        atualizarLocalStorage();
    });
    
    // Apagar tarefa
    botao.onclick = function() {
        ApagarLembretes(lembrete.id);
        reminderItem.remove();
        labelReminder.remove();
    };
    
    return labelReminder;

}


// Função para apagar tarefa do array e atualizar localStorage
function ApagarLembretes(id) {
    lembretes = lembretes.filter(lembrete => lembrete.id !== id);
    atualizarLocalStorage();
}

// Atualiza o localStorage com o array atual
function atualizarLocalStorage() {
    localStorage.setItem("lembretes", JSON.stringify(lembretes));
}

function carregarLembretesSalvos() {
    lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    lembretes.forEach(lembrete => {
        MostrarLembrete(lembrete);
    });
}

// Chama essa função quando a página carregar
window.onload = carregarLembretesSalvos;


BtnLembrete.addEventListener("click", AdicionarLembretes);
