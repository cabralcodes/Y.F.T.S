let SpanHours = document.getElementById('hours');
let SpanMinutes = document.getElementById('minutes');
let SpanSeconds = document.getElementById('seconds');

let hours = localStorage.getItem("HorasFoco");
let minutes = localStorage.getItem("MinutosFoco");

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

if ("dadosUsados" === "sim"){
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
