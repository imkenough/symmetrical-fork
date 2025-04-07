"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatBytes, formatPercentage } from '@/lib/formatters';

interface DiskCardProps {
  diskInfo: DiskInfo[] | null;
}

export function DiskCard({ diskInfo }: DiskCardProps) {
  if (!diskInfo || diskInfo.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Disk Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading disk information...</p>
        </CardContent>
      </Card>
    );
  }

  // Show only real disks, filter out temporary filesystems
  const realDisks = diskInfo.filter(
    (disk) =>
      !disk.mount.startsWith('/dev') &&
      !disk.mount.startsWith('/sys') &&
      !disk.mount.startsWith('/proc') &&
      !disk.mount.startsWith('/run') &&
      disk.size > 0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disk Storage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {realDisks.map((disk, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                {disk.mount} {disk.type && `(${disk.type})`}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatBytes(disk.used)} / {formatBytes(disk.size)} ({formatPercentage(disk.use)})
              </span>
            </div>
            <Progress value={disk.use} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
