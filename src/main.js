import Noise from './pink-noise.js';

const button = document.querySelector('button');
const timer = document.querySelector('p');
const noise = new Noise();
// default to 45 minutes
const minutes = 45;
const total = 60 * 1000 * minutes;

button.addEventListener('click', event => {
  if (noise.playing) {
    stopNoise();
  }
  else {
    button.classList.add('play');
    button.disabled = true;
    startNoise();
    // when the animation is finished then remove the button from the DOM
    button.addEventListener('animationend', e => {
      document.querySelector('body').classList.add('play');
      setTimeout(() => button.parentElement.removeChild(button), 600);
    })
  }
});

function updateTimePlayed() {
  const duration = new Date(total - noise.duration());
  const minutes = duration.getMinutes();
  const seconds = duration.getSeconds();
  timer.textContent = `White noise will stop in ${minutes}:${seconds}`;

  if (duration.getTime() <= 0) {
    stopNoise();
  }
}

function stopNoise() {
  console.log('stopping');
  noise.stop();
  button.textContent = '🌙';
  window.clearInterval(updateTimePlayed);
  timer.classList.add('hide');
}

function startNoise() {
  console.log('starting...');
  noise.start();
  button.textContent = '😣';
  window.setInterval(updateTimePlayed, 1000);
  timer.classList.remove('hide');
}