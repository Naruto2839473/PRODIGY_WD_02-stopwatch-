const display = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let interval = null;
let lapCounter = 1;

function format(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = format(elapsedTime);
}

startBtn.onclick = () => {
  startTime = Date.now() - elapsedTime;
  interval = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
};

pauseBtn.onclick = () => {
  clearInterval(interval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
};

resetBtn.onclick = () => {
  clearInterval(interval);
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  lapList.innerHTML = "";
  lapCounter = 1;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
};

lapBtn.onclick = () => {
  const lapTime = format(elapsedTime);
  const listItem = document.createElement("li");
  listItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
  lapList.appendChild(listItem);
};
