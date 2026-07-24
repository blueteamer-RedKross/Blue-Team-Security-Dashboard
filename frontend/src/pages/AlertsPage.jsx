import { useEffect, useState } from 'react';
import { Bell, SlidersHorizontal } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const alertData = [
  { id: 'A01', title: 'Unauthorized lateral movement', severity: 'Critical', status: 'Open', source: 'EDR' },
  { id: 'A02', title: 'VPN brute force attempt', severity: 'High', status: 'Investigating', source: 'VPN' },
  { id: 'A03', title: 'Email phishing campaign', severity: 'Medium', status: 'Mitigated', source: 'Gateway' },
  { id: 'A04', title: 'Malware command and control', severity: 'Critical', status: 'Open', source: 'Antivirus' },
];

export default function AlertsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = alertData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || item.severity === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Alerts"
        subtitle="Active incident notifications and investigation status"
        action={<Button variant="secondary"><SlidersHorizontal className="h-4 w-4" /> Filter</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-slate-300">
                <Bell className="h-5 w-5 text-sky-400" />
                <span className="text-sm">Monitoring 4 critical alerts</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  className="rounded-3xl border border-border bg-[#0b1220] px-4 py-3 text-sm text-slate-200 outline-none focus:border-sky-500"
                  placeholder="Search alerts"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <select
                  className="rounded-3xl border border-border bg-[#0b1220] px-4 py-3 text-sm text-slate-200 outline-none focus:border-sky-500"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <option value="All">All Severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>
          </Card>

          <Card title="Alert table" subtitle="Severity, source, and resolution status">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
            ) : (
              <Table
                columns={[
                  { key: 'title', label: 'Title' },
                  { key: 'severity', label: 'Severity', render: (row) => <Badge color={row.severity === 'Critical' ? 'red' : row.severity === 'High' ? 'orange' : 'yellow'}>{row.severity}</Badge> },
                  { key: 'status', label: 'Status', render: (row) => <Badge color={row.status === 'Open' ? 'red' : row.status === 'Investigating' ? 'orange' : 'green'}>{row.status}</Badge> },
                  { key: 'source', label: 'Source' },
                  { key: 'actions', label: 'Actions', render: () => <Button variant="secondary">View</Button> },
                ]}
                data={filteredData}
              />
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Alert summary" subtitle="Key metrics">
            <div className="grid gap-4">
              <div className="rounded-[20px] bg-[#0f1728] p-4">
                <p className="text-sm text-slate-400">Critical</p>
                <p className="mt-3 text-3xl font-semibold text-white">2</p>
              </div>
              <div className="rounded-[20px] bg-[#0f1728] p-4">
                <p className="text-sm text-slate-400">Pending investigation</p>
                <p className="mt-3 text-3xl font-semibold text-white">3</p>
              </div>
            </div>
          </Card>
          <Card title="Recent activity" subtitle="Latest alert updates">
            <div className="space-y-4">
              {alertData.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-[20px] border border-border bg-[#0f1728] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.source}</p>
                    </div>
                    <Badge color={item.severity === 'Critical' ? 'red' : item.severity === 'High' ? 'orange' : 'yellow'}>{item.severity}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
