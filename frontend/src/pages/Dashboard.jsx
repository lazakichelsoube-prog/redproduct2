import { useState } from 'react';
import {
  Menu, Search, Bell, LogOut, Building2,
  Mail, MessageSquare, Users, Inbox,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

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
    <div className="flex h-screen overflow-hidden bg-[#f0f0f0]">
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        footer={
          <>
            <img
              src="/avatar.png"
              alt="Mouhamet Badiane"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-white">Mouhamet Badiane</p>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                en ligne
              </p>
            </div>
          </>
        }
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between bg-white border-b border-gray-100 px-4 sm:px-8 py-4">
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
            <img
              src="/avatar.png"
              alt="Mouhamet Badiane"
              className="w-9 h-9 rounded-full object-cover"
            />
            <LogOut size={20} className="text-gray-500 cursor-pointer" />
          </div>
        </header>

        {/* Bloc de bienvenue : fond blanc + ligne de séparation */}
        <div className="shrink-0 bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
          <h2 className="text-2xl font-light text-slate-800">Bienvenue sur RED Product</h2>
          <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur</p>
        </div>

        {/* Seule cette zone défile */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 [scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent]">
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
