// Get DOM elements
const startCover = document.querySelector('.start-cover');
const cardsGrid = document.getElementById('cards-grid');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const resetBtn = document.querySelector('#reset');
const matches = document.querySelector('#matches');

let second = 0;
let matchCount = 0;

// Start Game
const startGame = () => {
  startCover.remove('div');

  // Timer functionality when count is greater than the digit 9
  function upTimer( count ) { 
    return count > 9 ? count : "0" + count;
  }
  // Start Timer
  setInterval( function(){
    seconds.innerHTML = upTimer(++second % 60);
    minutes.innerHTML = upTimer(parseInt(second / 60, 10));
  }, 1000);
};

// Link text
matches.textContent = matchCount;

// Generate the object
const getData = () => [
  { imgSrc: "./assets/images/a-space.png", name: "a-space" },
  { imgSrc: "./assets/images/b-line.png", name: "b-line" },
  { imgSrc: "./assets/images/c-line.png", name: "middle-c" },
  { imgSrc: "./assets/images/c-space.png", name: "c-space" },
  { imgSrc: "./assets/images/d-line.png", name: "d-line" },
  { imgSrc: "./assets/images/e-line.png", name: "e-line" },
  { imgSrc: "./assets/images/e-space.png", name: "e-space" },
  { imgSrc: "./assets/images/f-line.png", name: "f-line" },
  { imgSrc: "./assets/images/f-space.png", name: "f-space" },
  { imgSrc: "./assets/images/g-line.png", name: "g-line" },
  { imgSrc: "./assets/images/a-space.png", name: "a-space" },
  { imgSrc: "./assets/images/b-line.png", name: "b-line" },
  { imgSrc: "./assets/images/c-line.png", name: "middle-c" },
  { imgSrc: "./assets/images/c-space.png", name: "c-space" },
  { imgSrc: "./assets/images/d-line.png", name: "d-line" },
  { imgSrc: "./assets/images/e-line.png", name: "e-line" },
  { imgSrc: "./assets/images/e-space.png", name: "e-space" },
  { imgSrc: "./assets/images/f-line.png", name: "f-line" },
  { imgSrc: "./assets/images/f-space.png", name: "f-space" },
  { imgSrc: "./assets/images/g-line.png", name: "g-line" },
];

// Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Card Generator Function
const cardGenerator = () => {
  const cardData = randomize();

  cardData.forEach((item) => {
    // Generate the HTML for each cards
    const card = document.createElement('div');
    const frontCard = document.createElement('div');
    const backCard = document.createElement('img');
    card.classList = 'memory-card pos-relative flex';
    frontCard.classList = 'front-card image';
    backCard.classList = 'back-card';
    cardsGrid.appendChild(card);
    card.appendChild(frontCard);
    card.appendChild(backCard);
    // Attach the info to the cards
    backCard.src = item.imgSrc;
    card.setAttribute('name', item.name);

    card.addEventListener('click', (e) => {
      card.classList.toggle('isflipped');
      checkCards(e);
    });
  });
};

// Check cards for match if 'flipped'
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const isflipped = document.querySelectorAll('.isflipped');
  console.log(flippedCards);

  // Logic
  if(flippedCards.length === 2) {
    if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
      console.log('match');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
      matchCount++;
      matches.textContent = matchCount;
    } else {
      console.log('not a match');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('isflipped'), 1000);
      });
    };
  };

  if(isflipped.length === 20) {
    setTimeout(() => {
      alert('🎶🎶You win!🎶🎶');
      reset();
    }, 1000);
  };
};

// Reset function
const reset = () => {
  let cardData = randomize();
  let backs = document.querySelectorAll('.back-card');
  let cards = document.querySelectorAll('.memory-card');
  cardsGrid.style.pointerEvents = 'none';
  second = -1;

  cardData.forEach((item, index) => {
    cards[index].classList.remove('isflipped');
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      backs[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      cardsGrid.style.pointerEvents = 'all';
    }, 1000);
    let matchCount = 0;
    matches.textContent = matchCount;
  });
};

resetBtn.addEventListener('click', reset);
startCover.addEventListener('click', startGame);
cardGenerator();
