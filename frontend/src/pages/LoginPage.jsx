import { useMemo, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = useMemo(() => email.includes('@') && password.length >= 6, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) {
      setError('Please provide a valid email address and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password, rememberMe);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to authenticate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-page px-6 py-10 text-slate-100">
      <div className="mx-auto grid max-w-[1180px] gap-8 xl:grid-cols-[1.2fr_0.85fr]">
        <section className="rounded-[28px] border border-border bg-[#111a2f] p-10 shadow-premium">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-sky-500/10 px-4 py-3 text-sky-200 shadow-[0_18px_50px_rgba(58,123,253,0.16)]">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.3em]">Blue Team</span>
          </div>
          <div className="mt-10 max-w-xl">
            <h1 className="text-5xl font-semibold text-white">Secure enterprise login for SOC operations.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Access the command center to monitor active threats, manage device posture, and respond to security events in real time.
            </p>
          </div>
          <div className="mt-10 grid gap-6 rounded-[28px] border border-border bg-[#0b1220] p-8 shadow-[0_20px_70px_rgba(8,17,31,0.75)]">
            <div className="rounded-[24px] bg-[#0f1728] p-6 text-slate-300 shadow-inner shadow-slate-950/20">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Threat intelligence</p>
              <p className="mt-3 text-2xl font-semibold text-white">Continuous monitoring and adversary detection</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] bg-[#0f1728] p-5 text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Coverage</p>
                <p className="mt-3 text-2xl font-semibold text-white">7,483 endpoints</p>
              </div>
              <div className="rounded-[22px] bg-[#0f1728] p-5 text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Compliance</p>
                <p className="mt-3 text-2xl font-semibold text-white">94%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-[#111a2f] p-10 shadow-premium">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Sign in to continue</h2>
            </div>
            <div className="rounded-3xl bg-[#0f1728] px-4 py-3 text-xs uppercase tracking-[0.28em] text-slate-400">Secure</div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm text-slate-300">
              <span className="mb-3 flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4" /> Email address
              </span>
              <input
                className="w-full rounded-3xl border border-border bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
              />
            </label>
            <label className="block text-sm text-slate-300">
              <span className="mb-3 flex items-center gap-2 text-slate-400">
                <Lock className="h-4 w-4" /> Password
              </span>
              <div className="relative">
                <input
                  className="w-full rounded-3xl border border-border bg-[#0b1220] px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-sky-500"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-100"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border border-slate-600 bg-[#0b1220] text-sky-500 focus:ring-sky-500"
                />
                Remember me
              </label>
              <button type="button" className="text-sm text-slate-400 transition hover:text-white">Forgot password?</button>
            </div>
            {error && <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(58,123,253,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <div className="mt-10 rounded-[24px] border border-border bg-[#0f1728] p-6 text-slate-300">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Enterprise access</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Designed for security operators, incident responders, and executive teams with high assurance controls.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
