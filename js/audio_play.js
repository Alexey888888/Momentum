import playList from "./playList.js";

const prev = document.querySelector(".play-prev");
const next = document.querySelector(".play-next");
const btnPlay = document.querySelector(".play");
const playListContainer = document.querySelector(".play-list");
//
let current = document.querySelector(".time-track .current");

//

let playItem;
let isPlay = false;
let playNum = 0;

const audio = new Audio();

function makePlayList() {
  playList.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = el.title;
    playListContainer.append(li);

    playItem = document.querySelectorAll(".play-item");
  });
}

makePlayList();

function playAudio() {
  if (playNum > 3) playNum = 0;
  if (playNum < 0) playNum = 3;
  audio.src = playList[playNum].src;
  //audio.currentTime = 0;
  toggleBtn();
  playItem[playNum].classList.toggle("item-active");
  document.querySelector(".current-track-name").innerHTML =
    playItem[playNum].innerHTML;

  if (!isPlay) {
    isPlay = true;
    audio.play();
  } else {
    audio.pause();
    isPlay = false;
  }
  audio.addEventListener("ended", playNext);
}

function playNext() {
  playNum++;
  isPlay = false;
  resetPlayItem();
  playAudio();
}

function playPrev() {
  playNum--;
  isPlay = false;
  resetPlayItem();
  playAudio();
}

function toggleBtn() {
  if (!isPlay) {
    btnPlay.classList.add("pause");
  } else btnPlay.classList.remove("pause");
}

function resetPlayItem() {
  playItem.forEach((el) => {
    el.classList.remove("item-active");
  });
}

btnPlay.addEventListener("click", playAudio);

next.addEventListener("click", playNext);
prev.addEventListener("click", playPrev);

/////////////////////////////////////////////////////

const player = document.querySelector(".player");

audio.addEventListener(
  "loadeddata",
  () => {
    player.querySelector(".length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    //audio.volume = 0.5;
  },
  false
);

const timeline = player.querySelector(".timeline");
timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

setInterval(() => {
  const progressBar = player.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  current.textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

////////////
///////////
//////////
player.querySelector(".icono-volumeMedium").addEventListener("click", () => {
  const volumeM = player.querySelector(".volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeM.classList.remove("icono-volumeMedium");
    volumeM.classList.add("icono-volumeMute");
  } else {
    volumeM.classList.add("icono-volumeMedium");
    volumeM.classList.remove("icono-volumeMute");
  }
});

const volumeSlider = player.querySelector(".volume-slider");
volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    player.querySelector(".volume-percentage").style.width =
      newVolume * 100 + "%";
  },
  false
);
