// ESQUEMA DE LEMBRETES
let AdicionarLembrete = document.getElementById('reminder__bar');
let BtnLembrete = document.getElementById('btn__reminder');
let GerenciadorLembrete = document.getElementById('add__task');


function AdicionarLembretes(){
  // pegar o nome do lembrete
  let lembrete = AdicionarLembrete.value.trim();

   if (lembrete === ""){
        alert("Digite uma tarefa válida!");
        return;
    }

}
