"use strict"
const burgerBtn = document.querySelector(".burger-icon-container");
const burgerMenu = document.querySelector(".menu");
const links = document.querySelectorAll('.nav-list > li');
const body = document.body;

function clickEvents() {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('rotate');
    burgerMenu.classList.toggle('active'); 
    document.documentElement.classList.toggle('scroll-stop');
    body.classList.toggle('color-body-cover');
  })
links.forEach((element) => {
  element.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    body.classList.remove('color-body-cover');
    document.documentElement.classList.remove('scroll-stop');
    burgerBtn.classList.remove('rotate');
  })
})
document.addEventListener('click', (e) => {
  if (burgerBtn.contains(e.target) || burgerMenu.contains(e.target)) {
    return;
  }
  if(!burgerMenu.classList.contains('active')) {
    return;
  }
  burgerMenu.classList.remove('active');
  body.classList.remove('color-body-cover');
  document.documentElement.classList.remove('scroll-stop');
  burgerBtn.classList.remove('rotate');
  })
}
clickEvents();

function visibleCards() {
  const width = window.innerWidth;
  if(width > 1200) return 3;
  if(width > 600) return 2;
  return 1;
}

function addCardsToSlider(cardData, defaultVisibleCards = cardData.length) {
  const sliderContainer = document.querySelector('.card-container');
  cardData.forEach((e, index) => {
  const cardContainer = document.createElement('article');
  const imageContainer = document.createElement('figure');
  const image = document.createElement('img');
  const petName = document.createElement('h4');
  const cardBtn = document.createElement('button');
  cardContainer.className = 'card';
  petName.classList = "h4";
  cardBtn.classList = 'btn-light';
  image.setAttribute('src', `${e.img}`);
  image.setAttribute('alt', `${e.name} the dog looking for a home`);
  petName.innerHTML = `${e.name}`;
  cardBtn.innerHTML = `${e.btn}`;
  cardContainer.appendChild(imageContainer)
  imageContainer.appendChild(image);
  cardContainer.appendChild(petName);
  cardContainer.appendChild(cardBtn);
  
  if(index >= defaultVisibleCards) {    // making only 3 cards visible when open site
    cardContainer.style.display = 'none';
  }
  sliderContainer.appendChild(cardContainer);
  })

   // arrows click function
  const arrowBtnRight = document.querySelector(".circle-btn.right");
  const arrowBtnLeft = document.querySelector(".circle-btn.left");
  const cards = Array.from(document.querySelectorAll(".card")); // get NodeListArr

  let cardsIndexes = cards.map((_, i) => i); // create arr with indexes of NodeListArr
  let lastShownIndexes = [];

  const randomCardsGenerate = (count) => {
    const availableCards = cardsIndexes.filter(i => !lastShownIndexes.includes(i));
    const mixCards = availableCards.sort(() => Math.random() - 0.5);
    const nextThree = mixCards.slice(0 , count); // "count" is the quantity of cards depends on screen size
    
    lastShownIndexes = nextThree;
    return nextThree.map(i => cards[i])
  }
  const shownNextCards = () => {
    let count = visibleCards(); // set the quantity of cards depends on the screen width
    cards.forEach(card => card.style.display = "none");
    let shownNextCards = randomCardsGenerate(count);
    shownNextCards.forEach(card => card.style.display = "flex")
  }

  arrowBtnRight.addEventListener("click", shownNextCards);
  arrowBtnLeft.addEventListener("click", shownNextCards);

  return;
}

fetch('./cardData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // render 3 cards
    addCardsToSlider(data, 3);
    
    const cards = document.querySelectorAll('.card');

    function responsiveVisableCards() {
      const visible = visibleCards();
      cards.forEach((e, i) => {
        e.style.display = (i < visible) ? 'flex' : 'none';
      });
    }
    
    responsiveVisableCards(cards);
    window.addEventListener('resize', () => responsiveVisableCards(cards),);
  })
  .catch(error => {
    console.error('JSON upload error:', error);
});