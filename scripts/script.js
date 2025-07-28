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

function addCardToSlider(cardData, defaultVisibleCards = cardData.length) {
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
  return;
}
fetch('../cardData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // render 3 cards
    addCardToSlider(data, 3);

    // responsive setenings
    function responsiveVisableCards() {
      const cards = document.querySelectorAll('.card');
      const width = window.innerWidth;
      let visibleCards;
      if (width > 1200) {
        visibleCards = 3;
      } else if (width > 600) {
        visibleCards = 2;
      } else {
        visibleCards = 1;
      }

      cards.forEach((e, i) => {
        e.style.display = (i < visibleCards) ? 'flex' : 'none';
      });
    }

    responsiveVisableCards();
    window.addEventListener('resize', responsiveVisableCards);
  })
  .catch(error => {
    console.error('JSON upload error:', error);
  });
