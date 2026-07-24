import { ShieldCheck, Wifi, Globe, Lock, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const vpnSessions = [
  { user: 'a.brown', location: 'Berlin', ip: '192.168.0.14', status: 'Connected' },
  { user: 'n.carter', location: 'New York', ip: '192.168.0.30', status: 'Connected' },
  { user: 'm.phillips', location: 'London', ip: '192.168.0.65', status: 'Reconnecting' },
];

const bandwidth = [
  { name: 'Mon', value: 32 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 38 },
  { name: 'Thu', value: 52 },
  { name: 'Fri', value: 47 },
  { name: 'Sat', value: 53 },
  { name: 'Sun', value: 41 },
];

const servers = [
  { name: 'EU Gateway', status: 'Optimal', color: 'green' },
  { name: 'US Gateway', status: 'Stable', color: 'blue' },
  { name: 'APAC Gateway', status: 'Warning', color: 'orange' },
];

export default function VpnPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Active users" subtitle="VPN connections">
          <div className="mt-4 text-4xl font-semibold text-white">2,062</div>
        </Card>
        <Card title="Server status" subtitle="Gateway health">
          <div className="mt-4 space-y-3">
            {servers.map((server) => (
              <div key={server.name} className="flex items-center justify-between rounded-[20px] border border-border bg-[#0f1728] px-4 py-3">
                <div>
                  <p className="text-sm text-slate-300">{server.name}</p>
                  <p className="text-xs text-slate-500">Latency within thresholds</p>
                </div>
                <Badge color={server.color}>{server.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Connection bandwidth" subtitle="Throughput over 7 days">
          {loading ? <Skeleton className="h-[140px]" /> : <div className="mt-4 text-sm text-slate-400">Bandwidth data available</div>}
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Connected sessions" subtitle="Live VPN users">
          {loading ? (
            <Skeleton className="h-[260px]" />
          ) : (
            <Table
              columns={[
                { key: 'user', label: 'User' },
                { key: 'location', label: 'Location' },
                { key: 'ip', label: 'IP address' },
                { key: 'status', label: 'Status', render: (row) => <Badge color={row.status === 'Connected' ? 'green' : 'orange'}>{row.status}</Badge> },
              ]}
              data={vpnSessions}
            />
          )}
        </Card>

        <Card title="Quick actions" subtitle="VPN controls">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-3xl bg-slate-900 p-3 text-slate-200">
                  <Wifi className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Session uptime</p>
                  <p className="mt-1 text-lg font-semibold text-white">98.7%</p>
                </div>
              </div>
            </div>
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-3xl bg-slate-900 p-3 text-slate-200">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Countries connected</p>
                  <p className="mt-1 text-lg font-semibold text-white">12</p>
                </div>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              <ArrowRight className="h-4 w-4" /> Establish connection
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
