"use strict"
console.log("hello")
const burgerBtn = document.querySelector(".burger-icon-container");
const burgerMenu = document.querySelector(".menu");

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('rotate');
  burgerMenu.classList.toggle('active'); 
  body.classList.toggle('scroll-stop');
})