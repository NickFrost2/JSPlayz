
const toggle = document.getElementById('time-format')
const clockDisplay = document.getElementById('clock');

function clock() {
   const currentTime = new Date();
   let hours = currentTime.getHours();

   let meridiem = '';

   if (!toggle.checked) {
      meridiem = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
   }
   else {
      meridiem = '';
   }

   const minutes = currentTime.getMinutes();
   const seconds = currentTime.getSeconds();

   clockDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${meridiem}`
}
toggle.addEventListener('change', clock);

clock()
setInterval(clock, 1000);