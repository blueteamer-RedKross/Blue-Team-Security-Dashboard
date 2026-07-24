import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-page text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 px-6 pb-8 pt-6 xl:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
