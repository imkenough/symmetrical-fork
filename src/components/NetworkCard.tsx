"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatBytes, formatNetworkSpeed } from '@/lib/formatters';
import { useEffect, useState } from 'react';

interface NetworkCardProps {
  networkInterfaces: NetworkInfo[] | null;
  networkStats: NetworkStats[] | null;
}

export function NetworkCard({ networkInterfaces, networkStats }: NetworkCardProps) {
  const [previousStats, setPreviousStats] = useState<Record<string, NetworkStats>>({});
  const [speeds, setSpeeds] = useState<Record<string, { download: number; upload: number }>>({});

  // Calculate network speeds based on difference between current and previous stats
  useEffect(() => {
    if (!networkStats) return;

    const timestamp = Date.now();
    const newSpeeds: Record<string, { download: number; upload: number }> = {};

    networkStats.forEach((stat) => {
      const prev = previousStats[stat.iface];
      if (prev) {
        const timeDiff = (timestamp - (prev.timestamp || 0)) / 1000; // in seconds
        if (timeDiff > 0) {
          const downloadSpeed = (stat.rx_bytes - prev.rx_bytes) / timeDiff;
          const uploadSpeed = (stat.tx_bytes - prev.tx_bytes) / timeDiff;
          newSpeeds[stat.iface] = {
            download: downloadSpeed,
            upload: uploadSpeed
          };
        }
      }

      // Add timestamp to the stat for next calculation
      previousStats[stat.iface] = { ...stat, timestamp };
    });

    setPreviousStats((prev) => ({ ...prev }));
    setSpeeds(newSpeeds);
  }, [networkStats]);

  if (!networkInterfaces || !networkStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Network</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading network information...</p>
        </CardContent>
      </Card>
    );
  }

  // Filter out loopback and non-operational interfaces
  const activeInterfaces = networkInterfaces.filter(
    (iface) => !iface.internal && (iface.ip4 || iface.ip6)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeInterfaces.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active network interfaces detected</p>
        ) : (
          activeInterfaces.map((iface) => {
            const stats = networkStats.find((s) => s.iface === iface.iface);
            const speed = speeds[iface.iface];

            return (
              <div key={iface.iface} className="space-y-2 pb-3 border-b last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{iface.iface} ({iface.type})</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">IP Address</div>
                    <div className="text-sm">{iface.ip4 || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">MAC Address</div>
                    <div className="text-sm">{iface.mac || 'N/A'}</div>
                  </div>
                </div>

                {stats && speed && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Download</div>
                      <div className="text-sm">
                        <span className="font-medium">{formatNetworkSpeed(speed.download)}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          Total: {formatBytes(stats.rx_bytes)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Upload</div>
                      <div className="text-sm">
                        <span className="font-medium">{formatNetworkSpeed(speed.upload)}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          Total: {formatBytes(stats.tx_bytes)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
