import { Activity, BarChart3, Eye, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import TrendChart from '../components/charts/TrendChart';
import Skeleton from '../components/ui/Skeleton';

const riskCards = [
  { title: 'Insider risk', value: '72', label: 'Moderate', accent: 'orange' },
  { title: 'Behavior anomalies', value: '18', label: 'High', accent: 'red' },
  { title: 'Login risk', value: '34', label: 'Normal', accent: 'blue' },
];

const anomalies = [
  { user: 'm.salazar', reason: 'Unusual download pattern', severity: 'High' },
  { user: 's.baker', reason: 'Multiple failed logins', severity: 'Medium' },
  { user: 't.jones', reason: 'Privileged access spike', severity: 'Critical' },
];

const timeline = [
  { time: '08:15', event: 'Remote access spike', status: 'Reviewed' },
  { time: '09:38', event: 'New device enrolled', status: 'Verified' },
  { time: '10:52', event: 'Suspicious behavior flagged', status: 'Investigating' },
];

const lineData = [
  { name: 'Mon', value: 53 },
  { name: 'Tue', value: 66 },
  { name: 'Wed', value: 72 },
  { name: 'Thu', value: 64 },
  { name: 'Fri', value: 81 },
  { name: 'Sat', value: 77 },
  { name: 'Sun', value: 69 },
];

export default function UebaPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        {riskCards.map((metric) => (
          <Card key={metric.title} title={metric.title} subtitle={metric.label} className="transition hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
              </div>
              <Badge color={metric.accent}>{metric.label}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card title="Behavior chart" subtitle="Anomaly score trend">
          {loading ? <Skeleton className="h-[320px]" /> : <TrendChart data={lineData} color="#8b5cf6" />}
        </Card>
        <Card title="Risk indicators" subtitle="Active threat signals">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Credential misuse</p>
                  <p className="mt-1 text-sm text-slate-400">Detected on HR systems</p>
                </div>
                <Badge color="red">Critical</Badge>
              </div>
            </div>
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Suspicious lateral move</p>
                  <p className="mt-1 text-sm text-slate-400">Correlated with abnormal access</p>
                </div>
                <Badge color="orange">High</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Anomaly detection" subtitle="User behavior analysis">
          <Table
            columns={[
              { key: 'user', label: 'User' },
              { key: 'reason', label: 'Reason' },
              { key: 'severity', label: 'Severity', render: (row) => <Badge color={row.severity === 'Critical' ? 'red' : row.severity === 'High' ? 'orange' : 'yellow'}>{row.severity}</Badge> },
            ]}
            data={anomalies}
          />
        </Card>
        <Card title="Login timeline" subtitle="Recent authentication events">
          <div className="space-y-4">
            {timeline.map((entry, index) => (
              <div key={index} className="rounded-[20px] border border-border bg-[#0f1728] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{entry.event}</p>
                    <p className="mt-1 text-sm text-slate-400">{entry.time}</p>
                  </div>
                  <Badge color={entry.status === 'Investigating' ? 'orange' : 'green'}>{entry.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
