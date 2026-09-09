// ---- CONFIG ----
const STEP_SECONDS = 10; // amount +/-
const MAX_SECONDS = 99*3600; // cap: 99 hours
const MIN_SECONDS = 0;
const BASE_WIDTH = 220;

// ---- DOM REFERENCES ----
const appEl = document.getElementById('app');
const sprite = document.getElementById('sprite');
const display = document.getElementById('display');
const playPauseBtn = document.getElementById('play-pause');
const stopBtn = document.getElementById('stop')
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');

// ---- STATE ----
let remainingSeconds = 0;
let state = 'idle';
let intervalId = null;

// ---- HELPERS ----
function formatTime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function render() {
    display.textContent = formatTime(remainingSeconds);
    if (state === 'paused') {
        sprite.className = 'idle';
    } else {
        sprite.className = state;
    }
    if (state === 'running') {
        playPauseBtn.textContent = '⏸';
    } else {
        playPauseBtn.textContent = '▶';
    }
}

// ---- SCALING ----
function updateScale() {
    const scale = window.innerWidth / BASE_WIDTH;
    appEl.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', updateScale);

// ---- TICK ----
function tick() {
    remainingSeconds--;

    if (remainingSeconds <= MIN_SECONDS) {
        remainingSeconds = 0;
        clearInterval(intervalId);
        intervalId = null;
        state = 'alarm';
        render();
        return;
    }

    render();
}

// ---- HANDLERS ----
playPauseBtn.addEventListener('click', () => {
    if (state === 'running') {
        clearInterval(intervalId);
        intervalId = null;
        state = 'paused';
        render();
        return;
    }

    if (remainingSeconds <= 0) return;

    state = 'running';
    render();
    intervalId = setInterval(tick, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    remainingSeconds = 0;
    state = 'idle';
    render();
});

minusBtn.addEventListener('click', () => {
    remainingSeconds = Math.max(MIN_SECONDS, remainingSeconds - STEP_SECONDS);
    render();
});

plusBtn.addEventListener('click', () => {
    remainingSeconds = Math.min(MAX_SECONDS, remainingSeconds + STEP_SECONDS);
    render();
});

// ---- INIT ----
render();
updateScale();