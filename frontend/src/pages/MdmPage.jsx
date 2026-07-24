import { BatteryCharging, Lock, MapPin, Smartphone, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const devices = [
  { name: 'Ava-MBP', os: 'macOS 14', compliance: '96%', battery: '87%', location: 'Berlin', status: 'Managed' },
  { name: 'CORP-LAP-043', os: 'Windows 11', compliance: '92%', battery: '64%', location: 'New York', status: 'Managed' },
  { name: 'BD-POC-07', os: 'Android', compliance: '89%', battery: '78%', location: 'Tokyo', status: 'Pending' },
];

export default function MdmPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Managed devices" subtitle="Overview of managed endpoints">
          <p className="mt-4 text-4xl font-semibold text-white">1,248</p>
        </Card>
        <Card title="Compliance score" subtitle="Endpoint policy adherence">
          <p className="mt-4 text-4xl font-semibold text-white">94%</p>
        </Card>
        <Card title="Enrollment" subtitle="New device onboarding">
          <p className="mt-4 text-4xl font-semibold text-white">38 today</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Device inventory" subtitle="Current device posture">
          {loading ? (
            <Skeleton className="h-[320px]" />
          ) : (
            <Table
              columns={[
                { key: 'name', label: 'Device' },
                { key: 'os', label: 'OS' },
                { key: 'compliance', label: 'Compliance' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (row) => <Badge color={row.status === 'Managed' ? 'green' : 'yellow'}>{row.status}</Badge>,
                },
              ]}
              data={devices}
            />
          )}
        </Card>

        <Card title="Remote controls" subtitle="Device management actions">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-3xl bg-slate-900 p-3 text-slate-200">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Secure remote lock</p>
                  <p className="mt-1 text-lg font-semibold text-white">Safeguard endpoints immediately</p>
                </div>
              </div>
            </div>
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-3xl bg-slate-900 p-3 text-slate-200">
                  <BatteryCharging className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Battery & location</p>
                  <p className="mt-1 text-lg font-semibold text-white">Live device telemetry</p>
                </div>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              <ShieldCheck className="h-4 w-4" /> Enforce compliance
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
