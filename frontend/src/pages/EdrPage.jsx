import { Activity, AlertTriangle, ShieldCheck, ShieldOff, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const liveDetections = [
  { title: 'Endpoint anomaly', value: '6 events', status: 'Monitoring', icon: Activity },
  { title: 'File integrity', value: '4 alerts', status: 'Under review', icon: AlertTriangle },
  { title: 'Process quarantine', value: '2 isolated', status: 'Secured', icon: ShieldCheck },
];

const endpoints = [
  { hostname: 'CORP-LAP-043', os: 'Windows 11', risk: 'Medium', status: 'Active' },
  { hostname: 'SVR-WEB-02', os: 'Ubuntu 22.04', risk: 'High', status: 'Isolated' },
  { hostname: 'VPN-GTW-01', os: 'Debian', risk: 'Low', status: 'Active' },
];

const timeline = [
  { time: '08:05', event: 'Suspicious script execution', severity: 'High' },
  { time: '09:20', event: 'Credential dumping attempt blocked', severity: 'Critical' },
  { time: '10:10', event: 'Endpoint restored', severity: 'Low' },
];

export default function EdrPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        {liveDetections.map((item) => (
          <Card key={item.title} title={item.title} subtitle={item.status} className="transition hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="rounded-3xl bg-slate-900 p-4 text-slate-200">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">{item.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card title="Endpoint list" subtitle="Active devices under observation">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          ) : (
            <Table
              columns={[
                { key: 'hostname', label: 'Hostname' },
                { key: 'os', label: 'OS' },
                { key: 'risk', label: 'Risk' },
                { key: 'status', label: 'Status', render: (row) => <Badge color={row.status === 'Active' ? 'green' : 'red'}>{row.status}</Badge> },
              ]}
              data={endpoints}
            />
          )}
        </Card>

        <Card title="Threat timeline" subtitle="Latest incident events">
          <div className="space-y-4">
            {timeline.map((event, index) => (
              <div key={index} className="rounded-[20px] border border-border bg-[#0f1728] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{event.event}</p>
                    <p className="mt-1 text-sm text-slate-400">{event.time}</p>
                  </div>
                  <Badge color={event.severity === 'Critical' ? 'red' : event.severity === 'High' ? 'orange' : 'yellow'}>{event.severity}</Badge>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-[#111c2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-hover">
            <ShieldOff className="h-4 w-4" /> Isolate device
          </button>
        </Card>
      </div>
    </div>
  );
}
