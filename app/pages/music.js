let InputNome;
let InputMusica;
let BtnAdicionar;
let DivBtnMusicas = document.getElementById("musics");
let Player = document.getElementById("video");
let Musicas = JSON.parse(localStorage.getItem("musicasSalvas")) || [];

function ExtrairID(link) {
    let id = "";
    if (link.includes("youtube.com/watch?v=")) {
        const url = new URL(link);
        id = url.searchParams.get("v");
    } else if (link.includes("youtu.be/")) {
        const partes = link.split("/");
        id = partes[partes.length - 1].split("?")[0];
    }
    return id;
}

function CriarBotaoMusica(Musica) {
    let BtnMusica = document.createElement("button");
    BtnMusica.className = "name__musics";
    BtnMusica.textContent = Musica.Nome;
    DivBtnMusicas.append(BtnMusica);

    BtnMusica.addEventListener("click", () => {
        let BtnLimpar = document.createElement("button");
        BtnLimpar.className = "Btn__limpar";
        BtnLimpar.textContent = "Fechar";
        DivBtnMusicas.append(BtnLimpar);

        BtnLimpar.addEventListener("click", () => {
            Player.innerHTML = "";
            BtnLimpar.remove();
        });

        const idVideo = ExtrairID(Musica.Link);
        const embedLink = `https://www.youtube.com/embed/${idVideo}`;

        const iframe = document.createElement("iframe");
        iframe.src = embedLink;
        iframe.width = "350";
        iframe.height = "220";
        iframe.allowFullscreen = true;

        Player.innerHTML = "";
        Player.appendChild(iframe);
    });
}

function PegarMusica() {
    InputNome = document.getElementById("name__music");
    InputMusica = document.getElementById("url__music");
    BtnAdicionar = document.getElementById("adicionar");

    BtnAdicionar.addEventListener("click", (e) => {
        e.preventDefault();

        let Musica = {
            Nome: InputNome.value,
            Link: InputMusica.value,
        };

        if (Musica.Nome && Musica.Link) {
            Musicas.push(Musica);
            localStorage.setItem("musicasSalvas", JSON.stringify(Musicas));
            CriarBotaoMusica(Musica);

            InputNome.value = "";
            InputMusica.value = "";
        }
    });
}

// Recria os botões ao carregar a página
Musicas.forEach(CriarBotaoMusica);

// Ativa a função de adicionar
PegarMusica();
