import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const stats = [
    { label: 'Formulaires', value: 125, color: 'bg-purple-500', icon: '✉️' },
    { label: 'Messages', value: 40, color: 'bg-teal-500', icon: '💬' },
    { label: 'Utilisateurs', value: 600, color: 'bg-yellow-500', icon: '👥' },
    { label: 'E-mails', value: 25, color: 'bg-red-500', icon: '✉️' },
    { label: 'Hôtels', value: 40, color: 'bg-purple-500', icon: '🏨' },
    { label: 'Entités', value: 2, color: 'bg-blue-500', icon: '🏢' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`pattern-overlay fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white flex flex-col transform transition-transform duration-200 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">🚩</span>
            <span className="font-bold">RED PRODUCT</span>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 mt-4">
          <Link to="/dashboard" className="block px-6 py-3 bg-slate-700 font-medium">
            📊 Dashboard
          </Link>
          <Link to="/hotels" className="block px-6 py-3 hover:bg-slate-700 cursor-pointer">
            🏨 Liste des hôtels
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-8">
        <div className="flex items-center gap-3 mb-1">
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={22} className="text-slate-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-0 lg:ml-0">Bienvenue sur RED Product</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
              <div className={`${stat.color} text-white rounded-full w-10 h-10 flex items-center justify-center text-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;