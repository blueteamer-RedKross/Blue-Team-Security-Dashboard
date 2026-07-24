import { useEffect, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import Table from '../components/ui/Table';
import Skeleton from '../components/ui/Skeleton';

const deviceData = [
  { hostname: 'CORP-LAP-043', os: 'Windows 11', ip: '10.0.0.43', health: 'Good', status: 'Online' },
  { hostname: 'SVR-WEB-02', os: 'Ubuntu 22.04', ip: '10.0.0.52', health: 'Attention', status: 'Online' },
  { hostname: 'BYOD-137', os: 'Android 14', ip: '10.0.0.14', health: 'Good', status: 'Offline' },
];

export default function DevicesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <SectionHeader title="Devices" subtitle="Endpoint inventory and health status" action={<Button variant="secondary">Add device</Button>} />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Total devices" subtitle="Managed endpoints">
          <p className="mt-4 text-4xl font-semibold text-white">742</p>
        </Card>
        <Card title="Healthy devices" subtitle="Compliant systems">
          <p className="mt-4 text-4xl font-semibold text-white">684</p>
        </Card>
        <Card title="Alerts" subtitle="Device issues">
          <p className="mt-4 text-4xl font-semibold text-white">18</p>
        </Card>
      </div>

      <Card title="Device table" subtitle="Hostname, OS, and network health">
        {loading ? (
          <Skeleton className="h-[320px]" />
        ) : (
          <Table
            columns={[
              { key: 'hostname', label: 'Hostname' },
              { key: 'os', label: 'OS' },
              { key: 'ip', label: 'IP Address' },
              { key: 'health', label: 'Health', render: (row) => <Badge color={row.health === 'Good' ? 'green' : 'orange'}>{row.health}</Badge> },
              { key: 'status', label: 'Status', render: (row) => <Badge color={row.status === 'Online' ? 'green' : 'red'}>{row.status}</Badge> },
            ]}
            data={deviceData}
          />
        )}
      </Card>
    </div>
  );
}
