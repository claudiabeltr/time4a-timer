const { app, BrowserWindow, ipcMain, shell } = require('electron')

let windows = []; // !save window ref. (NOW array for multiple windows)

function createWindow() {
    const win = new BrowserWindow({
        width: 220,
        height: 260,
        minWidth: 150,
        minHeight: 180,
        maxWidth: 400,
        maxHeight: 460,
        frame: false,
        transparent: true,
        //alwaysOnTop: true,
        resizable: true,
        webPreferences: {
            preload: `${__dirname}/preload.js`
        }
    });

    win.on('blur', () => win.setAlwaysOnTop(false)); // sticky widget
    win.on('focus', () => win.setAlwaysOnTop(true));

    win.setAspectRatio(220 / 260);

    win.loadFile('index.html'); // load html file
    //win.webContents.openDevTools({ mode: 'detached' });

    windows.push(win);

    win.on('closed', () => {
        windows = windows.filter(w => w !== win);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (windows.length === 0) createWindow();
});

ipcMain.on('create-timer', () => {
    createWindow();
});

ipcMain.on('open-help', () => {
    shell.openExternal('https://github.com/claudiabeltr/time4a-timer/blob/main/README.md');
});