"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCpuSpeed, formatPercentage } from '@/lib/formatters';

interface CpuCardProps {
  cpuInfo: CpuInfo | null;
  cpuLoad: CpuLoad | null;
}

export function CpuCard({ cpuInfo, cpuLoad }: CpuCardProps) {
  const [coreLoads, setCoreLoads] = useState<number[]>([]);

  useEffect(() => {
    if (cpuLoad?.cpus) {
      setCoreLoads(cpuLoad.cpus.map((core) => core.load));
    }
  }, [cpuLoad]);

  if (!cpuInfo || !cpuLoad) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>CPU</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading CPU information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Model</span>
            <span className="text-sm text-muted-foreground">{cpuInfo.brand}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Cores</span>
            <span className="text-sm text-muted-foreground">{cpuInfo.cores} cores ({cpuInfo.physicalCores} physical)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Speed</span>
            <span className="text-sm text-muted-foreground">{formatCpuSpeed(cpuInfo.speed)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total CPU Usage</span>
            <span className="text-sm text-muted-foreground">{formatPercentage(cpuLoad.currentLoad)}</span>
          </div>
          <Progress value={cpuLoad.currentLoad} className="h-2" />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">CPU Cores</h4>
          <div className="grid grid-cols-2 gap-2">
            {coreLoads.map((load, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs">Core {index}</span>
                  <span className="text-xs text-muted-foreground">{formatPercentage(load)}</span>
                </div>
                <Progress value={load} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
