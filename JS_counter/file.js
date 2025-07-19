let increase = document.getElementById('increment');
let decrease = document.getElementById('decrement');
let reset = document.getElementById('reset');
let count = 0;

increase.addEventListener('click', () => {
   count++;
   document.getElementById('count').textContent = count;
});

decrease.addEventListener('click', () => {
   count--;
   document.getElementById('count').textContent = count;
});

reset.addEventListener('click', () => {
   count = 0;
   document.getElementById('count').textContent = count;
});


// this can also work
/*
const countDisplay = document.getElementById('count');
let count = 0;

document.getElementById('increment').addEventListener('click', () => {
    count++;
    updateDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
    count--;
    updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

function updateDisplay() {
    countDisplay.textContent = count;
}*/