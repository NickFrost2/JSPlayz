
const upTime = document.getElementById('up-time');
const leftTime = document.getElementById('left-time');
const rightTime = document.getElementById('right-time');
const downTime = document.getElementById('down-time');
const totalTime = document.getElementById('total-time');

const upBtn = document.getElementById('up-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const downBtn = document.getElementById('down-btn');
const totalBtn = document.getElementById('total-btn');


let upRunning = false;
let rightRunning = false;
let leftRunning = false;
let downRunning = false;

let upStartTime = 0;
let upElapseTime = 0;
let upTimer = null;

let leftStartTime = 0;
let leftElapseTime = 0;
let leftTimer = null;

let rightStartTime = 0;
let rightElapseTime = 0;
let rightTimer = null;

let downStartTime = 0;
let downElapseTime = 0;
let downTimer = null;


function upStart() {
   if (!upRunning) {
      clearInterval(upTimer);
      clearInterval(leftTimer);
      clearInterval(rightTimer);
      clearInterval(downTimer);

      upStartTime = Date.now() - upElapseTime;
      upTimer = setInterval(() => update(upTime), 10);
      upRunning = true;
      rightRunning = false;
      leftRunning = false;
      downRunning = false;
   }

   function update(direction) {
      const currentTime = Date.now();
      upElapseTime = currentTime - upStartTime;

      let minutes = Math.floor(upElapseTime / (1000 * 60));
      let seconds = Math.floor(upElapseTime / 1000 % 60);
      let milliSecond = Math.floor(upElapseTime % 1000 / 10);
      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      milliSecond = String(milliSecond).padStart(2, '0');

      display(direction, minutes, seconds, milliSecond);

      calculateTotalTime()
   }
}

function leftStart() {
   if (!leftRunning) {
      clearInterval(upTimer);
      clearInterval(leftTimer);
      clearInterval(rightTimer);
      clearInterval(downTimer);

      leftStartTime = Date.now() - leftElapseTime;
      leftTimer = setInterval(() => leftdate(leftTime), 10);
      upRunning = false;
      rightRunning = false;
      leftRunning = true;
      downRunning = false;
   }

   function leftdate(direction) {
      const currentTime = Date.now();
      leftElapseTime = currentTime - leftStartTime;

      let minutes = Math.floor(leftElapseTime / (1000 * 60));
      let seconds = Math.floor(leftElapseTime / 1000 % 60);
      let milliSecond = Math.floor(leftElapseTime % 1000 / 10);
      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      milliSecond = String(milliSecond).padStart(2, '0');

      display(direction, minutes, seconds, milliSecond);
      calculateTotalTime()
   }
}

function rightStart() {
   if (!rightRunning) {
      clearInterval(upTimer);
      clearInterval(leftTimer);
      clearInterval(rightTimer);
      clearInterval(downTimer);

      rightStartTime = Date.now() - rightElapseTime;
      rightTimer = setInterval(() => rightdate(rightTime), 10);
      upRunning = false;
      rightRunning = true;
      leftRunning = false;
      downRunning = false;
   }

   function rightdate(direction) {
      const currentTime = Date.now();
      rightElapseTime = currentTime - rightStartTime;

      let minutes = Math.floor(rightElapseTime / (1000 * 60));
      let seconds = Math.floor(rightElapseTime / 1000 % 60);
      let milliSecond = Math.floor(rightElapseTime % 1000 / 10);
      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      milliSecond = String(milliSecond).padStart(2, '0');

      display(direction, minutes, seconds, milliSecond);
      calculateTotalTime()
   }

}

function downStart() {
   if (!downRunning) {
      clearInterval(upTimer);
      clearInterval(leftTimer);
      clearInterval(rightTimer);
      clearInterval(downTimer);

      downStartTime = Date.now() - downElapseTime;
      downTimer = setInterval(() => downdate(downTime), 10);
      upRunning = false;
      rightRunning = false;
      leftRunning = false;
      downRunning = true;
   }

   function downdate(direction) {
      const currentTime = Date.now();
      downElapseTime = currentTime - downStartTime;

      let minutes = Math.floor(downElapseTime / (1000 * 60));
      let seconds = Math.floor(downElapseTime / 1000 % 60);
      let milliSecond = Math.floor(downElapseTime % 1000 / 10);
      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      milliSecond = String(milliSecond).padStart(2, '0');

      display(direction, minutes, seconds, milliSecond);
      calculateTotalTime()
   }
}

function stopAll() {
   clearInterval(upTimer);
   clearInterval(leftTimer);
   clearInterval(rightTimer);
   clearInterval(downTimer);

   upRunning = false;
   rightRunning = false;
   leftRunning = false;
   downRunning = false;
}

function resetAll() {
   clearInterval(upTimer);
   clearInterval(leftTimer);
   clearInterval(rightTimer);
   clearInterval(downTimer);

   upRunning = false;
   rightRunning = false;
   leftRunning = false;
   downRunning = false;

   upStartTime = 0;
   upElapseTime = 0;
   leftStartTime = 0;
   leftElapseTime = 0;
   rightStartTime = 0;
   rightElapseTime = 0;
   downStartTime = 0;
   downElapseTime = 0;

   display(upTime, '00', '00', '00');
   display(leftTime, '00', '00', '00');
   display(rightTime, '00', '00', '00');
   display(downTime, '00', '00', '00');
   if (totalTime) display(totalTime, '00', '00', '00');
}

function calculateTotalTime() {
   const totalElapsed = upElapseTime + leftElapseTime + rightElapseTime + downElapseTime;
   let minutes = Math.floor(totalElapsed / (1000 * 60));
   let seconds = Math.floor((totalElapsed / 1000) % 60);
   let milliSecond = Math.floor((totalElapsed % 1000) / 10);

   minutes = String(minutes).padStart(2, '0');
   seconds = String(seconds).padStart(2, '0');
   milliSecond = String(milliSecond).padStart(2, '0');

   display(totalTime, minutes, seconds, milliSecond);
}

function display(direction, minutes, seconds, milliSecond) {
   direction.textContent = `${minutes}:${seconds}:${milliSecond}`;
}


