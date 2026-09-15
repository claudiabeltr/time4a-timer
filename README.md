# time4a-timer
A minimal desktop timer app with a pixel-art twist - built with Electron, it displays an animated pixel sprite that shifts every few seconds as the countdown runs.

## How to install
Get the latest version from the [Releases page](https://github.com/claudiabeltr/time4a-timer/releases)

! Windows SmartScreen may show a warning since this app isn't code-signed. Click "More info" → "Run anyway" to proceed.

## How to Use
- **Set the time:** click on the 00:00:00 display and type the hours, minutes, and seconds directly, or use the - / + buttons to adjust by 10 seconds at a time.
- **Play / Pause:** click the ▶ button to start the countdown. It turns into ⏸ while running — click it again to pause.
- **Stop:** click the ■ button to reset the timer back to 00:00:00.
Change skin: use the ◀ / ▶ arrows next to the sprite to cycle through the available timer designs.
- **New timer:** click the + in the top-right corner to open another independent timer window.
- **Close:** click the ✕ in the top-right corner to close that timer window.
- **Help:** click the ? to open this README in your browser.

Controls are hidden by default — move your mouse over the window to reveal them.

## Roadmap

### Phase 0:
- [x] Initial pixel-art timer design
- [x] Github repository created
- [x] Base Electron project structure

### Phase 1: Functional timer
- [x] Borderless, transparent timer window
- [x] Set countdown duration (minutes/seconds)
- [x] Start / pause / reset controls
- [x] Static pixel-art sprite as a first visual pass

### Phase 2: Animation
- [x] Sprite sheet with idle, counting, and alarm states
- [x] Frame change every x seconds, synced with the countdown
- [x] Visual alert when it hits zero

### Phase 3: Persistence
- [x] Restore timer on app launch

### Phase 4: User experience
- [x] Timer settings menu
- [x] Customize sprite/skin, color, size

### Phase 5: Distribution
- [x] App icon and branding
- [x] Package the app: electron-builder or electron-forge
- [x] Windows installer .exe