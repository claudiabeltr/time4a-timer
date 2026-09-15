const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    newTimer: () => ipcRenderer.send('create-timer'),
    openHelp: () => ipcRenderer.send('open-help')
});