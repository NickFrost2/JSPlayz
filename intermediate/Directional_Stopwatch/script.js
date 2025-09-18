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
const resetBtn = document.getElementById('reset');

const directions = {
   up: { timeElem: upTime, running: false, startTime: 0, elapsed: 0, timer: null },
   left: { timeElem: leftTime, running: false, startTime: 0, elapsed: 0, timer: null },
   right: { timeElem: rightTime, running: false, startTime: 0, elapsed: 0, timer: null },
   down: { timeElem: downTime, running: false, startTime: 0, elapsed: 0, timer: null }
};

function startDirection(dir) {
   Object.values(directions).forEach(d => {
      clearInterval(d.timer);
      d.running = false;
   });
   const d = directions[dir];
   d.startTime = Date.now() - d.elapsed;
   d.timer = setInterval(() => updateDirection(dir), 10);
   d.running = true;
}

function updateDirection(dir) {
   const d = directions[dir];
   d.elapsed = Date.now() - d.startTime;
   let minutes = Math.floor(d.elapsed / (1000 * 60));
   let seconds = Math.floor((d.elapsed / 1000) % 60);
   let milliSecond = Math.floor((d.elapsed % 1000) / 10);
   minutes = String(minutes).padStart(2, '0');
   seconds = String(seconds).padStart(2, '0');
   milliSecond = String(milliSecond).padStart(2, '0');
   d.timeElem.textContent = `${minutes}:${seconds}:${milliSecond}`;
   updateTotalTime();
}

function updateTotalTime() {
   const totalElapsed = Object.values(directions).reduce((sum, d) => sum + d.elapsed, 0);
   let minutes = Math.floor(totalElapsed / (1000 * 60));
   let seconds = Math.floor((totalElapsed / 1000) % 60);
   let milliSecond = Math.floor((totalElapsed % 1000) / 10);
   minutes = String(minutes).padStart(2, '0');
   seconds = String(seconds).padStart(2, '0');
   milliSecond = String(milliSecond).padStart(2, '0');
   totalTime.textContent = `${minutes}:${seconds}:${milliSecond}`;
}

function stopAll() {
   Object.values(directions).forEach(d => {
      clearInterval(d.timer);
      d.running = false;
   });
}

function resetAll() {
   stopAll();
   Object.values(directions).forEach(d => {
      d.startTime = 0;
      d.elapsed = 0;
      d.timeElem.textContent = '00:00:00';
   });
   totalTime.textContent = '00:00:00';
}

upBtn.onclick = () => startDirection('up');
leftBtn.onclick = () => startDirection('left');
rightBtn.onclick = () => startDirection('right');
downBtn.onclick = () => startDirection('down');
totalBtn.onclick = stopAll;
resetBtn.onclick = resetAll;

document.addEventListener("keydown", (event) => {
   const keyName = event.key;
   switch (keyName) {
      case 'ArrowUp':
         startDirection('up')
         break;
      case 'ArrowLeft':
         startDirection('left')
         break;
      case 'ArrowRight':
         startDirection('right')
         break;
      case 'ArrowDown':
         startDirection('down')
         break;
      case 'Enter':
         stopAll()
         break;
      case 'Escape':
         resetAll()
         break;
   }
})