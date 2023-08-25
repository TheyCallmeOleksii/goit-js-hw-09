// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import swal from 'sweetalert';

import { Report } from 'notiflix/build/notiflix-report-aio';

// swal("Hello world!");

const inputEl = document.getElementById('datetime-picker');
const btn = document.querySelector('[data-start]');
const secondsEl = document.querySelector('[data-seconds]');
const minutesEl = document.querySelector('[data-minutes]');
const hoursEl = document.querySelector('[data-hours]');
const daysEl = document.querySelector('[data-days]');

let counter;
btn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      swal('Please choose a date in the future');
      btn.disabled = true;
    } else {
      inputEl.disabled = true;
      btn.disabled = false;
    }
  },
};
const displayTime = timeBack => {
  const { days, hours, minutes, seconds } = convertMs(timeBack);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
  if (timeBack <= 0) {
    Report.success('Time is ended', '', 'Okay');
    clearInterval(counter);
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';

    inputEl.disabled = false;
  }
};

const flatFunc = flatpickr(inputEl, options);

btn.addEventListener('click', onClick);

function onClick() {
  const selectedDate = flatFunc.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    const time = selectedDate.getTime() - currentDate.getTime();

    displayTime(time);

    counter = setInterval(() => {
      const timeUpdate = selectedDate.getTime() - new Date().getTime();
      displayTime(timeUpdate);

      if (timeUpdate <= 0) {
        clearInterval(counter);
      }
    }, 1000);
  }
}
