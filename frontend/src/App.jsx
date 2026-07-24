import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DevicesPage from './pages/DevicesPage';
import AntivirusPage from './pages/AntivirusPage';
import EdrPage from './pages/EdrPage';
import UebaPage from './pages/UebaPage';
import VpnPage from './pages/VpnPage';
import MdmPage from './pages/MdmPage';
import RegshotPage from './pages/RegshotPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center text-slate-400">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/devices" element={<ProtectedRoute><DashboardLayout><DevicesPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/antivirus" element={<ProtectedRoute><DashboardLayout><AntivirusPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/edr" element={<ProtectedRoute><DashboardLayout><EdrPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/ueba" element={<ProtectedRoute><DashboardLayout><UebaPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/vpn" element={<ProtectedRoute><DashboardLayout><VpnPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/mdm" element={<ProtectedRoute><DashboardLayout><MdmPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/regshot" element={<ProtectedRoute><DashboardLayout><RegshotPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/alerts" element={<ProtectedRoute><DashboardLayout><AlertsPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/reports" element={<ProtectedRoute><DashboardLayout><ReportsPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/users" element={<ProtectedRoute><DashboardLayout><UsersPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} />
  </Routes>
);

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
