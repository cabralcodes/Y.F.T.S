// VARIÁVEIS NECESSÁRIAS
let btnResumo = document.getElementById('adicionar');
let pomodoroContainer = document.getElementById('pomodoro__container');
let searchBar = document.getElementById('search__bar');
let CardContainer = document.getElementById('cards__container');
let resumos = JSON.parse(localStorage.getItem("resumos")) || [];


//cria tanto a div quanto o card
function PaginaResumo(){
    // pegar valor do input
    let Nome = searchBar.value.trim();
    // criar div flutuante

    //fundo
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
    pomodoroContainer.appendChild(FundoDiv);
    
    // função de fechar a página
    ImgBtnFechar.addEventListener("click", function(){
        FundoDiv.remove();
    });

    
    
    
    // função de salvar, toda a parte de salvar os objetos
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

  let NovoResumo = {
       id: id,
       nome: Nome,
       texto: "",
       idCard: IdCard, 
   }
    BtnSalvar.addEventListener("click", function(){
        let novoTexto = CampoEscrita.value.trim();
        TextoCard.textContent = limitarTexto(novoTexto, 80);
        NovoResumo.texto = novoTexto;
    let index = resumos.findIndex(item => item.id === id);
    if (index === -1) {
      NovoResumo.texto = novoTexto;
      resumos.push(NovoResumo);
      CardContainer.appendChild(FundoCard);
    } else {
      resumos[index].texto = novoTexto;
    }

    localStorage.setItem("resumos", JSON.stringify(resumos));
    
    });

    FundoCard.addEventListener("click", function(){
        abrirResumo(NovoResumo);
    })

    BtnApagar.addEventListener("click", function(){
        FundoDiv.remove();
        FundoCard.remove();
          resumos = resumos.filter(item => item.id !== id);
    localStorage.setItem("resumos", JSON.stringify(resumos));
    })

    
    localStorage.setItem("resumos", JSON.stringify(resumos));
}

function abrirResumo(resumo) {
  let FundoDiv = document.createElement('div');
  FundoDiv.className = "add__page";

  let TopoDiv = document.createElement('div');
  TopoDiv.className = "top__edit";

  let titulo = document.createElement('h1');
  titulo.textContent = resumo.nome;

  let ImgBtnFechar = document.createElement('img');
  ImgBtnFechar.src = "../images/close.svg";
  ImgBtnFechar.alt = "Botão de fechar";

  let CampoEscrita = document.createElement('textarea');
  CampoEscrita.value = resumo.texto;

  let BtnSalvar = document.createElement('button');
  BtnSalvar.className = "salvar";
  BtnSalvar.textContent = "Salvar";

  let BtnApagar = document.createElement('button');
  BtnApagar.className = "apagar";
  BtnApagar.textContent = "Apagar";

  TopoDiv.append(titulo, ImgBtnFechar);
  FundoDiv.append(TopoDiv, CampoEscrita, BtnSalvar, BtnApagar);
  pomodoroContainer.appendChild(FundoDiv);

  ImgBtnFechar.addEventListener("click", () => FundoDiv.remove());
  
  BtnSalvar.addEventListener("click", () => {
    let novoTexto = CampoEscrita.value.trim();
    const index = resumos.findIndex(r => r.id === resumo.id);
    if (index !== -1) {
      resumos[index].texto = novoTexto;
      localStorage.setItem("resumos", JSON.stringify(resumos));
      
      // Atualiza o card
      const card = document.getElementById(resumo.idCard);
      if (card) {
        card.querySelector(".preview").textContent = limitarTexto(novoTexto, 80);
      }
    }
  });
  
  BtnApagar.addEventListener("click", () => {
    FundoDiv.remove();
    const card = document.getElementById(resumo.idCard);
    if (card) card.remove();
    resumos = resumos.filter(r => r.id !== resumo.id);
    localStorage.setItem("resumos", JSON.stringify(resumos));
  });
}

function carregarResumosSalvos() {
  const resumosSalvos = localStorage.getItem("resumos");
  if (resumosSalvos) {
    resumos = JSON.parse(resumosSalvos);
    
    resumos.forEach(resumo => {
      let card = document.createElement("div");
      card.className = "card";
      card.id = resumo.idCard;
      
      let titulo = document.createElement("h4");
      titulo.textContent = resumo.nome;
      
      let texto = document.createElement("p");
      texto.className = "preview";
      texto.textContent = limitarTexto(resumo.texto, 80);
      
      card.append(titulo, texto);
      CardContainer.appendChild(card);
      
      card.addEventListener("click", () => abrirResumo(resumo));
    });
  }
}

function limitarTexto(texto, limite) {
  texto = String(texto).trim();
  return texto.length > limite
    ? texto.slice(0, limite) + '...'
    : texto;
}

carregarResumosSalvos();

btnResumo.addEventListener("click",PaginaResumo);
