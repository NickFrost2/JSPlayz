const toggle = document.getElementById('time-format');
const clockDisplay = document.getElementById('clock');
const hourHand = document.querySelector('.hourHand');
const minuteHand = document.querySelector('.minuteHand');
const secondHand = document.querySelector('.secondHand');
const main = document.querySelector('main');

function updateClock() {
   const now = new Date();
   let hours = now.getHours();
   let minutes = now.getMinutes();
   let seconds = now.getSeconds();

   // *Analog
   const secFraction = seconds / 60;
   const minFraction = (minutes + secFraction) / 60;
   const hourFraction = (hours + minFraction) / 12;
   secondHand.style.transform = `translateX(-50%) rotate(${secFraction * 360}deg)`;
   minuteHand.style.transform = `translateX(-50%) rotate(${minFraction * 360}deg)`;
   hourHand.style.transform = `translateX(-50%) rotate(${hourFraction * 360}deg)`;

   // *Digital
   let meridiem = '';
   let displayHours = hours;
   if (!toggle.checked) {
      meridiem = hours >= 12 ? 'PM' : 'AM';
      displayHours = hours % 12 || 12;

      main.style.borderRadius = '10px';
      main.style.padding = '15px';
   }
   else {
      main.style.borderRadius = '46% 46% 10px 10px';
      main.style.padding = '0 15px 15px';
   }

   clockDisplay.textContent =
      `${displayHours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')} ${meridiem}`;
}

toggle.addEventListener('change', updateClock);
updateClock();
setInterval(updateClock, 1000);