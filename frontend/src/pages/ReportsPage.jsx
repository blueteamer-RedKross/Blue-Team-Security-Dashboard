import { Download, FileText, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import TrendChart from '../components/charts/TrendChart';
import DoughnutChart from '../components/charts/DoughnutChart';
import Skeleton from '../components/ui/Skeleton';

const reportCards = [
  { label: 'Executive summary', value: '12 reports' },
  { label: 'Threat analytics', value: '5 dashboards' },
  { label: 'Compliance insights', value: '8 reviews' },
];

const performance = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 78 },
  { name: 'Wed', value: 72 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 81 },
  { name: 'Sun', value: 88 },
];

const segments = [
  { name: 'Security posture', value: 42 },
  { name: 'Compliance', value: 28 },
  { name: 'Incident response', value: 30 },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Reports"
        subtitle="Downloadable intelligence briefs and executive summaries"
        action={<Button variant="secondary"><SlidersHorizontal className="h-4 w-4" /> Filters</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {reportCards.map((card) => (
          <Card key={card.label} title={card.label} subtitle="Ready to export">
            <p className="mt-4 text-4xl font-semibold text-white">{card.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card title="Performance trend" subtitle="Weekly report generation">
          {loading ? <Skeleton className="h-[300px]" /> : <TrendChart data={performance} color="#3a82ff" />}
        </Card>
        <Card title="Report segments" subtitle="Priority areas">
          {loading ? <Skeleton className="h-[300px]" /> : <DoughnutChart data={segments} />}
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Export operations" subtitle="Download reports">
          <div className="grid gap-4">
            <Button variant="secondary" className="w-full"><FileText className="h-4 w-4" /> Download PDF</Button>
            <Button variant="secondary" className="w-full"><Download className="h-4 w-4" /> Download CSV</Button>
          </div>
        </Card>
        <Card title="Report status" subtitle="Latest generation results">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Executive risk overview</p>
                  <p className="mt-1 text-sm text-slate-400">Generated 10 minutes ago</p>
                </div>
                <Badge color="green">Completed</Badge>
              </div>
            </div>
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Incident response brief</p>
                  <p className="mt-1 text-sm text-slate-400">Scheduled for export</p>
                </div>
                <Badge color="blue">Ready</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
