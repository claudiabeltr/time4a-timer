const { app, BrowserWindow } = require('electron')

let win; // !save window ref.

function createWindow() {
    win = new BrowserWindow({
        width: 220,
        height: 260,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        minWidth: 150,
        minHeight: 180,
        maxWidth: 400,
        maxHeight: 460,
    });

    win.loadFile('index.html'); // load html file
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

win.loadFile('index.html');