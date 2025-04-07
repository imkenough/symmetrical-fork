"use client";

import { useState, useEffect } from 'react';
import { useInterval } from 'react-use';

export interface SystemInfo {
  cpu: {
    info: CpuInfo | null;
    load: CpuLoad | null;
  };
  memory: MemoryInfo | null;
  disk: DiskInfo[] | null;
  network: {
    interfaces: NetworkInfo[] | null;
    stats: NetworkStats[] | null;
  };
  os: OsInfo | null;
}

const initialSystemInfo: SystemInfo = {
  cpu: {
    info: null,
    load: null,
  },
  memory: null,
  disk: null,
  network: {
    interfaces: null,
    stats: null,
  },
  os: null,
};

export const useSystemInfo = (pollingInterval = 1000) => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>(initialSystemInfo);
  const [isElectron, setIsElectron] = useState(false);

  // Check if we're running in Electron
  useEffect(() => {
    setIsElectron(window.electronAPI !== undefined);
  }, []);

  // Function to fetch all system information
  const fetchSystemInfo = async () => {
    if (!isElectron) return;

    try {
      const [cpuInfo, cpuLoad, memoryInfo, diskInfo, networkInfo, networkStats, osInfo] = await Promise.all([
        window.electronAPI.getCpuInfo(),
        window.electronAPI.getCpuLoad(),
        window.electronAPI.getMemoryInfo(),
        window.electronAPI.getDiskInfo(),
        window.electronAPI.getNetworkInfo(),
        window.electronAPI.getNetworkStats(),
        window.electronAPI.getOsInfo(),
      ]);

      setSystemInfo({
        cpu: {
          info: cpuInfo,
          load: cpuLoad,
        },
        memory: memoryInfo,
        disk: diskInfo,
        network: {
          interfaces: networkInfo,
          stats: networkStats,
        },
        os: osInfo,
      });
    } catch (error) {
      console.error('Error fetching system info:', error);
    }
  };

  // Fetch initial system info
  useEffect(() => {
    if (isElectron) {
      fetchSystemInfo();
    }
  }, [isElectron]);

  // Set up polling interval for real-time updates
  useInterval(fetchSystemInfo, isElectron ? pollingInterval : null);

  return { systemInfo, isElectron };
};
