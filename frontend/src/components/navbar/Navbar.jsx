import { useEffect, useRef, useState } from 'react';
import { Bell, CalendarDays, Menu, Search, LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    function onDoc(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // ignore API errors but clear local session anyway
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
    // Use location.replace to avoid back reopening protected pages
    window.location.replace('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-border bg-page/95 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button className="grid h-12 w-12 place-items-center rounded-3xl border border-border bg-[#111c2e] text-slate-300 transition hover:bg-hover">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Dashboard</p>
          <h1 className="text-2xl font-semibold text-white">Security Operations Center</h1>
          <p className="mt-1 text-sm text-slate-400">Overview of active events, health, and response posture.</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative hidden md:flex flex-1 max-w-xl items-center rounded-3xl border border-border bg-[#111c2e] px-4 py-3 text-slate-300 shadow-sm shadow-black/5">
          <Search className="mr-3 h-5 w-5 text-slate-500" />
          <input
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            placeholder="Search incidents, hosts, alerts..."
          />
        </div>
        <button className="hidden h-12 w-12 items-center justify-center rounded-3xl border border-border bg-[#111c2e] text-slate-300 transition hover:bg-hover md:inline-flex">
          <Bell className="h-5 w-5" />
        </button>
        <div className="hidden items-center gap-3 rounded-3xl border border-border bg-[#111c2e] px-4 py-3 text-slate-300 md:flex">
          <CalendarDays className="h-5 w-5 text-slate-400" />
          <span className="text-sm">Jun 4, 2026 - Jun 10, 2026</span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-600 text-white shadow-[0_20px_60px_rgba(58,123,253,0.24)]"
          >
            {user?.name?.[0] || 'A'}
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 rounded-[14px] border border-border bg-[#0b1220] shadow-lg">
              <button
                onClick={() => { setOpen(false); navigate('/settings'); }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 hover:bg-hover"
              >
                <User className="h-4 w-4 text-slate-400" />
                My Profile
              </button>
              <button
                onClick={() => { setOpen(false); navigate('/settings'); }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 hover:bg-hover"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                Settings
              </button>
              <div className="border-t border-border" />
              <button
                onClick={() => { setOpen(false); setConfirmOpen(true); }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-rose-400 hover:bg-rose-800/30"
              >
                <LogOut className="h-4 w-4 text-rose-400" />
                Logout
              </button>
            </div>
          )}
        </div>

        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setConfirmOpen(false)} />
            <div className="relative w-full max-w-md rounded-[18px] border border-border bg-panel p-6">
              <h3 className="text-lg font-semibold text-white">Logout</h3>
              <p className="mt-3 text-sm text-slate-400">Are you sure you want to logout?</p>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setConfirmOpen(false)} className="rounded-3xl border border-border bg-[#0b1220] px-4 py-2 text-sm text-slate-200">Cancel</button>
                <button onClick={handleLogout} className="rounded-3xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-105">Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
