const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const si = require('systeminformation');

// Keep a global reference of the window object to avoid garbage collection
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // Load the Next.js app
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../out/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Open DevTools if in dev mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for system information
ipcMain.handle('get-cpu-info', async () => {
  return await si.cpu();
});

ipcMain.handle('get-cpu-load', async () => {
  return await si.currentLoad();
});

ipcMain.handle('get-memory-info', async () => {
  return await si.mem();
});

ipcMain.handle('get-disk-info', async () => {
  return await si.fsSize();
});

ipcMain.handle('get-network-info', async () => {
  return await si.networkInterfaces();
});

ipcMain.handle('get-network-stats', async () => {
  return await si.networkStats();
});

ipcMain.handle('get-os-info', async () => {
  return await si.osInfo();
});
