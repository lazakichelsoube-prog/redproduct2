import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, Search, Bell, LogOut, LayoutGrid, Building2,
  Mail, MessageSquare, Users, Inbox,
} from 'lucide-react';

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { label: 'Formulaires', sub: 'Je ne sais pas quoi mettre', value: 125, color: 'bg-purple-500', icon: <Inbox size={20} /> },
    { label: 'Messages', sub: 'Je ne sais pas quoi mettre', value: 40, color: 'bg-teal-500', icon: <MessageSquare size={20} /> },
    { label: 'Utilisateurs', sub: 'Je ne sais pas quoi mettre', value: 600, color: 'bg-yellow-500', icon: <Users size={20} /> },
    { label: 'E-mails', sub: 'Je ne sais pas quoi mettre', value: 25, color: 'bg-red-500', icon: <Mail size={20} /> },
    { label: 'Hôtels', sub: 'Je ne sais pas quoi mettre', value: 40, color: 'bg-purple-500', icon: <Building2 size={20} /> },
    { label: 'Entités', sub: 'Je ne sais pas quoi mettre', value: 2, color: 'bg-blue-500', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Overlay mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-200 text-slate-700 flex flex-col justify-between transform transition-transform duration-200 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          <div className="p-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 1V21" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 2L17 7.5L10.5 10L17 12.5L2 18V2Z" fill="url(#redFlagGradient)"/>
                <defs>
                  <linearGradient id="redFlagGradient" x1="2" y1="2" x2="17" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FB7185"/>
                    <stop offset="1" stopColor="#E11D48"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-bold text-slate-800">RED PRODUCT</span>
            </div>
            <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <p className="px-6 text-xs text-gray-500 mb-2">Principal</p>

          <nav>
            <Link to="/dashboard" className="flex items-center gap-3 px-6 py-3 bg-white font-medium text-slate-800">
              <LayoutGrid size={18} />
              Dashboard
            </Link>
            <Link to="/hotels" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-300 cursor-pointer text-slate-700">
              <Building2 size={18} />
              Liste des hôtels
            </Link>
          </nav>
        </div>

        {/* Bloc utilisateur en bas */}
        <div className="flex items-center gap-3 p-4 border-t border-gray-300">
          <div className="w-9 h-9 rounded-full bg-slate-400 flex items-center justify-center text-white text-sm font-bold">
            MB
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Mouhamet Badiane</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              en ligne
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white px-4 sm:px-8 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={22} className="text-slate-700" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Recherche"
                className="bg-transparent outline-none text-sm text-gray-600 w-40"
              />
            </div>
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 text-sm font-bold">
              MB
            </div>
            <LogOut size={20} className="text-gray-500 cursor-pointer" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-8">
          <p className="text-gray-400 text-sm mb-1">Lorem ipsum dolor sit amet consectetur</p>
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Bienvenue sur RED Product</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
                <div className={`${stat.color} text-white rounded-full w-10 h-10 flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value} <span className="text-base font-normal text-slate-700">{stat.label}</span></p>
                  <p className="text-gray-400 text-xs">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;