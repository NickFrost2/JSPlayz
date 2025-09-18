const min = 1;
const max = 100;
const answer = Math.floor(Math.random() * (max - min + 1)) + min;
const updateDisplay = document.getElementById('display');

let attempts = 0;

document.getElementById('button').addEventListener('click', (e) => {
   const userGuess = parseInt(document.getElementById('userGuess').value, 10);

   if (isNaN(userGuess)) {
      return updateDisplay.textContent = `Enter a valid number`;
   };

   if (userGuess > 100 || userGuess < 1) {
      return updateDisplay.textContent = `Value must be between 1 and 100`;
   }

   attempts++;
   document.getElementById('attempts').textContent = `Attempts: ${attempts}`;

   if (userGuess > answer) {
      updateDisplay.textContent = `Too high, try again`;
   }
   else if (userGuess < answer) {
      updateDisplay.textContent = `Too low, try again`;
   }
   else {
      updateDisplay.textContent = `Correct, the answer is ${answer}, it took you ${attempts} attempts`;
   }
});
