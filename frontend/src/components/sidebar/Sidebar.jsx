import { NavLink } from 'react-router-dom';
import {
  Home,
  ShieldCheck,
  Activity,
  BarChart3,
  Wifi,
  Lock,
  Search,
  Bell,
  FileText,
  Monitor,
  Users,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/antivirus', label: 'Antivirus', icon: ShieldCheck },
  { to: '/edr', label: 'EDR', icon: Activity },
  { to: '/ueba', label: 'UEBA', icon: BarChart3 },
  { to: '/vpn', label: 'VPN', icon: Wifi },
  { to: '/mdm', label: 'MDM', icon: Lock },
  { to: '/regshot', label: 'RegShot', icon: Search },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/devices', label: 'Devices', icon: Monitor },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden xl:flex xl:w-[270px] flex-col bg-sidebar border-r border-border px-4 py-6 text-slate-300">
      <div className="mb-8 flex items-center gap-3 rounded-[28px] bg-[#15223b] p-4 shadow-premium">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-violet-600 text-white shadow-[0_20px_60px_rgba(58,123,253,0.22)]">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="text-base font-semibold text-white">Blue Team</p>
          <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Security</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-accent text-white shadow-[0_16px_40px_rgba(58,123,253,0.22)]'
                  : 'text-slate-400 hover:bg-hover hover:text-white'
              }`
            }
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-slate-300 group-hover:bg-[#17293c]">
              <Icon className="h-5 w-5" />
            </span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-[24px] border border-[#22304a] bg-[#111c2e] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-white">A</div>
          <div>
            <p className="text-sm font-semibold text-white">Avery Nash</p>
            <p className="text-xs text-slate-500">SOC Analyst</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-[#22304a] bg-[#0b1220] px-3 py-2 text-xs text-slate-400">
          Active monitoring
        </div>
      </div>
    </aside>
  );
}
