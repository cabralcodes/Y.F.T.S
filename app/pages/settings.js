//VARIÁVEIS NECESSÁRIAS
let minute = document.getElementById('minute');
let pause = document.getElementById('pause');
let Notificacao = document.getElementById('option__3');
let ConfigCronometro = document.getElementById('option__1');
let CheckDiario = document.getElementById('option__2');
//---------------------------------------------------------------------------------------------

// Habilitar criação de resumo ao zerar 
CheckDiario.addEventListener("change", () => {
  localStorage.setItem("AtivarDiario", CheckDiario.checked ? "true" : "false");
});


//---------------------------------------------------------------------------------------------

Notificacao.addEventListener("change", async () => {
  if (Notificacao.checked) {
    const permission = await Notification.requestPermission();
    const permitido = permission === "granted";
    localStorage.setItem("MostrarToque", Notificacao.checked);
    
    localStorage.setItem("HabilitarNotificacao", String(permitido));

    Notificacao.checked = permitido;
    if (!permitido) {
      alert("Notificações bloqueadas. O áudio também não funcionará.");
    }
  } else {
    // Se desmarcou, desativa tudo
    localStorage.setItem("HabilitarNotificacao", "false");
  }
});

ConfigCronometro.addEventListener("change", ()=>{
    if(ConfigCronometro.checked){
        localStorage.setItem("TrocarPeriodo", "sim");
    }
    else {
      localStorage.setItem("TrocarPeriodo", "nao");
    }
});


// EVENTOS
minute.addEventListener("change", (e) =>{
    let minuteValue = minute.value
    let pauseValue = pause.value
    let horas = Math.floor(minuteValue/60);
    let minutos = minuteValue % 60;
    let horasPausa = Math.floor(pauseValue / 60);
    let minutosPausa = pauseValue % 60;
    localStorage.setItem("MostrarFoco", minuteValue);
    localStorage.setItem("HorasFoco", horas);
    localStorage.setItem("MinutosFoco", minutos);
    console.log(minuteValue);
  });
  localStorage.setItem("dadosUsados", "nao");
  
  pause.addEventListener("change", (e) => {
    let pauseValue = pause.value
    localStorage.setItem("MostrarPausa", pauseValue);
    let horasPausa = Math.floor(pauseValue / 60);
    let minutosPausa = pauseValue % 60;
    localStorage.setItem("HorasPausa",horasPausa);
    localStorage.setItem("minutosPausa", minutosPausa);
});

window.onload =  function(){
  if(localStorage.getItem("MostrarFoco")){
    document.getElementById("minute").value = localStorage.getItem("MostrarFoco");
  }

  if(localStorage.getItem("MostrarPausa")){
    document.getElementById("pause").value = localStorage.getItem("MostrarPausa");
  }

  if(localStorage.getItem("MostrarToque")){
    document.getElementById("option__3").checked = true;
  }
  else{
    document.getElementById("option__3").checked = false;
  }

  if(localStorage.getItem("AtivarDiario") === "true"){
    document.getElementById("option__2").checked = true;
  }
  else{
    document.getElementById("option__2").checked = false;
  }

  if(localStorage.getItem("TrocarPeriodo")  === "sim"){
    document.getElementById("option__1").checked = true;
  }
  else {
    document.getElementById("option__1").checked = false;
  }
}


//------------------------------------------------------------




