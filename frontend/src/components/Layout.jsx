import { NavLink, useNavigate } from 'react-router-dom';
import { FiShield, FiHome, FiMonitor, FiSearch, FiBell, FiLogOut, FiSettings, FiUsers, FiBarChart2, FiActivity, FiLock, FiChevronsRight, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: FiHome },
  { to: '/devices', label: 'Devices', icon: FiMonitor },
  { to: '/antivirus', label: 'Antivirus', icon: FiShield },
  { to: '/edr', label: 'EDR', icon: FiActivity },
  { to: '/ueba', label: 'UEBA', icon: FiBarChart2 },
  { to: '/vpn', label: 'VPN', icon: FiShield },
  { to: '/mdm', label: 'MDM', icon: FiLock },
  { to: '/regshot', label: 'RegShot', icon: FiSearch },
  { to: '/alerts', label: 'Alerts', icon: FiBell },
  { to: '/reports', label: 'Reports', icon: FiBarChart2 },
  { to: '/users', label: 'Users', icon: FiUsers },
  { to: '/settings', label: 'Settings', icon: FiSettings },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <FiShield className="brand-icon" />
          <div>
            <div className="brand-title">Blue Team</div>
            <div className="brand-subtitle">Security</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">{user?.name?.[0] || 'A'}</div>
            <div>
              <div className="user-name">{user?.name || 'Admin'}</div>
              <div className="user-role">{user?.role || 'Admin'}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>
      <main className="content-area">
        <header className="topbar">
          <div>
            <div className="eyebrow">Security operations center</div>
            <h1 className="page-title">Blue Team Dashboard</h1>
          </div>
          <div className="topbar-actions">
            <button className="refresh-btn"><FiRefreshCw /></button>
            <button className="icon-btn"><FiBell /></button>
            <button className="icon-btn"><FiSettings /></button>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
