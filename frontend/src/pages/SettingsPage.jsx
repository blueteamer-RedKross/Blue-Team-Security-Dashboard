import { useMemo, useState } from 'react';
import { Bell, Cog, Key, Moon, ShieldCheck, UserCircle } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const tabs = ['Profile', 'Security', 'Notifications', 'Appearance', 'API Keys', 'System'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [form, setForm] = useState({ fullName: 'Avery Nash', email: 'avery.nash@example.com', phone: '+1 202-555-0184', notifications: true, theme: 'Dark' });

  const content = useMemo(() => {
    if (activeTab === 'Profile') {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Full name
              <input className="mt-2 w-full rounded-3xl border border-border bg-[#0b1220] px-4 py-3 text-sm text-white outline-none" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </label>
            <label className="block text-sm text-slate-300">
              Email address
              <input className="mt-2 w-full rounded-3xl border border-border bg-[#0b1220] px-4 py-3 text-sm text-white outline-none" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
          </div>
          <label className="block text-sm text-slate-300">
            Phone number
            <input className="mt-2 w-full rounded-3xl border border-border bg-[#0b1220] px-4 py-3 text-sm text-white outline-none" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <Button variant="secondary">Save profile</Button>
        </div>
      );
    }

    if (activeTab === 'Security') {
      return (
        <div className="space-y-6">
          <Card title="Password policy" subtitle="Update your secure credentials">
            <p className="mt-4 text-sm text-slate-400">Use a strong password with at least 12 characters and a mix of symbols, numbers, and uppercase letters.</p>
            <Button variant="secondary">Change password</Button>
          </Card>
          <Card title="Two-factor authentication" subtitle="Enable additional protection">
            <Badge color="green">Enabled</Badge>
            <p className="mt-4 text-sm text-slate-400">Your account is protected with OTP authentication.</p>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Notifications') {
      return (
        <div className="space-y-6">
          <Card title="Alerts" subtitle="Notification preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-[20px] border border-border bg-[#0f1728] p-4">
                <div>
                  <p className="text-sm text-white">Email alerts</p>
                  <p className="text-xs text-slate-500">Receive threat notifications by email.</p>
                </div>
                <Badge color={form.notifications ? 'green' : 'slate'}>{form.notifications ? 'On' : 'Off'}</Badge>
              </div>
              <Button variant="secondary">Manage notifications</Button>
            </div>
          </Card>
        </div>
      );
    }

    if (activeTab === 'Appearance') {
      return (
        <div className="space-y-6">
          <Card title="Theme" subtitle="Visual appearance settings">
            <div className="flex flex-wrap gap-3">
              {['Dark', 'Solarized', 'Midnight'].map((theme) => (
                <button key={theme} onClick={() => setForm({ ...form, theme })} className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${form.theme === theme ? 'border-sky-400 bg-slate-900 text-white' : 'border-border bg-[#0f1728] text-slate-300 hover:bg-hover'}`}>
                  {theme}
                </button>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    if (activeTab === 'API Keys') {
      return (
        <div className="space-y-6">
          <Card title="API keys" subtitle="Generate and manage credentials">
            <div className="rounded-[20px] border border-border bg-[#0f1728] p-4">
              <p className="text-sm text-slate-300">No active API keys found.</p>
              <Button variant="secondary" className="mt-4">Create key</Button>
            </div>
          </Card>
        </div>
      );
    }

    if (activeTab === 'System') {
      return (
        <div className="space-y-6">
          <Card title="Configuration" subtitle="System settings and integrations">
            <div className="space-y-4">
              <div className="rounded-[20px] border border-border bg-[#0f1728] p-4">
                <p className="text-sm text-slate-300">Operational mode</p>
                <p className="mt-1 text-white">SOC enterprise deployment</p>
              </div>
              <Button variant="secondary">View system logs</Button>
            </div>
          </Card>
        </div>
      );
    }

    return null;
  }, [activeTab, form]);

  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" subtitle="Configure your cybersecurity workspace" />

      <div className="grid gap-6 xl:grid-cols-[0.28fr_0.72fr]">
        <aside className="rounded-[28px] border border-border bg-[#111a2f] p-6 shadow-premium">
          <div className="mb-6 space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-left text-sm font-semibold transition ${activeTab === tab ? 'bg-[#0f1728] text-white' : 'text-slate-400 hover:bg-hover hover:text-white'}`}
              >
                {tab === 'Profile' && <UserCircle className="h-4 w-4" />}
                {tab === 'Security' && <Key className="h-4 w-4" />}
                {tab === 'Notifications' && <Bell className="h-4 w-4" />}
                {tab === 'Appearance' && <Moon className="h-4 w-4" />}
                {tab === 'API Keys' && <ShieldCheck className="h-4 w-4" />}
                {tab === 'System' && <Cog className="h-4 w-4" />}
                {tab}
              </button>
            ))}
          </div>
        </aside>
        <div>{content}</div>
      </div>
    </div>
  );
}
