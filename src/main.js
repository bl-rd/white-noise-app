import Noise from './pink-noise.js';

// Selectors
const button = document.querySelector('button');
const timer = document.querySelector('p');
const buttonText = document.querySelector('#button-text');
const stopButton = document.querySelector('.stop-button-wrapper button');

const noise = new Noise();
// default to 45 minutes
const minutes = 45;
const total = 60 * 1000 * minutes;
const animationDuration = 1.2;

let alreadyHidden = false;
setAnimation();

button.addEventListener('click', event => {
  if (noise.playing) {
    stopNoise();
  }
  else {
    button.classList.add('play');
    stopButton.classList.add('play');

    button.disabled = true;
    startNoise();
    // when the animation is finished then remove the button from the DOM
    button.addEventListener('animationend', e => {
      document.querySelector('body').classList.add('play');
      buttonText.classList.add('play');
      document.querySelector('p').classList.add('active');
      // setTimeout(() => button.parentElement.removeChild(button), animationDuration * 1000 * 1.2);
      setTimeout(() => {
        if (!alreadyHidden) {
          button.classList.add('hide');
          alreadyHidden = true;
        }

      }, animationDuration * 1000 * 1.2);
    })
  }
});

stopButton.addEventListener('click', event => {
  if (!stopButton.classList.contains('play')) {
    return;
  }
  reset();
});

function updateTimePlayed() {
  const duration = new Date(total - noise.duration());
  let minutes = duration.getMinutes();
  let seconds = duration.getSeconds();
  minutes = minutes < 10 ? `0${minutes.toString()}` : minutes;
  seconds = seconds < 10 ? `0${seconds.toString()}` : seconds;
  timer.textContent = `${minutes}:${seconds}`;

  if (duration.getTime() <= 0) {
    reset();
  }
}

function stopNoise() {
  console.log('stopping');
  noise.stop();
  // buttonText.textContent = '🌙';
  window.clearInterval(updateTimePlayed);
  timer.classList.add('hide');
}

function startNoise() {
  console.log('starting...');
  noise.start();
  // buttonText.textContent = '😣';
  window.setInterval(updateTimePlayed, 1000);
  timer.classList.remove('hide');
}

function setAnimation() {
  const html = document.querySelector('html');
  html.style.setProperty('--animation-duration', `${animationDuration}s`);
}

function reset() {
  stopNoise();

  // stopButton.classList.add('disappear');
  stopButton.classList.remove('play');
  button.classList.remove('play', 'hide');
  button.disabled = false;
  buttonText.classList.remove('play');
  document.body.classList.remove('play');

  setTimeout(() => alreadyHidden = false, animationDuration * 2);
}