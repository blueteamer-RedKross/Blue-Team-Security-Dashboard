import { Download, FileSearch, Layers, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const snapshots = [
  { name: 'Baseline 2026-07-20', created: '08:13 UTC', changes: '17 changes' },
  { name: 'Post-patch 2026-07-20', created: '11:27 UTC', changes: '9 changes' },
];

const changes = [
  { path: 'HKLM\Software\Policies', change: 'Added' },
  { path: 'HKCU\Software\Company', change: 'Modified' },
  { path: 'HKLM\SYSTEM\CurrentControlSet', change: 'Deleted' },
];

export default function RegshotPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Registry snapshots" subtitle="Saved system baselines">
          <p className="mt-4 text-4xl font-semibold text-white">2</p>
        </Card>
        <Card title="Comparison results" subtitle="Registry deltas">
          <p className="mt-4 text-4xl font-semibold text-white">3</p>
        </Card>
        <Card title="Export options" subtitle="Share reports securely">
          <div className="mt-4 flex flex-col gap-3">
            <Button variant="secondary" className="w-full">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
            <Button variant="secondary" className="w-full">
              <FileSearch className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Snapshot history" subtitle="Created registry snapshots">
          {loading ? (
            <Skeleton className="h-[320px]" />
          ) : (
            <Table
              columns={[
                { key: 'name', label: 'Snapshot' },
                { key: 'created', label: 'Created' },
                { key: 'changes', label: 'Changes' },
              ]}
              data={snapshots}
            />
          )}
        </Card>

        <Card title="Change details" subtitle="Registry differences">
          <div className="space-y-4">
            {loading ? (
              <Skeleton className="h-[180px]" />
            ) : (
              changes.map((item, index) => (
                <div key={index} className="rounded-[20px] border border-border bg-[#0f1728] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.path}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.change}</p>
                    </div>
                    <Badge color={item.change === 'Deleted' ? 'red' : item.change === 'Modified' ? 'orange' : 'green'}>{item.change}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
