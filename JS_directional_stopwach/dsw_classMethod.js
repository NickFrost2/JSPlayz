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
const resetBtn = document.getElementById('reset')

class Timer {
   constructor(displayEl) {
      this.displayEl = displayEl;
      this.running = false;
      this.startTime = 0;
      this.elapsedTime = 0;
      this.timeId = null;
   }

   start() {
      clearInterval(this.timeId);
      this.startTime = Date.now() - this.elapsedTime;
      this.timeId = setInterval(() => this.update(), 10);
      this.running = true;
   }

   update() {
      const currentTime = Date.now();
      this.elapsedTime = currentTime - this.startTime;
      let minutes = Math.floor(this.elapsedTime / (1000 * 60));
      let seconds = Math.floor(this.elapsedTime / 1000 % 60);
      let milliSecond = Math.floor(this.elapsedTime % 1000 / 10);
      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      milliSecond = String(milliSecond).padStart(2, '0');

      this.updateDisplay(minutes, seconds, milliSecond);
      // if (this.onUpdate) this.onUpdate();
      manager.calculateTotal()
   }

   stop() {
      this.running = false;
      clearInterval(this.timeId);
   }

   reset() {
      clearInterval(this.timeId);
      this.running = false;
      this.startTime = 0;
      this.elapsedTime = 0;

      this.updateDisplay('00', '00', '00');
   }

   updateDisplay(minutes, seconds, milliSecond) {
      this.displayEl.textContent = `${minutes}:${seconds}:${milliSecond}`;
   }
}

class timeManager {
   constructor() {
      this.timers = {
         up: new Timer(upTime),
         left: new Timer(leftTime),
         right: new Timer(rightTime),
         down: new Timer(downTime)
      }
   }
   start(dir) {
      this.stopAll();
      this.timers[dir].start();
   }

   stopAll() {
      for (let key in this.timers) {
         this.timers[key].stop();
      }
   }

   resetAll() {
      for (let key in this.timers) {
         this.timers[key].reset();
      }
   }

   calculateTotal() {
      let totalElapsed = 0;
      for (let key in this.timers) {
         totalElapsed += this.timers[key].elapsedTime;
      }
      let minutes = Math.floor(totalElapsed / (1000 * 60));
      let seconds = Math.floor((totalElapsed / 1000) % 60);
      let milliSecond = Math.floor((totalElapsed % 1000) / 10);

      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      milliSecond = String(milliSecond).padStart(2, '0');
      totalTime.textContent = `${minutes}:${seconds}:${milliSecond}`;

   }
}
const manager = new timeManager;

[
   ["up", upBtn],
   ['left', leftBtn],
   ['right', rightBtn],
   ['down', downBtn]
].forEach(([dir, Btn]) => {
   Btn.addEventListener('click', () => manager.start(dir)
   )
})
totalBtn.addEventListener('click', () => manager.stopAll());
resetBtn.addEventListener('click', () => manager.resetAll());
