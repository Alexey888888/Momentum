import { getTimeOfDay } from "./time_date_greeting.js";

const body = document.querySelector(".body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
let randomNum = getRandomNum();

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function setBackground() {
  let backgroundNum = String(randomNum).padStart(2, "0");
  const timeOfDay = getTimeOfDay();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Alexey888888/stage1-tasks/assets/images/${timeOfDay}/${backgroundNum}.jpg`;

  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/Alexey888888/stage1-tasks/assets/images/${timeOfDay}/${backgroundNum}.jpg')`;
  };
}

function getSlideNext() {
  randomNum++;
  if (randomNum > 20) {
    randomNum = 1;
  }
  // console.log(randomNum);
  setBackground();
}

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) {
    randomNum = 20;
  }
  // console.log(randomNum);
  setBackground();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
setBackground();
