let firstCard, secondCard;
let lockBoard = false;
let rows = 4;
let cols = 4;
let movesLeft = 20;

const gameBoard = document.querySelector("#gameBoard");
const statusDiv = document.querySelector("#status");
const heading = document.querySelector("h1");
const heading3 = document.querySelector("h3");
const buttons = document.querySelector("#start-btn");
const footer = document.querySelector("footer");
const moves = document.querySelector("#moves");
const select = document.querySelector("select");
const collumsSelect = document.querySelector("#collums");
// One Piece theme (default)
let onePieceEmojis = [
  "assets/luffy.png",
  "assets/hancock.png",
  "assets/zoro.png",
  "assets/robin.png",
  "assets/nami.png",
  "assets/sanji.png",
  "assets/usop.png",
  "assets/choper.png",
  "assets/brook.png",
  "assets/franky.png",
  "assets/ace.png",
  "assets/sabo.png",
  "assets/shanks.png",
  "assets/hawkaye.png",
  "assets/bonney.png",
  "assets/rojer.png",
  "assets/religh.png",
  "assets/vivi.png",
];

// Fruits theme
let fruitEmojis =  ["🍎","🍌","🍇","🍉","🍊","🍓","🍍","🥝","🍒","🍑","🥭","🥥","🥕","🍅","🥦","🌽","🍆","🥒"];

// Track current theme
let currentTheme = "onepiece"; // can be "fruits"

// Start / restart the game
function startGame() {
  gameBoard.innerHTML = "";
  [firstCard, secondCard, lockBoard] = [null, null, false];

  rows = parseInt(document.getElementById("rows").value);
  cols = parseInt(document.getElementById("collums").value);
  movesLeft = parseInt(document.getElementById("moves").value);

  gameBoard.style.gridTemplateColumns = `repeat(${cols}, 80px)`;

  const totalCards = rows * cols;
  const pairs = totalCards / 2;

  // Choose theme
  let selectedTheme = currentTheme === "fruits" ? fruitEmojis : onePieceEmojis;
  let gameEmojis = selectedTheme.slice(0, pairs).flatMap((e) => [e, e]);

  // Shuffle cards
  gameEmojis.sort(() => 0.5 - Math.random());

  // Add cards to board
  gameEmojis.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
   

    // Save the "value" for matching
    card.dataset.image = item;

    // Theme-specific front (cover)
    let frontDesign =
      currentTheme === "fruits"
        ? `<div class="front fruit-front" ></div>`
        : `<div class="front onepiece-front"></div>`;

    // Back of card (emoji or image)
    let backDesign =
      currentTheme === "fruits"
        ? `<div class="back"><span class="emoji">${item}</span></div>`
        : `<div class="back"><img src="${item}" alt="card image"></div>`;

    card.innerHTML = `
      ${frontDesign}
      ${backDesign}
    `;
    card.addEventListener("click", flipCard);
    gameBoard.append(card);
  });


  updateStatus();
}



// Flip card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

// Check match
function checkMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
  movesLeft--;
  updateStatus();

  if (movesLeft <= 0) {
    setTimeout(() => {
      alert("Game Over! You ran out of moves.");
      startGame();
    }, 500);
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();

  if (document.querySelectorAll(".card:not(.flip)").length === 0) {
    setTimeout(() => {
      alert("You Won!");
      startGame();
    }, 500);
  }
}

// Unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 700);
}

// Reset board
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Update status
function updateStatus() {
  statusDiv.innerText = `Moves Left: ${movesLeft}`;
}

// Switch theme
function switchTheme(theme) {
  
  currentTheme = theme;

console.log(currentTheme)
  // Remove old theme classes
  document.body.classList.remove("onepiece-theme", "fruits-theme");

  // Add new theme class
  const themes = {
  onepiece: {
    bodyClass: "onepiece-theme",
    headingBg: "rgba(35,31,32,255)",
    heading3Color: "rgba(35,31,32,255)",
    heading3It:"(Onepiece-addition)",
    buttonsBg: "rgba(35,31,32,255)",
    footerBg: "rgba(35,31,32,255)",
    selectShadow:"2px 2px 1px 1px rgba(35,31,32,255) ",
    cardBackSw:"2px 2px 1px 1px rgba(35,31,32,255) "
  },
  fruits: {
    bodyClass: "fruits-theme",
    headingBg: "linear-gradient(rgb(60, 122, 108), rgb(96, 50, 135), rgb(128, 0, 64))",
    heading3Color: "rgb(18, 74, 72)",
    heading3It:"(Fruits-addition)",
    buttonsBg: "linear-gradient(rgb(60, 122, 108), rgb(96, 50, 135), rgb(128, 0, 64))",
    footerBg: "linear-gradient(rgb(60, 122, 108), rgb(96, 50, 135), rgb(128, 0, 64))",
    selectShadow:"2px 2px 1px 1px rgb(96, 50, 135) ",
    cardBackSw:"2px 2px 1px 1px rgb(96, 50, 135) "
  }
};


if (themes[theme]) {
  const selected = themes[theme];
  document.body.classList.add(selected.bodyClass);
  heading.style.background = selected.headingBg;
  heading3.style.color = selected.heading3Color;
  heading3.innerText=selected.heading3It;
  buttons.style.background = selected.buttonsBg;
  footer.style.background = selected.footerBg;
  select.style.boxShadow = selected.selectShadow;
  moves.style.boxShadow = selected.selectShadow;
  collumsSelect.style.boxShadow = selected.selectShadow;
  heading.innerText="Memory Card Flip Game";

  
}
  
  

  startGame();
}