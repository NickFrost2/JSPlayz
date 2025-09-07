// @ts-nocheck
document.addEventListener('DOMContentLoaded', () => {
   const searchInput = document.getElementById('searchInput');
   const searchBtn = document.getElementById('searchBtn');

   const wordDisplay = document.getElementById('wordDisplay');
   const phoneticDisplay = document.getElementById('phoneticDisplay');
   const sidebarDisplay = document.querySelector('.sidebar');

   const synonymsList = document.getElementById('synonymsList');
   const antonymsList = document.getElementById('antonymsList');
   const bookmarkList = document.getElementById('bookmarkList');

   // Control elements
   const pronunciationBtn = document.getElementById('pronunciationBtn');
   const bookmarkBtn = document.getElementById('favoriteBtn');
   const pronunciationAudio = document.getElementById('pronunciationAudio');
   const bookmarkFolder = document.querySelector('.bookmarkFolder');


   document.addEventListener('click', (event) => {
      const isBookMarkBtnCLicked = bookmarkFolder.contains(event.target);
      const isSidebarClicked = sidebarDisplay.contains(event.target);
      if (!isBookMarkBtnCLicked && !isSidebarClicked) {
         hideBookmarks();
      }
   });

   bookmarkFolder.addEventListener('click', showBookmarks);
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

   };

   function hideBookmarks() {
      bookmarkFolder.innerHTML = '<i class="fa-solid fa-folder-bookmark"></i>';
      sidebarDisplay.classList.add('hidden');
   }

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

   function checkBookmark(word = 'word') {
      try {
         const storeBookMark = localStorage.getItem('bookmarkedWords');
         let bookMark = storeBookMark ? JSON.parse(storeBookMark) : [];
         const isBookmarked = bookMark.includes(word);
         return { bookMark, isBookmarked }
      }
      catch (error) {
         console.error(error);
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

   searchBtn.addEventListener('click', () => {
      let word = searchInput.value.trim();
      if (word === '') return setVisibleState('errorMessage');
      Dictionary(word);
   });

   pronunciationBtn.addEventListener('click', () => pronunciationAudio.play());

   function Dictionary(word) {
      setVisibleState('loadingState');

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
         .then(response => response.json())
         .then(data => {
            console.log(data);

            let word = data[0].word;
            if (!word || word.trim() === '') word = searchInput.value.trim();
            wordDisplay.textContent = word;

            const firstCompleteAudio = data[0].phonetics.find(p => p.text && p.audio && p.audio.trim() !== '');

            resetHidden(); //TO reset the audio back to visible

            if (firstCompleteAudio) {
               phoneticDisplay.textContent = firstCompleteAudio.text;
               pronunciationAudio.src = firstCompleteAudio.audio;
            }
            else {
               phoneticDisplay.classList.add('hidden');
               pronunciationBtn.classList.add('hidden');
            }

            //* Section that gets all Definition
            const allMeanings = data.flatMap(item => item.meanings);
            const groupedByPOS = allMeanings.reduce((acc, meaning) => {
               const pos = meaning.partOfSpeech;
               if (!acc[pos]) acc[pos] = [];
               acc[pos].push(...meaning.definitions);
               return acc;
            }, {});
            new DefinitionRenderer(`definitionsContainer`).render(groupedByPOS);

            // *Get all Synonyms for the entire word.
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

            // *Get all Antonyms for the entire word
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

            //* Check if word is bookmarked
            try {
               let { isBookmarked } = checkBookmark(word);
               if (isBookmarked) {
                  bookmarkBtn.classList.add('favorited')
               } else {
                  bookmarkBtn.classList.remove('favorited')
               }
            }
            catch (error) {
               console.log(error);
            }

            setVisibleState('resultSection')
            setVisibleState('resultSection');
         })
         .catch(error => {
            console.error('Error fetching data:', error);
            setVisibleState('errorMessage');
         })
   };

   class DefinitionRenderer {
      constructor(containerId) {
         this.container = document.getElementById(containerId);
      }

      render(groupedByPOS) {
         if (!this.container) return console.error('Container not found');
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
         synonymsList.appendChild(this._createButton());
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

   function search(text) {
      searchInput.value = text;
      searchBtn.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }

   function resetHidden() {
      phoneticDisplay.classList.remove('hidden');
      pronunciationBtn.classList.remove('hidden');
      antonymsList.innerHTML = '';
      synonymsList.innerHTML = '';
   }

   document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         searchBtn.click();
      }
      searchInput.focus();
   });
});