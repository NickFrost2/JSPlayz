// @ts-nocheck
document.addEventListener('DOMContentLoaded', () => {

   // *DOM Elements
   const searchInput = document.getElementById('searchInput');
   const searchBtn = document.getElementById('searchBtn');

   const wordDisplay = document.getElementById('wordDisplay');
   const phoneticDisplay = document.getElementById('phoneticDisplay');
   const sidebarDisplay = document.querySelector('.sidebar');

   const synonymsList = document.getElementById('synonymsList');
   const antonymsList = document.getElementById('antonymsList');
   const bookmarkList = document.getElementById('bookmarkList');

   const pronunciationBtn = document.getElementById('pronunciationBtn');
   const bookmarkBtn = document.getElementById('favoriteBtn');
   const pronunciationAudio = document.getElementById('pronunciationAudio');
   const bookmarkFolder = document.querySelector('.bookmarkFolder');
   const toggleTheme = document.getElementById('toggle-theme')

   // *Event listeners
   document.addEventListener('click', (event) => {
      const isBookMarkBtnCLicked = bookmarkFolder.contains(event.target);
      const isSidebarClicked = sidebarDisplay.contains(event.target);
      if (!isBookMarkBtnCLicked && !isSidebarClicked) {
         hideBookmarks();
      }
   });
   document.addEventListener('keydown', (event) => {
      searchInput.focus();
      if (event.key === 'Enter' && searchInput.value) {
         event.preventDefault();
         searchBtn.click();
      }
   });

   toggleTheme.addEventListener('click', themeToggler);

   bookmarkFolder.addEventListener('click', showBookmarks);

   bookmarkBtn.addEventListener('click', () => {
      const word = wordDisplay.textContent;
      let { bookMark, isBookmarked } = checkBookmark(word);

      if (isBookmarked) {
         bookMark = bookMark.filter(item => item !== word);
         bookmarkBtn.classList.remove('favorited');
      }
      else {
         bookMark = [...bookMark, word];
         bookmarkBtn.classList.add('favorited');
      };

      localStorage.setItem('bookmarkedWords', JSON.stringify(bookMark));
   });

   searchBtn.addEventListener('click', () => {
      let word = searchInput.value.trim();
      if (word === '') {
         return errorDisplay("Text input is empty!", "Search for any word above to get started. You'll see definitions, pronunciations, synonyms, and more.")
      }
      if (!navigator.onLine) {
         return errorDisplay("You are offline. Please connect to the internet", "Search for any word above to get started. You'll see definitions, pronunciations, synonyms, and more.")
      }

      Dictionary(word);
   });

   pronunciationBtn.addEventListener('click', pronunce);

   // *Functions
   function pronunce() {
      const word = wordDisplay.textContent;
      if ('speechSynthesis' in window) {
         const speech = new SpeechSynthesisUtterance();
         speech.text = word;
         speech.volume = 1;    // 0 to 1
         speech.rate = 1;      // 0.1 to 10
         speech.pitch = 1;     // 0 to 2
         speech.lang = 'en-US';

         window.speechSynthesis.speak(speech);
         return;
      }
      if (pronunciationAudio.src) {
         pronunciationAudio.play();
         console.log('i speak with the API')
         return
      };
   };
   
   function errorDisplay(h3 = `Word not found`, p = `Sorry, we couldn't find that word. Please check your spelling and try again.`) {
      errorMessage.innerHTML = `<h3>${h3}</h3>
                                 <p>${p}<p>`;
      return setVisibleState('errorMessage');
   }

   function showBookmarks(event) {
      event.stopPropagation();
      if (bookmarkFolder.innerHTML === '<i class="fa-solid fa-xmark"></i>') return hideBookmarks();

      let { bookMark } = checkBookmark();
      bookmarkList.innerHTML = '';
      bookMark.forEach(bookmark => {
         new Variant(bookmark).constructBookmark();
      });
      bookmarkFolder.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      sidebarDisplay.classList.remove('hidden');
      // localStorage.setItem('sidebarOpened', 'true');
   };

   function hideBookmarks() {
      bookmarkFolder.innerHTML = '<i class="fa-solid fa-folder-bookmark"></i>';
      sidebarDisplay.classList.add('hidden');
      // localStorage.setItem('sidebarOpened', "false");
   }

   function checkBookmark(word = 'word') {
      try {
         const storeBookMark = localStorage.getItem('bookmarkedWords');
         let bookMark = storeBookMark ? JSON.parse(storeBookMark) : [];
         const isBookmarked = bookMark.includes(word);
         return { bookMark, isBookmarked }
      }
      catch (error) {
         return {
            bookMark: [], isBookmarked: false
         }
      }
   }

   function setVisibleState(visibleElement) {
      const states = ['resultSection', 'errorMessage', 'loadingState', 'emptyState'];
      states.forEach(state => {
         const element = document.getElementById(state);
         if (element) {
            if (state === visibleElement) {
               element.classList.remove('hidden');
               element.classList.add('show');
            } else {
               element.classList.remove('show');
               element.classList.add('hidden');
            }
         }
      });
   }
   // const debounce = (func, delay) => {
   //    let timeoutId;
   //    return (...args) => {
   //       clearTimeout(timeoutId);
   //       timeoutId = setTimeout(() => {
   //          func.apply(this, args);
   //       }, delay);
   //    };
   // };

   // const performSearch = (word) => {
   //    if (word.trim() === '') {
   //       return setVisibleState('errorMessage');
   //    }
   //    Dictionary(word.trim());
   // };

   // searchBtn.addEventListener('click', () => {
   //    const word = searchInput.value;
   //    performSearch(word);
   // });

   // const debouncedPerformSearch = debounce(performSearch, 500);

   // searchInput.addEventListener('input', (event) => {
   //    const word = event.target.value;
   //    debouncedPerformSearch(word);
   // });

   function Dictionary(word) {
      setVisibleState('loadingState');

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
         .then(response => {
            if (!response.ok) {
               throw new Error(`Word not found! (Status: ${response.status})`);
            }
            return response.json();
         })
         .then(data => {
            console.log(data);

            let word = data[0].word;
            if (!word || word.trim() === '') word = searchInput.value.trim();
            wordDisplay.textContent = word;
            localStorage.setItem('lastCheckedWord', word);

            const firstCompleteAudio = data[0].phonetics.find(p => p.text && p.audio && p.audio.trim() !== '');

            resetHidden(); //To reset the audio back to visible

            if (firstCompleteAudio) {
               phoneticDisplay.textContent = firstCompleteAudio.text;
               pronunciationAudio.src = firstCompleteAudio.audio;
            }
            else {
               phoneticDisplay.classList.add('hidden');
               if (!('speechSynthesis' in window)) {
                  pronunciationBtn.classList.add('hidden');
               }
            }

            //& Section that gets all Definition
            const allMeanings = data.flatMap(item => item.meanings);
            const groupedByPOS = allMeanings.reduce((acc, meaning) => {
               const pos = meaning.partOfSpeech;
               if (!acc[pos]) acc[pos] = [];
               acc[pos].push(...meaning.definitions);
               return acc;
            }, {});
            new DefinitionRenderer(`definitionsContainer`).render(groupedByPOS);

            //& Get all Synonyms for the entire word.
            const allSynonyms = data
               .flatMap(wordObj => wordObj.meanings)
               .flatMap(meaning => [
                  ...meaning.synonyms,
                  ...meaning.definitions.flatMap(def => def.synonyms)
               ])
               .filter(Boolean);
            const uniqueSynonyms = [...new Set(allSynonyms)];
            uniqueSynonyms.forEach((synonym, index) => {
               new Variant(synonym).constructSynonyms();
            });

            //& Get all Antonyms for the entire word
            const allAntonyms = data
               .flatMap(wordObj => wordObj.meanings)
               .flatMap(meaning => [
                  ...(meaning.antonyms || []),
                  ...meaning.definitions.flatMap(def => def.antonyms || [])
               ])
               .filter(antonym => antonym && antonym.trim() !== '');
            const uniqueAntonyms = [...new Set(allAntonyms)];
            uniqueAntonyms.forEach((antonym, index) => {
               new Variant(antonym).constructAntonyms();
            });

            //& Check if word is bookmarked
            try {
               let { isBookmarked } = checkBookmark(word);
               if (isBookmarked) {
                  bookmarkBtn.classList.add('favorited')
               } else {
                  bookmarkBtn.classList.remove('favorited')
               }
            }
            catch (error) {
            }

            setVisibleState('resultSection')
         })
         .catch(error => {
            if (error.message.includes('not found')) {
               errorDisplay("Word not found", "Sorry, we couldn't find that word. Please check your spelling and try again.");
            } else {
               errorDisplay("Network Error", "Could not connect to the dictionary. Please check your internet connection and try again.");
            }
         })
   };

   function search(text) {
      searchInput.value = text;
      searchBtn.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }

   function resetHidden() {
      phoneticDisplay.classList.remove('hidden');
      pronunciationBtn.classList.remove('hidden');
      pronunciationAudio.src = ''
      antonymsList.innerHTML = '';
      synonymsList.innerHTML = '';
   }

   function initializeApp() {
      const lastWord = localStorage.getItem('lastCheckedWord');
      if (lastWord) {
         search(lastWord);
      } else {
         setVisibleState('emptyState');
      }
      // const sidebarStatus = localStorage.getItem('sidebarOpened');
      // if (sidebarStatus === 'true') {
      //    showBookmarks();
      // }
   }

   function themeToggler() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');

      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      const newIcon = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

      html.setAttribute('data-theme', newTheme);
      toggleTheme.innerHTML = newIcon;
      localStorage.setItem('theme', newTheme);
   }

   function theme() {
      const html = document.documentElement;
      const userTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      const userIcon = userTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      html.setAttribute('data-theme', userTheme);
      toggleTheme.innerHTML = userIcon;
   }

   // *Classes
   class DefinitionRenderer {
      constructor(containerId) {
         this.container = document.getElementById(containerId);
      }

      render(groupedByPOS) {
         if (!this.container) return;
         this.container.innerHTML = this.generateHTML(groupedByPOS);
      }

      generateHTML(groupedByPOS) {
         let html = '';

         Object.entries(groupedByPOS).forEach(([partOfSpeech, definitions]) => {
            html += this.renderPartOfSpeech(partOfSpeech, definitions, definitions.length);
         });
         return html;
      }

      renderPartOfSpeech(partOfSpeech, definitions, length) {
         return `
         <div class="part-of-speech-section">
            <h3 class="part-of-speech-title">${this.capitalizeFirst(partOfSpeech)} <span class="part-of-speech-count">(${length})</span></h3>
            <div class="definitions-list">
               ${definitions.map((def, index) => this.renderDefinition(def, index)).join('')}
            </div>
         </div>`;
      }

      renderDefinition(definition, index) {
         const exampleHTML = definition.example
            ? `<div class="example-text">"${definition.example}"</div>`
            : '';

         return `
         <div class="definition-item">
            <div class="definition-header">
               <span class="definition-number">${index + 1}.</span>
               <span class="definition-text">${definition.definition}</span>
            </div>
            ${exampleHTML}
         </div>`;
      }

      capitalizeFirst(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
      }
   }

   class Variant {
      constructor(text) {
         this.text = text;
      }

      _createButton() {
         const newBtn = document.createElement('button');
         newBtn.classList.add('word-tags');
         newBtn.textContent = this.text;
         newBtn.addEventListener('click', () => search(this.text));
         return newBtn;
      }

      constructSynonyms() {
         const newBtn = this._createButton();
         synonymsList.appendChild(newBtn);
      }

      constructAntonyms() {
         const newBtn = this._createButton();
         antonymsList.appendChild(newBtn);
      }

      constructBookmark() {
         const newBtn = this._createButton();
         newBtn.classList.remove('word-tags');
         bookmarkList.prepend(newBtn);
      }
   }

   initializeApp();
   theme();
});