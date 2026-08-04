import { Activity, BarChart3, Eye, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import TrendChart from '../components/charts/TrendChart';
import Skeleton from '../components/ui/Skeleton';


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
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch("http://localhost:5000/api/ueba/activities");
        const data = await res.json();

        setActivities(data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadActivities();
  }, []);

  const totalActivities = activities.length;

  const highRisk = activities.filter(a => a.riskScore >= 60).length;

  const failedLogins = activities.filter(
    a => a.activity === "Failed Login"
  ).length;

  const riskCards = [
    {
      title: "Total Activities",
      value: totalActivities,
      label: "All Events",
      accent: "blue",
    },
    {
      title: "High Risk",
      value: highRisk,
      label: "Risk >= 60",
      accent: "red",
    },
    {
      title: "Failed Logins",
      value: failedLogins,
      label: "Detected",
      accent: "orange",
    },
  ];

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
              {
                key: "username",
                label: "User",
              },
              {
                key: "activity",
                label: "Activity",
              },
              {
                key: "riskScore",
                label: "Risk Score",
                render: (row) => (
                  <Badge
                    color={
                      row.riskScore >= 100
                        ? "red"
                        : row.riskScore >= 60
                        ? "orange"
                        : "green"
                    }
                  >
                    {row.riskScore}
                  </Badge>
                ),
              },
            ]}
            data={activities}
          />
        </Card>
        <Card title="Login timeline" subtitle="Recent authentication events">
          <div className="space-y-4">
            {activities.slice(0, 8).map((entry) => (
              <div
                key={entry._id}
                className="rounded-[20px] border border-border bg-[#0f1728] p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">
                      {entry.activity}
                    </p>

                    <p className="text-sm text-slate-400">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card> 
      </div>
    </div>
)}