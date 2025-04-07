"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CpuCard } from "@/components/CpuCard";
import { MemoryCard } from "@/components/MemoryCard";
import { DiskCard } from "@/components/DiskCard";
import { NetworkCard } from "@/components/NetworkCard";
import { OsInfoCard } from "@/components/OsInfoCard";
import { useSystemInfo } from "@/hooks/useSystemInfo";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const { systemInfo, isElectron } = useSystemInfo(1000); // Update every second

  if (!isElectron) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">PC Stats Monitor</h1>
        <p className="text-center mb-6">
          This application must be run in Electron to access system information.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="px-4 py-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">PC Stats Monitor</h1>
        <p className="text-muted-foreground">Real-time system resource monitoring</p>
      </header>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="disk">Storage</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CpuCard cpuInfo={systemInfo.cpu.info} cpuLoad={systemInfo.cpu.load} />
            <MemoryCard memoryInfo={systemInfo.memory} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DiskCard diskInfo={systemInfo.disk} />
            <NetworkCard
              networkInterfaces={systemInfo.network.interfaces}
              networkStats={systemInfo.network.stats}
            />
          </div>
          <OsInfoCard osInfo={systemInfo.os} />
        </TabsContent>

        <TabsContent value="cpu">
          <CpuCard cpuInfo={systemInfo.cpu.info} cpuLoad={systemInfo.cpu.load} />
        </TabsContent>

        <TabsContent value="memory">
          <MemoryCard memoryInfo={systemInfo.memory} />
        </TabsContent>

        <TabsContent value="disk">
          <DiskCard diskInfo={systemInfo.disk} />
        </TabsContent>

        <TabsContent value="network">
          <NetworkCard
            networkInterfaces={systemInfo.network.interfaces}
            networkStats={systemInfo.network.stats}
          />
        </TabsContent>
      </Tabs>

      <footer className="text-center text-sm text-muted-foreground">
        <p>PC Stats Monitor &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
