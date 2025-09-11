"use strict"
const burgerBtn = document.querySelector(".burger-icon-container");
const burgerMenu = document.querySelector(".menu");
const links = document.querySelectorAll('.nav-list > li');
const body = document.body;
const dialogWindow = document.querySelector('.modal-window-container.hidden-dialog');
const closeModalBtn = document.querySelector('.modal-btn');
const indexHtml = '/index.html';
const petsHtml = '/pets.html';

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
function visibleCardsOnPetsPage() {
  const width = window.innerWidth;
  if(width > 1200) return 8;
  if(width > 600) return 6;
  return 3;
}



const sliderContainerMainPage = document.querySelector('.card-container');
const sliderContainerPetsPage = document.querySelector('.pets-card-container');

function createCard(cardData, pageCardContainer, quantityOfCards) {

  const sliderContainer = pageCardContainer;
  
  sliderContainer.innerHTML = "";
 
  cardData.forEach((e, index) => {
    const cardContainer = document.createElement('article');
    const imageContainer = document.createElement('figure');
    const image = document.createElement('img');
    const petName = document.createElement('h4');
    const cardBtn = document.createElement('button');
    const animalBreed = e.animalBreed;
    const petDescription = e.description;
    const petAge = e.age;

    cardContainer.className = 'card';
    petName.classList = "h4";
    cardBtn.classList = 'btn-light';
    image.setAttribute('src', `${e.img}`);
    image.setAttribute('alt', `${e.name} the dog looking for a home`);
    petName.innerHTML = `${e.name}`;
    cardBtn.innerHTML = `${e.btn}`;

    cardBtn.addEventListener('click', (e) => {  
      if(dialogWindow.classList.contains('hidden-dialog')) {
        dialogWindow.classList.remove('hidden-dialog');
        document.documentElement.classList.add('scroll-stop');
        body.classList.add('color-body-cover');
      }

      const cardInfo = e.currentTarget.closest('.card');

      if (!cardInfo) return;
      
      const dialogImg = document.querySelector('.modal-img');
      const dialogH3 = document.querySelector('.modal-h3');
      const dialogH4 = document.querySelector('.modal-h4');
      const dialogDescription = document.querySelector('.modal-text');
      const dialogAge = document.querySelector('.modal-list>li>span');
      
      dialogImg.style.cssText = `background-image: url("${cardInfo.querySelector('img').src}");`;
      dialogH3.textContent = `${cardInfo.querySelector('h4').textContent}`;
      dialogH4.textContent = animalBreed;
      dialogDescription.textContent = petDescription;
      dialogAge.textContent = ` ${petAge} months`;
    })

    closeModalBtn.addEventListener('click', () => {
    dialogWindow.classList.add('hidden-dialog');
    document.documentElement.classList.remove('scroll-stop');
    body.classList.remove('color-body-cover');
  })
  
    cardContainer.appendChild(imageContainer);
    imageContainer.appendChild(image);
    cardContainer.appendChild(petName);
    cardContainer.appendChild(cardBtn);

    if(index >= quantityOfCards) {    // making only 3 cards visible when open site
      cardContainer.style.display = 'none';
    }
   

    sliderContainer.appendChild(cardContainer);
  })
  /* return; */
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
    // addCardsToSlider(data, visibleCards());
    

    function responsiveVisibleCards() {
      const visible = visibleCards();
      const cards = document.querySelectorAll('.card');
      cards.forEach((e, i) => {
        e.style.display = (i < visible) ? 'flex' : 'none';
      });
    }
    function responsiveVisibleCardsForPetsPage() {
      const visible = visibleCardsOnPetsPage();
      const cards = document.querySelectorAll('.card');
      cards.forEach((e, i) => {
        e.style.display = (i < visible) ? 'flex' : 'none';
      });
    }
    
    // responsiveVisibleCards(cards);
    // responsiveVisibleCardsForPetsPage(cards);


    if(window.location.pathname === indexHtml) {
      sliderContainerMainPage.innerHTML = "";
      console.log(true)
      createCard(data, sliderContainerMainPage, visibleCards());
      arrowsClickOnMainPage();
      window.addEventListener('resize', () => responsiveVisibleCards());
    }
    if(window.location.pathname === petsHtml) {
      sliderContainerPetsPage.innerHTML = "";
      console.log(true)
      createCard(data, sliderContainerPetsPage, visibleCardsOnPetsPage());
      arrowClickOnPetsPage();
      window.addEventListener('resize', () => responsiveVisibleCardsForPetsPage());
    }

  })
  .catch(error => {
    console.error('JSON upload error:', error);
});


function arrowsClickOnMainPage() {
  const arrowBtnRight = document.querySelector(".circle-btn.right");
  const arrowBtnLeft = document.querySelector(".circle-btn.left");
  const cards = Array.from(document.querySelectorAll(".card")); // get NodeListArr

  let cardsIndexes = cards.map((_, i) => i); // create arr with indexes of NodeListArr
  let lastShownIndexes = [0, 1, 2];

  const randomCardsGenerate = (count) => {
    const availableCards = cardsIndexes.filter(i => !lastShownIndexes.includes(i));
    const mixCards = availableCards.sort(() => Math.random() - 0.5);
    const nextThree = mixCards.slice(0 , count); // "count" is the quantity of cards depends on screen size
    lastShownIndexes = nextThree;

    return nextThree.map(i => cards[i]);
  }

  const shownNextCards = () => {
    let count = visibleCards(); // set the quantity of cards depends on the screen width
    cards.forEach(card => card.style.display = "none");
    let shownNextCards = randomCardsGenerate(count);
    shownNextCards.forEach(card => card.style.display = "flex")
  }

  arrowBtnRight.addEventListener("click", shownNextCards);
  arrowBtnLeft.addEventListener("click", shownNextCards);
}

/// TO DO improve logics
function arrowClickOnPetsPage() {
  const firstArrowLeft = document.querySelector('.pets-btn.first');
  const secondArrowLeft = document.querySelector('.pets-btn.second');
  const cards = Array.from(document.querySelectorAll(".card"));

  let cardsIndexes = cards.map((_, i) => i);
  // let shownCards = [];

  const randomCardSwapGenerate = (count) => {
    const cardsArr = cardsIndexes;
    const randomArr = cardsArr.sort(() => Math.random() - 0.5);
    const nextCards = randomArr.slice(0, count);
    // shownCards = nextCards;
    console.log(nextCards)
    
    return nextCards.map(i => cards[i])
  }

  const shownNextCards = () => {
    let count = visibleCardsOnPetsPage();  // set the quantity of cards depends on the screen width
    cards.forEach(card => card.style.display = "none");
    let shownNextCards = randomCardSwapGenerate(count)
    shownNextCards.forEach(card => card.style.display = "flex")
  }
  
  firstArrowLeft.addEventListener("click", shownNextCards);
  // arrowBtnLeft.addEventListener("click", shownNextCards);
}