let getEl = selector => document.querySelector(selector);

const btnStartRef = getEl('[data-start]');
const btnEndRef = getEl('[data-stop]');

let intervalID = null;


const onChangeStart = (event) => {
    intervalID = setInterval(() => {
         document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnEndRef.removeAttribute('disabled')
    btnStartRef.setAttribute('disabled', true)

};

const onChangeEnd = (event) => {
    clearInterval(intervalID);
    btnStartRef.removeAttribute('disabled')
    btnEndRef.setAttribute('disabled', true)
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStartRef.addEventListener('click', onChangeStart);
btnEndRef.addEventListener('click', onChangeEnd);

