let defaultMinutes = 25;
let totalSeconds = defaultMinutes * 60;
let timerInterval = null;
let sessionsCompleted = 0;

const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const setTimerBtn = document.getElementById("setTimerBtn");
const customMinutesInput = document.getElementById("customMinutes");
const sessionsCount = document.getElementById("sessionsCount");

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timeDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {
    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        totalSeconds--;

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            sessionsCompleted++;
            sessionsCount.textContent = sessionsCompleted;
            alert("Session Complete!");
            totalSeconds = defaultMinutes * 60;
        }

        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    totalSeconds = defaultMinutes * 60;
    updateDisplay();
}

function setCustomTimer() {
    const minutes = parseInt(customMinutesInput.value);

    if (isNaN(minutes) || minutes < 1 || minutes > 60) {
        alert("Please enter a number between 1 and 60");
        return;
    }

    defaultMinutes = minutes;
    totalSeconds = minutes * 60;
    updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
setTimerBtn.addEventListener("click", setCustomTimer);

updateDisplay();
