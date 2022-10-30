import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

let getEl = selector => document.querySelector(selector);

const refs = {
    input: getEl('#datetime-picker'),
    btnStart: getEl('[data-start]'),
    spanDays: getEl('[data-days]'),
    spanHours: getEl('[data-hours]'),
    spanMinutes: getEl('[data-minutes]'),
    spanSeconds: getEl('[data-seconds]')
};

let intervalID = null;

function buttonDisabled() {
    refs.btnStart.setAttribute('disabled', 'disabled');
};

buttonDisabled();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= options.defaultDate) {
          Notiflix.Notify.failure('Please choose a date in the future.')
          return buttonDisabled();
      }
      refs.btnStart.removeAttribute('disabled')
      msSelected = selectedDates[0].getTime();
  },
};

flatpickr(refs.input, options)

let msSelected = 0

const onStartTime = (() => {
    refs.btnStart.removeEventListener('click', onStartTime, false)
    const intervalID = setInterval(() => {
        const currentTime = Date.now()
        const time = msSelected - currentTime;
        const { days, hours, minutes, seconds } = convertMs(time)
        onChangeContent(days, hours, minutes, seconds)
        if (days < 1 && hours < 1 && minutes < 1 && seconds) {
            clearInterval(intervalID)
        }
    }, 1000)
});

function addLeadingZero(values) {
    return String(values).padStart(2, 0)
}

function onChangeContent(days, hours, minutes, seconds) {
    refs.spanDays.textContent = days;
    refs.spanHours.textContent = hours;
    refs.spanMinutes.textContent = minutes;
    refs.spanSeconds.textContent = seconds;
}

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

refs.btnStart.addEventListener('click', onStartTime);