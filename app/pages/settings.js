//VARIÁVEIS NECESSÁRIAS
let minute = document.getElementById('minute');
let pause = document.getElementById('pause');
let Notificacao = document.getElementById('option__3');
let ConfigCronometro = document.getElementById('option__1');
let CheckDiario = document.getElementById('option__2');
//---------------------------------------------------------------------------------------------

// Habilitar criação de resumo ao zerar 
CheckDiario.addEventListener("change", () => {
  localStorage.setItem("AtivarDiario", Resumo.checked ? "true" : "false");
});


//---------------------------------------------------------------------------------------------

Notificacao.addEventListener("change", async () => {
  if (Notificacao.checked) {
    const permission = await Notification.requestPermission();
    const permitido = permission === "granted";
    
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
    localStorage.setItem("HorasFoco", horas);
    localStorage.setItem("MinutosFoco", minutos);
});
 localStorage.setItem("dadosUsados", "nao");

pause.addEventListener("change", (e) => {
    let pauseValue = pause.value
    let horasPausa = Math.floor(pauseValue / 60);
    let minutosPausa = pauseValue % 60;
    localStorage.setItem("HorasPausa",horasPausa);
    localStorage.setItem("minutosPausa", minutosPausa);
});

//------------------------------------------------------------




