const { contextBridge, ipcRenderer } = require('electron');

// Expose system information APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // CPU information
  getCpuInfo: () => ipcRenderer.invoke('get-cpu-info'),
  getCpuLoad: () => ipcRenderer.invoke('get-cpu-load'),

  // Memory information
  getMemoryInfo: () => ipcRenderer.invoke('get-memory-info'),

  // Disk information
  getDiskInfo: () => ipcRenderer.invoke('get-disk-info'),

  // Network information
  getNetworkInfo: () => ipcRenderer.invoke('get-network-info'),
  getNetworkStats: () => ipcRenderer.invoke('get-network-stats'),

  // OS information
  getOsInfo: () => ipcRenderer.invoke('get-os-info'),
});
