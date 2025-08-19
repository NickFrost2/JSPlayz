const display = document.getElementById('result')
const errorDisplay = document.getElementById('error')

function appendTodisplay(input) {
   display.value += input;
}

function deleteLastCharacter() {
   display.value = display.value.slice(0, -1);
}

// function deleteChar() {
//    display.value = display.value.slice(0, 1);
// }

function clearDisplay() {
   display.value = '';
}

function calculateResult() {
   try {
      display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
      // display.style.color = '#FF4C4C';
   } catch (error) {
      errorDisplay.textContent = 'Error!';
      setTimeout(() => {
         errorDisplay.textContent = '';
      }, 1000);
      clearDisplay();
   }
}

document.addEventListener('keydown', (event) => {
   const key = event.key;
   if (key >= '0' && key <= '9') {
      appendTodisplay(key);
   } else if (key === 'Enter') {
      calculateResult();
   } else if (key === 'Backspace') {
      deleteLastCharacter();
   } else if (key === 'Delete') {
      clearDisplay();
   } else {
      const operatorMap = {
         '/': '÷',
         '*': '×',
         '-': '−',
         '+': '+',
         '%': '%',
         '.': '.',
      };
      if (operatorMap[key]) {
         appendTodisplay(operatorMap[key]);
      }
   }
});
