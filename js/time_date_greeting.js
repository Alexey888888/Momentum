const timeOnPage = document.querySelector(".time");
const dateOnPage = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeOnPage.innerHTML = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  dateOnPage.innerHTML = currentDate;
}

export function getTimeOfDay() {
  const date = new Date();
  const hour = date.getHours();
  const arrTimeofDay = ["night", "morning", "afternoon", "evening"];
  const numOfDay = Math.floor(hour / 6);
  const timeOfDay = arrTimeofDay[numOfDay];
  return timeOfDay;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
}

showTime();
