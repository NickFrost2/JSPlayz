// --- Game Variables ---
const words = ["JAVASCRIPT", "PROGRAMMING", "ITERATION", "DEVELOPER", "WEB"]; // Your word list
let secretWord = ""; // The word to be guessed
let guessedWord = []; // Array to store the current state of guessed letters (e.g., ['_', 'A', '_', '_'])
let lives = 5; // Number of incorrect guesses allowed
let guessedLetters = []; // To keep track of letters already guessed by the user

// --- DOM Elements ---
const wordDisplayElement = document.getElementById('word-display');
const livesDisplayElement = document.getElementById('lives');
const messageElement = document.getElementById('message');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const newGameButton = document.getElementById('new-game-button');

// --- Functions ---

// 1. Initialize the game
function initializeGame() {
   // Reset game state
   lives = 5;
   guessedLetters = [];
   messageElement.textContent = "Start guessing!";
   livesDisplayElement.textContent = `Lives: ${lives}`;
   guessInput.value = '';
   guessInput.disabled = false;
   guessButton.disabled = false;
   newGameButton.style.display = 'none'; // Hide play again button

   // Pick a random word
   secretWord = words[Math.floor(Math.random() * words.length)];

   // Initialize guessedWord with underscores for each letter
   guessedWord = []; // Clear previous word
   // ✨ ITERATION 1: Using a for loop to create initial placeholders
   for (let i = 0; i < secretWord.length; i++) {
      guessedWord.push('_');
   }
   updateWordDisplay(); // Show the underscores
}

// 2. Update the word display on the page
function updateWordDisplay() {
   wordDisplayElement.textContent = guessedWord.join(' '); // Joins array elements with spaces
}

// 3. Handle a user's guess
function handleGuess() {
   let guess = guessInput.value.toUpperCase(); // Get guess and convert to uppercase for consistency
   guessInput.value = ''; // Clear input field

   // Input Validation (using guard clauses, as you've learned!)
   if (!guess) { // Check if input is empty
      messageElement.textContent = "Please enter a letter.";
      return;
   }
   if (guess.length > 1) { // Check if more than one letter
      messageElement.textContent = "Please guess one letter at a time.";
      return;
   }
   if (!/^[A-Z]$/.test(guess)) { // Check if it's an alphabet character (using RegExp)
      messageElement.textContent = "Please enter a valid alphabet letter.";
      return;
   }
   if (guessedLetters.includes(guess)) { // Check if letter was already guessed
      messageElement.textContent = `You already guessed "${guess}". Try a new letter.`;
      return;
   }

   // Add guess to history
   guessedLetters.push(guess);
   messageElement.textContent = `Guessed letters: ${guessedLetters.join(', ')}`;

   let correctGuess = false;
   // ✨ ITERATION 2: Loop through the secret word to check the guess
   for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === guess) {
         guessedWord[i] = guess; // Reveal the letter
         correctGuess = true;
      }
   }

   if (correctGuess) {
      updateWordDisplay(); // Update display with revealed letters
      messageElement.textContent = `Good guess! Guessed letters: ${guessedLetters.join(', ')}`;
      checkWinLose();
   } else {
      lives--;
      livesDisplayElement.textContent = `Lives: ${lives}`;
      messageElement.textContent = `Wrong guess! Guessed letters: ${guessedLetters.join(', ')}`;
      checkWinLose();
   }
}

// 4. Check if the game is won or lost
function checkWinLose() {
   if (guessedWord.join('') === secretWord) {
      messageElement.textContent = `🎉 You won! The word was "${secretWord}"!`;
      endGame();
   } else if (lives <= 0) {
      messageElement.textContent = `😭 You lost! The word was "${secretWord}".`;
      endGame();
   }
}

// 5. End the game (disable input, show play again button)
function endGame() {
   guessInput.disabled = true;
   guessButton.disabled = true;
   newGameButton.style.display = 'block'; // Show play again button
}

// --- Event Listeners ---
guessButton.addEventListener('click', handleGuess);

// Allow pressing Enter key to submit guess
guessInput.addEventListener('keypress', (e) => {
   if (e.key === 'Enter') {
      handleGuess();
   }
});

newGameButton.addEventListener('click', initializeGame);

// --- Initial Game Start ---
initializeGame(); // Start the game when the script loads