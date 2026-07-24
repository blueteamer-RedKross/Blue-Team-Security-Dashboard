import { ArrowUpRight, ShieldCheck, Zap, Wifi, Shield, Lock, Search, Bug } from 'lucide-react';
import StatCard from '../components/cards/StatCard';
import TrendChart from '../components/charts/TrendChart';
import DoughnutChart from '../components/charts/DoughnutChart';
import ModuleCard from '../components/modules/ModuleCard';

const stats = [
  {
    label: 'Total Devices',
    value: '7,483',
    trend: 'Stable growth',
    icon: <ShieldCheck className="h-5 w-5" />,
    color: 'sky',
  },
  {
    label: 'Threats Detected',
    value: '1,248',
    trend: '+18% from last week',
    icon: <Zap className="h-5 w-5" />,
    color: 'orange',
  },
  {
    label: 'VPN Users Online',
    value: '2,062',
    trend: '+5.5% uptime',
    icon: <Wifi className="h-5 w-5" />,
    color: 'violet',
  },
  {
    label: 'Compliance Score',
    value: '94%',
    trend: 'Above company target',
    icon: <Shield className="h-5 w-5" />,
    color: 'emerald',
  },
  {
    label: 'Security Score',
    value: '88',
    trend: 'Medium risk posture',
    icon: <Lock className="h-5 w-5" />,
    color: 'cyan',
  },
];

const lineData = [
  { name: 'Mon', value: 75 },
  { name: 'Tue', value: 92 },
  { name: 'Wed', value: 85 },
  { name: 'Thu', value: 103 },
  { name: 'Fri', value: 97 },
  { name: 'Sat', value: 115 },
  { name: 'Sun', value: 108 },
];

const doughnutData = [
  { name: 'Malware', value: 34 },
  { name: 'Phishing', value: 23 },
  { name: 'Ransomware', value: 19 },
  { name: 'Other', value: 24 },
];

const osData = [
  { name: 'Windows', value: 58 },
  { name: 'macOS', value: 22 },
  { name: 'Linux', value: 14 },
  { name: 'IoT', value: 6 },
];

const alerts = [
  { title: 'Zero-day malware blocked', type: 'Malware', severity: 'Critical', tone: 'text-rose-400' },
  { title: 'Suspicious login detected', type: 'VPN Login', severity: 'High', tone: 'text-orange-300' },
  { title: 'Unusual process behavior', type: 'Behavioral', severity: 'Medium', tone: 'text-amber-300' },
  { title: 'Security policy deviation', type: 'Compliance', severity: 'Low', tone: 'text-emerald-300' },
];

const modules = [
  { title: 'Antivirus', description: 'Run quick scans, review quarantine logs, and validate threat signatures.', icon: <ShieldCheck className="h-6 w-6" />, accent: 'from-sky-500 to-cyan-500' },
  { title: 'EDR', description: 'Monitor endpoint activity and respond to suspicious behavior in real time.', icon: <Zap className="h-6 w-6" />, accent: 'from-orange-500 to-amber-400' },
  { title: 'UEBA', description: 'Identify anomalous patterns and insider risk across user accounts.', icon: <Search className="h-6 w-6" />, accent: 'from-violet-500 to-fuchsia-500' },
  { title: 'VPN', description: 'Validate secure remote access with live session and performance metrics.', icon: <Wifi className="h-6 w-6" />, accent: 'from-sky-500 to-blue-500' },
  { title: 'MDM', description: 'Enforce device compliance, lock inventory, and execute remote actions.', icon: <Lock className="h-6 w-6" />, accent: 'from-emerald-500 to-teal-500' },
  { title: 'RegShot', description: 'Capture system baseline changes and investigate configuration drift.', icon: <Bug className="h-6 w-6" />, accent: 'from-violet-500 to-indigo-500' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-5">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} trend={item.trend} color={item.color} icon={item.icon} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[18px] border border-border bg-panel p-6 shadow-premium">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Threats Over Time</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Detected by active sensors</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl border border-border bg-[#111c2e] px-4 py-3 text-sm text-slate-300">
              <ArrowUpRight className="h-4 w-4 text-sky-400" />
              <span>+14.7%</span>
            </div>
          </div>
          <div className="mt-8 h-[320px]">
            <TrendChart data={lineData} color="#3a82ff" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[18px] border border-border bg-panel p-6 shadow-premium">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Recent Alerts</p>
                <h2 className="mt-3 text-xl font-semibold text-white">Priority incident feed</h2>
              </div>
              <span className="rounded-3xl bg-[#111c2e] px-4 py-3 text-sm text-slate-400">4 New</span>
            </div>
            <div className="mt-6 space-y-4">
              {alerts.map((alert) => (
                <div key={alert.title} className="rounded-[20px] border border-[#22304a] bg-[#0c1624] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{alert.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{alert.type}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${alert.tone} bg-white/5`}>{alert.severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[18px] border border-border bg-panel p-6 shadow-premium">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Threat Summary</p>
                <h2 className="mt-3 text-xl font-semibold text-white">Top attack categories</h2>
              </div>
              <div className="text-sm text-slate-400">Today</div>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="rounded-[20px] bg-[#0f1729] p-4">
                <p className="text-sm text-slate-400">Malware</p>
                <p className="mt-2 text-2xl font-semibold text-white">34%</p>
              </div>
              <div className="rounded-[20px] bg-[#0f1729] p-4">
                <p className="text-sm text-slate-400">Suspicious Activity</p>
                <p className="mt-2 text-2xl font-semibold text-white">23%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[18px] border border-border bg-panel p-6 shadow-premium">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Top Threats</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Most active vectors</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-3xl bg-[#111c2e] px-3 py-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              Live
            </span>
          </div>
          <div className="mt-8 h-[240px]">
            <DoughnutChart data={doughnutData} />
          </div>
        </div>

        <div className="rounded-[18px] border border-border bg-panel p-6 shadow-premium">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Devices by OS</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Platform distribution</h2>
            </div>
            <span className="rounded-3xl bg-[#111c2e] px-3 py-2 text-sm text-slate-400">Last 7 days</span>
          </div>
          <div className="mt-8 h-[240px]">
            <DoughnutChart data={osData} />
          </div>
        </div>

        <div className="rounded-[18px] border border-border bg-panel p-6 shadow-premium">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Security Score Trend</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Risk posture evolution</h2>
            </div>
            <span className="rounded-3xl bg-[#111c2e] px-3 py-2 text-sm text-slate-400">Weekly</span>
          </div>
          <div className="mt-8 h-[240px]">
            <TrendChart data={lineData} color="#8b5cf6" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard key={module.title} title={module.title} description={module.description} icon={module.icon} accent={module.accent} />
        ))}
      </section>
    </div>
  );
}
