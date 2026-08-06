import { ShieldCheck, ShieldAlert, Archive, Play, ShieldOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const scanModes = [
  { label: 'Quick Scan', icon: Play, status: 'Ready', accent: 'blue' },
  { label: 'Full Scan', icon: ShieldCheck, status: 'Standing by', accent: 'violet' },
  { label: 'Custom Scan', icon: Archive, status: 'Configured', accent: 'orange' },
  { label: 'Real-time Protection', icon: ShieldAlert, status: 'Active', accent: 'green' },
  { label: 'Quarantine', icon: ShieldOff, status: '2 items', accent: 'yellow' },
];

const history = [
  { time: '08:13', task: 'Quick scan', status: 'Completed' },
  { time: '09:04', task: 'Real-time check', status: 'Running' },
  { time: '10:30', task: 'Threat analysis', status: 'Completed' },
  { time: '11:40', task: 'Quarantine review', status: 'Pending' },
];

const threats = [
  { id: 1, title: 'Phishing payload detected', endpoint: 'CORP-LAP-043', severity: 'High' },
  { id: 2, title: 'Trojan quarantined', endpoint: 'SVR-WEB-02', severity: 'Critical' },
  { id: 3, title: 'Potential PUA blocked', endpoint: 'PT-BYOD-11', severity: 'Medium' },
];

export default function AntivirusPage() {
  const [scanStatus, setScanStatus] = useState("Idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleQuickScan = async () => {
    console.log("Quick Scan Started");
  };

  const handleFullScan = async () => {
    console.log("Full Scan Started");
  };

  const handleCustomScan = async () => {
    console.log("Custom Scan Started");
  };

  const handleStopScan = () => {
    console.log("Scan Stopped");
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        {scanModes.map((mode) => (
          <Card
            key={mode.label}
            title={mode.label}
            subtitle={mode.status}
            className="group transition hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-3xl bg-slate-900 p-4 text-slate-200 shadow-[0_18px_50px_rgba(15,23,42,0.35)]">
                <mode.icon className="h-6 w-6" />
              </div>
              <Badge color={mode.accent}>{mode.status}</Badge>
            </div>
            <button
              onClick={
              mode.label === "Quick Scan"                                                                                      
              ? handleQuickScan
              : mode.label === "Full Scan"
              ? handleFullScan
              : mode.label === "Custom Scan"
              ? handleCustomScan
              : handleStopScan
             }
              className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-[#0f1728] px-4 py-3 text-sm font-semibold text-white transition hover:bg-hover"
            >
              {mode.label === "Real-time Protection"
              ? "Toggle"
              : mode.label === "Quarantine"
              ? "Open"
              : "Start Scan"}
            </button>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Scan history" subtitle="Recent antivirus operations">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          ) : (
            <Table
              columns={[
                { key: 'time', label: 'Time' },
                { key: 'task', label: 'Task' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (row) => (
                    <Badge color={row.status === 'Completed' ? 'green' : row.status === 'Running' ? 'blue' : 'yellow'}>{row.status}</Badge>
                  ),
                },
              ]}
              data={history}
            />
          )}
        </Card>

        <Card title="Detected threats" subtitle="Latest quarantined items">
          <div className="space-y-4">
            {threats.map((item) => (
              <div key={item.id} className="rounded-[20px] border border-border bg-[#0f1728] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.endpoint}</p>
                  </div>
                  <Badge color={item.severity === 'Critical' ? 'red' : item.severity === 'High' ? 'orange' : 'yellow'}>{item.severity}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
