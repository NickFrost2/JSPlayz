// DOM elements
const playerResultElement = document.getElementById('PlayerResult');
const computerResultElement = document.getElementById('ComputerResult');
const resultDisplayElement = document.getElementById('Result');
const playerScoreElement = document.getElementById('PlayerScore');
const computerScoreElement = document.getElementById('ComputerScore');


const choices = ['Rock', 'Paper', 'Scissors'];

// const choices = ['🪨', '🧻', '✂️'];

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
   const computerChoice = choices[Math.floor(Math.random() * choices.length)];

   let result = '';

   if (playerChoice === computerChoice) {
      result = "It's a tie!";
   } else {
      switch (playerChoice) {
         case 'Rock':
            result = (computerChoice === 'Scissors') ? "You win!" : "You lose!";
            break;
         case 'Paper':
            result = (computerChoice === 'Rock') ? "You win!" : "You lose!";
            break;
         case 'Scissors':
            result = (computerChoice === 'Paper') ? "You win!" : "You lose!";
            break;
      }
   }

   playerResultElement.textContent = `Player: ${playerChoice}`;
   computerResultElement.textContent = `Computer: ${computerChoice}`;
   resultDisplayElement.textContent = result;

   switch (result) {
      case "You win!":
         playerScore++;
         playerScoreElement.textContent = playerScore;
         resultDisplayElement.className = 'result-text win';
         break;

      case "You lose!":
         computerScore++;
         computerScoreElement.textContent = computerScore;
         resultDisplayElement.className = 'result-text lose';
         break;

      case "It's a tie!":
         resultDisplayElement.className = 'result-text tie';
         break;

      default:
         resultDisplayElement.className = 'result-text';
         break;
   }
}

function resetGame() {
   playerScore = 0;
   computerScore = 0;

   playerScoreElement.textContent = '0';
   computerScoreElement.textContent = '0';
   playerResultElement.textContent = 'Player: -';
   computerResultElement.textContent = 'Computer: -';
   resultDisplayElement.textContent = 'Make your move!';
   resultDisplayElement.className = 'result-text';
}