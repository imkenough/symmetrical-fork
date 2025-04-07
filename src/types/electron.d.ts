interface ElectronAPI {
  // CPU information
  getCpuInfo: () => Promise<CpuInfo>;
  getCpuLoad: () => Promise<CpuLoad>;

  // Memory information
  getMemoryInfo: () => Promise<MemoryInfo>;

  // Disk information
  getDiskInfo: () => Promise<DiskInfo[]>;

  // Network information
  getNetworkInfo: () => Promise<NetworkInfo[]>;
  getNetworkStats: () => Promise<NetworkStats[]>;

  // OS information
  getOsInfo: () => Promise<OsInfo>;
}

interface CpuInfo {
  manufacturer: string;
  brand: string;
  speed: number;
  cores: number;
  physicalCores: number;
  processors: number;
}

interface CpuLoad {
  currentLoad: number;
  currentLoadUser: number;
  currentLoadSystem: number;
  cpus: Array<{
    load: number;
    loadUser: number;
    loadSystem: number;
  }>;
}

interface MemoryInfo {
  total: number;
  free: number;
  used: number;
  active: number;
  available: number;
  swaptotal: number;
  swapused: number;
  swapfree: number;
}

interface DiskInfo {
  fs: string;
  type: string;
  size: number;
  used: number;
  available: number;
  use: number;
  mount: string;
}

interface NetworkInfo {
  iface: string;
  ifaceName: string;
  ip4: string;
  ip6: string;
  mac: string;
  internal: boolean;
  type: string;
}

interface NetworkStats {
  iface: string;
  rx_bytes: number;
  rx_dropped: number;
  rx_errors: number;
  tx_bytes: number;
  tx_dropped: number;
  tx_errors: number;
}

interface OsInfo {
  platform: string;
  distro: string;
  release: string;
  codename: string;
  kernel: string;
  arch: string;
  hostname: string;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
