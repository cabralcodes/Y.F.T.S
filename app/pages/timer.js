let intervaloID = null;
let SpanHours = document.getElementById('hours');
let SpanMinutes = document.getElementById('minutes');
let SpanSeconds = document.getElementById('seconds');
let iniciarTimer = document.getElementById('start');
let reinciarTimer = document.getElementById('restart');
let pausarTimer = document.getElementById('pause');


let hours = Number(localStorage.getItem("HorasFoco"));
let minutes = Number(localStorage.getItem("MinutosFoco"));
let segundos = Number(SpanSeconds.innerText);
SpanHours.innerText = format(hours);
SpanMinutes.innerText = format(minutes);

if (hours <= 0) {
    SpanHours.innerText = "00"; 
    SpanMinutes.innerText = "00";
}   

function format(valor){
    return String(valor).padStart(2, "0");
}    


localStorage.setItem("dadosUsados", "sim");

if (localStorage.getItem("dadosUsados" === "sim")){
    localStorage.removeItem("HorasFoco");
    localStorage.removeItem("MinutosFoco");
    localStorage.removeItem("dadosUsados");
    SpanHours.innerText = "00";
    SpanMinutes.innerText = "00";
}    
else {
    SpanHours.innerText = format(hours);
    SpanMinutes.innerText = format(minutes); 
}


iniciarTimer.addEventListener("click", (e) =>{
    if (!intervaloID){
    intervaloID = setInterval(() => {
        SpanHours.innerText = format(hours);
        SpanMinutes.innerText = format(minutes);
        SpanSeconds.innerText = format(segundos);
          if (segundos === 0) {
        minutes--;
        segundos = 59;
    } else {
        segundos--;
    }
    if (segundos === 0 && minutos === 0 && horas === 0) {
    clearInterval(intervaloID);
    intervaloID = null;
    return;
    }
},1000);
};
    
});



reinciarTimer.addEventListener("click", (e) =>{
    hours = localStorage.getItem("HorasFoco");
    minutes = localStorage.getItem("MinutosFoco");
    segundos = 0;
    SpanHours.innerText = format(hours);
    SpanMinutes.innerText = format(minutes);
    SpanSeconds.innerText = format(segundos);
    clearInterval(intervaloID);
    intervaloID = null;
    if (intervaloID === null){
        intervaloID = setInterval(() => {
            SpanHours.innerText = format(hours);
            SpanMinutes.innerText = format(minutes);
            SpanSeconds.innerText = format(segundos);
            if (segundos === 0) {
                minutes--;
                segundos = 59;
            } else {
                segundos--;
            }
            if (segundos === 0 && minutes === 0 && hours === 0) {
    clearInterval(intervaloID);
    intervaloID = null;
    return;
}
        },1000);
    };
    
});

pausarTimer.addEventListener("click", (e) =>{
    if(intervaloID  !== null){
    clearInterval(intervaloID);
    intervaloID = null;
    }
    else{
       intervaloID = setInterval(() => {
           if (segundos === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(intervaloID);
                        intervaloID = null;
                        return;
                    }
                    hours--;
                    minutes = 59;
                } else {
                    minutes--;
                }
                segundos = 59;
            } else {
                segundos--;
            }

            SpanHours.innerText = format(hours);
            SpanMinutes.innerText = format(minutes);
            SpanSeconds.innerText = format(segundos);
           
        },1000);
}});
