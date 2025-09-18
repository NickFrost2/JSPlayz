const toCelsiusRadio = document.getElementById('toCelsius');
const toFahrenheitRadio = document.getElementById('toFahrenheit');
const displayElement = document.getElementById('display');

function convert() {
   const inputValue = parseFloat(document.getElementById('input').value);

   if (isNaN(inputValue)) {
      displayElement.textContent = "Please enter a valid number!";
      return;
   }

   let resultTemperature;
   if (toFahrenheitRadio.checked) {
      resultTemperature = (inputValue * 9 / 5) + 32;
      displayElement.textContent = resultTemperature.toFixed(2) + "°F";
   }
   else if (toCelsiusRadio.checked) {
      resultTemperature = (inputValue - 32) * (5 / 9);
      displayElement.textContent = resultTemperature.toFixed(2) + "°C";
   }
   else {
      displayElement.textContent = "Please select a conversion type.";
   }
}