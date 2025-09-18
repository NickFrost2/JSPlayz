
const factDisplay = document.querySelector('.factDisplay');
const getButton = document.getElementById('getButton');
const loader = document.querySelector('.loader');
const backBtn = document.getElementById('backButton');
const forwardBtn = document.getElementById('forwardButton');

const factHistory = [];
let currentIndex = -1;

function showFact(text) {
   factDisplay.textContent = text;
}

function setLoading(isLoading) {
   loader.style.display = isLoading ? 'block' : 'none';
}

function getFact() {
   showFact('');
   setLoading(true);
   fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
      .then(response => response.json())
      .then(data => {
         if (currentIndex < factHistory.length - 1) {
            factHistory.splice(currentIndex + 1);
         }
         factHistory.push(data.text);
         currentIndex = factHistory.length - 1;

         showFact(data.text);
      })
      .catch(error => {
         showFact("Failed to fetch fact.");
         console.error(error);
      })
      .finally(() => setLoading(false));
}

getButton.addEventListener('click', getFact);

backBtn.addEventListener('click', () => {
   if (currentIndex > 0) {
      currentIndex--;
      showFact(factHistory[currentIndex]);
   } else {
      alert("No previous fact available.");
   }
});

forwardBtn.addEventListener('click', () => {
   if (currentIndex < factHistory.length - 1) {
      currentIndex++;
      showFact(factHistory[currentIndex]);
   } else {
      alert("No next fact available.");
   }
});

getFact();