// VARIÁVEIS NECESSÁRIAS
let btnResumo = document.getElementById('adicionar');
let searchBar = document.getElementById('seacrh__bar');
let resumos = [];

function PaginaResumo(){
let Nome = searchBar.value.trim();

    let NovoResumo = {
        nome: Nome,
        id: Date.now(),
    }

    resumos.push(NovoResumo);

    let FundoResumo = document.createElement("div");
    FundoResumo.className = "add__page";
    let TopoFundo = document.createElement("div");
    TopoFundo.className = "top__edit";
    let NomeResumo = document.createElement("h1");
    let BtnFecharResumo = document.createElement("button");
    let imgFecharResumo = document.createElement("img");
    BtnFecharResumo.className = "botão__novo";
    imgFecharResumo.src = "../images/close.svg";
    imgFecharResumo.alt = "fechar página";
    BtnFecharResumo.appendChild(imgFecharResumo);
    TopoFundo.appendChild(NomeResumo, BtnFecharResumo);
    let CampoEscrita = document.createElement("textarea");
    let BtnSalvar = document.createElement("button");
    let BtnApagar = document.createElement("button");
    BtnSalvar.className = "salvar";
    BtnApagar.className = "apagar";

    FundoResumo.append(TopoFundo, CampoEscrita, BtnSalvar, BtnApagar);

}
