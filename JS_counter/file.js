let increaseBtn = document.getElementById('increment');
let decreaseBtn = document.getElementById('decrement');
let revert = document.getElementById('reset');
let count = 0;


function increment() {
   count++;
   display(count);
}

function decrement() {
   count--;
   display(count);
}
function reset() {
   count = 0;
   display(count);
}

function display(count) {
   document.getElementById('count').textContent = count;
}

increaseBtn.onclick = increment;
decreaseBtn.onclick = decrement;
revert.onclick = reset;


document.addEventListener('keydown', (event) => {
   const key = event.key;
   if (key === 'ArrowUp' || key === 'ArrowLeft') {
      increment()
   }
   else if (key === 'ArrowDown' || key === 'ArrowRight') {
      decrement()
   }
   else if (key === 'Enter') {
      reset()
   }
})