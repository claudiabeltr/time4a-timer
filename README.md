# time4a-timer
A minimal desktop timer app with a pixel-art twist - built with Electron, it displays an animated pixel sprite that shifts every few seconds as the countdown runs.

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
- [ ] Sound/visual alert when it hits zero

### Phase 3: Persistence
- [ ] Save timer state (duration, running/paused) on app close
- [ ] Restore timer on app launch

### Phase 4: User experience
- [x] Timer settings menu
- [x] Customize sprite/skin, color, size

### Phase 5: Distribution
- [ ] App icon and branding
- [ ] Package the app: electron-builder or electron-forge
- [ ] Windows installer .exe