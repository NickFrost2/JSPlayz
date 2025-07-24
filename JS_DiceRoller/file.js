function rollDice() {
   const numOfDice = parseInt(document.getElementById('userInput').value, 10);
   const diceResult = document.getElementById('diceResult');
   const diceImages = document.getElementById('diceImages');
   const results = [];
   const images = [];

   for (i = 0; i < numOfDice; i++) {
      const randomDice = Math.floor(Math.random() * 6 + 1)
      results.push(randomDice)
      images.push(`<img src="${randomDice}.png">`)
   }

   diceResult.textContent = `Dice: ${results.join(", ")}`;
   diceImages.innerHTML = images.join("")
}