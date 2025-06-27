//Variáveis
let BtnDiario = document.getElementById('adicionar');
let BarraAddDiario = document.getElementById('search__bar');
let PomodoroContainer = document.getElementById('pomodoro__container');
let CardContainer = document.getElementById('cards__container');
let Diarios = JSON.parse(localStorage.getItem("diarios")) || [];
 let dataAtual = new Date();
 let dataFormatada = dataAtual.toLocaleDateString('pt-BR'); 


function PaginaDiario(){
   let Nome;
if (BarraAddDiario.value.trim()) {
  let partes = BarraAddDiario.value.split("-");
  Nome = `${partes[2]}/${partes[1]}/${partes[0]}`;
} else {
  Nome = dataFormatada; 
}

    //Fundo
    let FundoDiv = document.createElement('div');
    FundoDiv.className = "add__page";

    //topo
     let TopoDiv = document.createElement('div');
     TopoDiv.className = "top__edit";
     
     // título e botão de fechar
     let titulo = document.createElement('h1');
     titulo.textContent = Nome;
     let ImgBtnFechar = document.createElement('img');
     ImgBtnFechar.src = "../images/close.svg";
     ImgBtnFechar.alt = "Botão de fechar";
     
     
     // textarea e botões de salvar e apagar
     let BtnSalvar = document.createElement('button');
     let BtnApagar = document.createElement('button');
     let CampoEscrita = document.createElement('textarea');
     BtnSalvar.className = "salvar";
     BtnApagar.className = "apagar";
     BtnSalvar.textContent = "Salvar";
     BtnApagar.textContent = "Apagar";
     
     
     // Adcionando os elementos as divs
     TopoDiv.append(titulo, ImgBtnFechar);
     FundoDiv.append(TopoDiv, CampoEscrita, BtnSalvar, BtnApagar);
     PomodoroContainer.appendChild(FundoDiv);

     let FundoCard = document.createElement('div');
      FundoCard.className = "card";
      let TituloCard = document.createElement('h4');
      TituloCard.textContent = Nome;
      let TextoCard = document.createElement('p');
      TextoCard.className = "preview";
      FundoCard.append(TituloCard, TextoCard);
      
      // Criando tanto o html da div flutuante quanto o id do card
      let id = Date.now();
      let IdCard = FundoCard.id = "card-" + id;
      
      let NovoDiario = {
        id: id,
        nome: Nome,
        texto: "",
        idCard: IdCard, 
      }
     
       //função de fechar a página
       ImgBtnFechar.addEventListener("click", function(){
         FundoDiv.remove();
        });

        BtnSalvar.addEventListener("click", function(){
          let novoTexto = CampoEscrita.value.trim();
          TextoCard.textContent = limitarTexto(novoTexto, 80);
          Diarios.texto = novoTexto;
          let index = Diarios.findIndex(item => item.id === id);
          if (index === -1) {
            NovoDiario.texto = novoTexto;
            Diarios.push(NovoDiario);
            CardContainer.appendChild(FundoCard);
          } else {
            Diarios[index].texto = novoTexto;
          }
  
        localStorage.setItem("diarios", JSON.stringify(Diarios));
      
        });
  
      FundoCard.addEventListener("click", function(){
        abrirDiario(NovoDiario);
      });
      
      BtnApagar.addEventListener("click", function(){
        FundoDiv.remove();
        FundoCard.remove();
        Diarios = Diarios.filter(item => item.id !== id);
        localStorage.setItem("diarios", JSON.stringify(Diarios));
      })
      
      localStorage.setItem("diarios", JSON.stringify(Diarios));
      } 
      
      if (localStorage.getItem(("CriarResumoProximaPagina") === "true")){
        PaginaDiario();
        localStorage.removeItem("CriarResumoProximaPagina");
      }

function abrirDiario(diario) {
  let FundoDiv = document.createElement('div');
  FundoDiv.className = "add__page";
  
  let TopoDiv = document.createElement('div');
  TopoDiv.className = "top__edit";
  
  let titulo = document.createElement('h1');
  titulo.textContent = diario.nome;
  
  let ImgBtnFechar = document.createElement('img');
  ImgBtnFechar.src = "../images/close.svg";
  ImgBtnFechar.alt = "Botão de fechar";
  
  let CampoEscrita = document.createElement('textarea');
  CampoEscrita.value = diario.texto;
  
  let BtnSalvar = document.createElement('button');
  BtnSalvar.className = "salvar";
  BtnSalvar.textContent = "Salvar";
  
  let BtnApagar = document.createElement('button');
  BtnApagar.className = "apagar";
  BtnApagar.textContent = "Apagar";
  
  TopoDiv.append(titulo, ImgBtnFechar);
  FundoDiv.append(TopoDiv, CampoEscrita, BtnSalvar, BtnApagar);
  PomodoroContainer.appendChild(FundoDiv);
  
  ImgBtnFechar.addEventListener("click", () => FundoDiv.remove());
  
  BtnSalvar.addEventListener("click", () => {
    let novoTexto = CampoEscrita.value.trim();
    const index = Diarios.findIndex(r => r.id === diario.id);
    if (index !== -1) {
      Diarios[index].texto = novoTexto;
      localStorage.setItem("diarios", JSON.stringify(Diarios));
      
      // Atualiza o card
      const card = document.getElementById(diario.idCard);
      if (card) {
        card.querySelector(".preview").textContent = limitarTexto(novoTexto, 80);
      }
    }
  });
  
  BtnApagar.addEventListener("click", () => {
    FundoDiv.remove();
    const card = document.getElementById(diario.idCard);
    if (card) card.remove();
    Diarios = Diarios.filter(r => r.id !== diario.id);
    localStorage.setItem("diarios", JSON.stringify(Diarios));
  });
}

function carregarDiariosSalvos() {
  const diariosSalvos = localStorage.getItem("diarios");
  if (diariosSalvos) {
    Diarios = JSON.parse(diariosSalvos);
    
    Diarios.forEach(diario => {
      let card = document.createElement("div");
      card.className = "card";
      card.id = diario.idCard;
      
      let titulo = document.createElement("h4");
      titulo.textContent = diario.nome;
      
      let texto = document.createElement("p");
      texto.className = "preview";
      texto.textContent = limitarTexto(diario.texto, 80);
      
      card.append(titulo, texto);
      CardContainer.appendChild(card);
      
      card.addEventListener("click", () => abrirDiario(diario));
    });
  }
}

function limitarTexto(texto, limite) {
  texto = String(texto).trim();
  return texto.length > limite
    ? texto.slice(0, limite) + '...'
    : texto;
}

carregarDiariosSalvos();

BtnDiario.addEventListener("click",PaginaDiario);
