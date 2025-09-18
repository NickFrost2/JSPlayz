let [hours, minutes, seconds] = [0, 0, 0];
let count = document.getElementById("count");
let increment = document.getElementById("increment");
let decrement = document.getElementById("decrement");
let reset = document.getElementById("reset");

let interval;
let startTime;
let elapsedTime = 0;

increment.addEventListener("click", () => {
   clearInterval(interval);
   startTime = Date.now() - elapsedTime;
   interval = setInterval(updateTimer, 10);
});

decrement.addEventListener("click", () => {
   clearInterval(interval);
});

reset.addEventListener("click", () => {
   clearInterval(interval);
   elapsedTime = 0;
   [hours, minutes, seconds] = [0, 0, 0];
   count.innerHTML = "00:00:00:00";
});

function updateTimer() {
   elapsedTime = Date.now() - startTime;

   let totalSeconds = Math.floor(elapsedTime / 1000);

   let displayHours = Math.floor(totalSeconds / 3600);
   totalSeconds %= 3600;

   let displayMinutes = Math.floor(totalSeconds / 60);
   let displaySeconds = totalSeconds % 60;

   let displayMilliseconds = Math.floor((elapsedTime % 1000) / 10);

   count.innerHTML = `${String(displayHours).padStart(2, '0')}:${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}:${String(displayMilliseconds).padStart(2, '0')}`;
}