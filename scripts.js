let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");

startStopBtn.addEventListener("click", startStop);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(getShowTime, 10);
    running = true;
    startStopBtn.textContent = "Stop";
  } else {
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = "Start";
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000) / 100);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function lap() {
  if (running) {
    const lapTime = document.createElement("li");
    lapTime.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
    laps.appendChild(lapTime);
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00.0";
  startStopBtn.textContent = "Start";
  lapCounter = 1;
  laps.innerHTML = "";
}
