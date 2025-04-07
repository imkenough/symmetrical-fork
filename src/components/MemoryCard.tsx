import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatBytes, formatPercentage } from '@/lib/formatters';

interface MemoryCardProps {
  memoryInfo: MemoryInfo | null;
}

export function MemoryCard({ memoryInfo }: MemoryCardProps) {
  if (!memoryInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Memory</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading memory information...</p>
        </CardContent>
      </Card>
    );
  }

  const memoryUsagePercentage = (memoryInfo.used / memoryInfo.total) * 100;
  const swapUsagePercentage = memoryInfo.swaptotal ? (memoryInfo.swapused / memoryInfo.swaptotal) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Memory</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">RAM Usage</span>
            <span className="text-sm text-muted-foreground">
              {formatBytes(memoryInfo.used)} / {formatBytes(memoryInfo.total)} ({formatPercentage(memoryUsagePercentage)})
            </span>
          </div>
          <Progress value={memoryUsagePercentage} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Free</span>
            <span className="text-sm text-muted-foreground">{formatBytes(memoryInfo.free)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Available</span>
            <span className="text-sm text-muted-foreground">{formatBytes(memoryInfo.available)}</span>
          </div>
        </div>

        {memoryInfo.swaptotal > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Swap Usage</span>
              <span className="text-sm text-muted-foreground">
                {formatBytes(memoryInfo.swapused)} / {formatBytes(memoryInfo.swaptotal)} ({formatPercentage(swapUsagePercentage)})
              </span>
            </div>
            <Progress value={swapUsagePercentage} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
