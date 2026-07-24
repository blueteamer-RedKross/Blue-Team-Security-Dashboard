import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const users = [
  { name: 'Avery Nash', role: 'SOC Analyst', email: 'avery.nash@example.com', department: 'Security', risk: 'Low', status: 'Active' },
  { name: 'Mia Torres', role: 'Incident Lead', email: 'mia.torres@example.com', department: 'Threat Ops', risk: 'Medium', status: 'Active' },
  { name: 'Eric Holt', role: 'Admin', email: 'eric.holt@example.com', department: 'IT Ops', risk: 'Low', status: 'Active' },
];

export default function UsersPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <SectionHeader title="Users" subtitle="Directory of SOC team members and roles" action={<Button variant="secondary">Invite user</Button>} />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Total users" subtitle="Active accounts">
          <p className="mt-4 text-4xl font-semibold text-white">58</p>
        </Card>
        <Card title="Risk score" subtitle="Average user risk">
          <p className="mt-4 text-4xl font-semibold text-white">27</p>
        </Card>
        <Card title="Departments" subtitle="Organizational teams">
          <p className="mt-4 text-4xl font-semibold text-white">7</p>
        </Card>
      </div>

      <Card title="Team members" subtitle="Role, department, and risk" className="overflow-hidden">
        {loading ? (
          <Skeleton className="h-[320px]" />
        ) : (
          <Table
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'risk', label: 'Risk Score', render: (row) => <Badge color={row.risk === 'Low' ? 'green' : row.risk === 'Medium' ? 'orange' : 'red'}>{row.risk}</Badge> },
              { key: 'status', label: 'Status', render: (row) => <Badge color={row.status === 'Active' ? 'green' : 'slate'}>{row.status}</Badge> },
            ]}
            data={users}
          />
        )}
      </Card>
    </div>
  );
}
