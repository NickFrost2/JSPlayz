let [hours, minutes, seconds] = [0, 0, 0];
let count = document.getElementById("count");
let increment = document.getElementById("increment");
let decrement = document.getElementById("decrement");
let reset = document.getElementById("reset");
let interval;

increment.addEventListener("click", () => {
   clearInterval(interval);
   interval = setInterval(startTimer, 500); // Adjust the interval as needed
});

decrement.addEventListener("click", () => {
   clearInterval(interval);
});

reset.addEventListener("click", () => {
   clearInterval(interval);
   [hours, minutes, seconds] = [0, 0, 0];
   count.innerHTML = "00:00:00";
});

function startTimer() {
   seconds++;
   if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
         minutes = 0;
         hours++;
      }
   }
   count.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}