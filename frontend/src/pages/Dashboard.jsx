import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
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
      {/* Sidebar */}
      <aside className="pattern-overlay w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <span className="text-red-500 text-xl">🚩</span>
          <span className="font-bold">RED PRODUCT</span>
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
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
        <p className="text-gray-500 mb-8">Bienvenue sur RED Product</p>

        <div className="grid grid-cols-3 gap-6">
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