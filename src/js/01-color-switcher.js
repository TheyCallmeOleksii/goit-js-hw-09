const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', handleButtonClick);
stopBtn.addEventListener('click', handleButtonClick);

function handleButtonClick() {
  if (!timerId) {
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
