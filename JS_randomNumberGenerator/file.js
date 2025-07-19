let button = document.getElementById('button');
let display = document.getElementById('display');
let min = document.getElementById('min').value;
let max = document.getElementById('max').value;

button.addEventListener('click', (e) => {
   let min = parseInt(document.getElementById('min').value, 10);
   let max = parseInt(document.getElementById('max').value, 10);

   if (isNaN(min) || isNaN(max)) {
      document.getElementById('display').textContent =
         `enter a valid number`;
   }
   else if (min >= max) {
      document.getElementById('display').textContent =
         `Max value must be greater than Min value.`;
   }
   else {
      document.getElementById('display').textContent =
         Math.floor(Math.random() * (max - min + 1) + min)
   }

});