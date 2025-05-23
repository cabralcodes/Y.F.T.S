let minute = document.getElementById('minute');
let pause = document.getElementById('pause');

minute.addEventListener("change", (e) =>{
    let minuteValue = minute.value
    let pauseValue = pause.value
    let horas = Math.floor(minuteValue/60);
    let minutos = minuteValue % 60;
    let segundos = minutos
    let horasPausa = Math.floor(pauseValue / 60);
    let minutosPausa = pauseValue % 60;
    localStorage.setItem("HorasFoco", horas);
    localStorage.setItem("MinutosFoco", minutos);
});
 localStorage.setItem("dadosUsados", "nao");

