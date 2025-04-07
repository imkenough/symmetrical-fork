"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { formatUptime } from '@/lib/formatters';

interface OsInfoCardProps {
  osInfo: OsInfo | null;
}

export function OsInfoCard({ osInfo }: OsInfoCardProps) {
  const [uptime, setUptime] = useState<number>(0);

  useEffect(() => {
    // Update uptime every second
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        // Get uptime from performance.now() in milliseconds and convert to seconds
        setUptime(Math.floor(performance.now() / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!osInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading system information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Platform</div>
            <div className="text-sm">{osInfo.platform}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Distribution</div>
            <div className="text-sm">{osInfo.distro}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Release</div>
            <div className="text-sm">{osInfo.release}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Architecture</div>
            <div className="text-sm">{osInfo.arch}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Kernel</div>
            <div className="text-sm">{osInfo.kernel}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Hostname</div>
            <div className="text-sm">{osInfo.hostname}</div>
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground">Application Uptime</div>
          <div className="text-sm">{formatUptime(uptime)}</div>
        </div>
      </CardContent>
    </Card>
  );
}
