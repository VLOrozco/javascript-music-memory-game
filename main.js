const template = document.querySelector('template');
const cardsGrid = document.getElementById('cards-grid');
const memoryCard = document.querySelector('.memory-card');
const frontCard = document.querySelector('.front-card');
const backCard = document.querySelector('.back-card');

// clone template content to reuse it multiple times
var i;
for (i=0; i < 12; i++) {
  cardsGrid.append(template.content.cloneNode(true));
};

// Generate the objects
const getData = () => [
  { imgSrc: "./assets/images/a-line.png", name: "a-line" },
  { imgSrc: "./assets/images/a-space.png", name: "a-space" },
  { imgSrc: "./assets/images/b-line.png", name: "b-line" },
  { imgSrc: "./assets/images/c-line.png", name: "c-line" },
  { imgSrc: "./assets/images/c-space.png", name: "c-space" },
  { imgSrc: "./assets/images/d-line.png", name: "d-line" },
  { imgSrc: "./assets/images/d-space.png", name: "d-space" },
  { imgSrc: "./assets/images/e-line.png", name: "e-line" },
  { imgSrc: "./assets/images/e-space.png", name: "e-space" },
  { imgSrc: "./assets/images/f-line.png", name: "f-line" },
  { imgSrc: "./assets/images/f-space.png", name: "f-space" },
  { imgSrc: "./assets/images/g-line.png", name: "g-line" },
  { imgSrc: "./assets/images/g-space.png", name: "g-space" },
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
    // Attach the data to the cards
    backCard.src = item.imgSrc;
    // Attach the cards to the cardsGrid
    cardsGrid.appendChild(memoryCard);
    memoryCard.appendChild(frontCard);memoryCard.appendChild(backCard);
  });
  
};

cardGenerator();
