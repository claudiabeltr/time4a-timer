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
const exitBtn = document.getElementById('exit');
const newTimerBtn = document.getElementById('new-timer');

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

function parseTime(text) {
    const parts = text.split(':');
    if (parts.length !== 3) {
        return 0;
    }
    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10);
    let seconds = parseInt(parts[2], 10);

    if (isNaN(hours)) {
        hours = 0;
    }
    if (isNaN(minutes)) {
        minutes = 0;
    }
    if (isNaN(seconds)) {
        seconds = 0;
    }

    let total = (hours * 3600) + (minutes * 60) + seconds;

    if (total < MIN_SECONDS) {
        total = MIN_SECONDS;
    }
    if (total > MAX_SECONDS) {
        total = MAX_SECONDS;
    }

    return total;
}

function render() {
    display.value = formatTime(remainingSeconds);
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
display.addEventListener('change', () => {
    if (state === 'running')
        return; // do not edit while 'running' state
    remainingSeconds = parseTime(display.value);
    render();
});

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

exitBtn.addEventListener('click', () => {
    window.close();
})

newTimerBtn.addEventListener('click', () => {
    window.electronAPI.newTimer();
});

// ---- SKINS ----
const skins = ['default-timer', 'banana-breakfast', 'blueberry-breakfast', 'strawberry-breakfast', 'burning-candle', 'growing-plant', 'calendar'];
let currentSkinIndex = 0;

const prevSkinBtn = document.getElementById('prev-skin');
const nextSkinBtn = document.getElementById('next-skin');

function applySkin() {
    const skinName = skins[currentSkinIndex];
    sprite.style.setProperty('--skin-image', `url('assets/${skinName}.png')`);
}

prevSkinBtn.addEventListener('click', () => {
    currentSkinIndex = currentSkinIndex - 1;
    if (currentSkinIndex < 0) {
        currentSkinIndex = skins.length - 1;
    }
    applySkin();
});

nextSkinBtn.addEventListener('click', () => {
    currentSkinIndex = currentSkinIndex + 1;
    if (currentSkinIndex >= skins.length) {
        currentSkinIndex = 0; // vuelve al primero
    }
    applySkin();
});

// ---- INIT ----
render();
updateScale();
applySkin();