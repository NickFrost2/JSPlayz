const input = document.getElementById('input');
const result = document.getElementById('display');
const fromSelect = document.getElementById('fromSelect');
const toSelect = document.getElementById('toSelect');
const form = document.getElementById('converterForm');

const baseMap = {
   binary: 2,
   octal: 8,
   decimal: 10,
   hexadecimal: 16
};

const inputConfig = {
   binary: {
      placeholder: 'Enter binary value (e.g., 1011)',
      pattern: '[0-1]*',
      title: 'Please enter only binary digits (0 or 1)'
   },
   octal: {
      placeholder: 'Enter octal value (e.g., 75)',
      pattern: '[0-7]*',
      title: 'Please enter only octal digits (0-7)'
   },
   decimal: {
      placeholder: 'Enter decimal value (e.g., 42)',
      pattern: '[0-9]*',
      title: 'Please enter only decimal digits (0-9)'
   },
   hexadecimal: {
      placeholder: 'Enter hex value (e.g., 1A3F)',
      pattern: '[0-9A-Fa-f]*',
      title: 'Please enter only hexadecimal digits (0-9, A-F)'
   }
};

form.addEventListener('submit', (event) => {
   event.preventDefault();
   if (!form.checkValidity()) {
      form.reportValidity();
      return;
   }
   convert();
});

function convert() {
   const userInput = input.value.trim();
   const fromBase = baseMap[fromSelect.value];
   const toBase = baseMap[toSelect.value];

   const number = parseInt(userInput, fromBase);
   if (isNaN(number)) {
      result.textContent = "Invalid input for selected base.";
      return;
   }

   let output = number.toString(toBase);
   if (toBase === 16) output = output.toUpperCase();
   if (toBase === 2) output = output.padStart(8, '0');
   else if (toBase === 8) output = output.padStart(3, '0');
   else if (toBase === 10) output = parseInt(output).toString();

   result.textContent = output;
}

fromSelect.addEventListener('change', (event) => {
   const selected = event.target.value;
   const config = inputConfig[selected];
   input.placeholder = config.placeholder;
   input.pattern = config.pattern;
   input.title = config.title;
   // input.value = '';
   result.textContent = '0';
   input.setCustomValidity('');
   input.checkValidity();
});