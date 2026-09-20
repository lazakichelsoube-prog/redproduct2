// npm i react-icons
// Dans index.html, dans <head> :
// <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { MdDashboard, MdApartment } from 'react-icons/md';

// Logo approximatif : remplace-le par le SVG exporté depuis Figma pour un rendu identique.
const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
    <polygon points="4,4 16,4 16,36 4,36" fill="#ffffff" />
    <polygon points="18,4 36,36 24,36 18,24" fill="#ffffff" />
    <polygon points="16,4 28,4 16,22" fill="#9ca3a8" />
  </svg>
);

const links = [
  { to: '/dashboard', label: 'Dashboard', Icon: MdDashboard },
  { to: '/hotels', label: 'Liste des hôtels', Icon: MdApartment },
];

// `footer` : contenu du bloc utilisateur en bas (avatar + nom), fourni par chaque page.
export default function Sidebar({ isOpen = false, onClose = () => {}, footer = null }) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        style={{ fontFamily: 'Roboto, sans-serif' }}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#565b5f] text-white flex flex-col justify-between transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo + titre */}
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-xl font-bold text-gray-100">RED PRODUCT</span>
            </div>
            <button className="lg:hidden" onClick={onClose} aria-label="Fermer le menu">
              <X size={20} />
            </button>
          </div>

          <p className="px-4 pt-3 pb-3 text-[15px] text-white">Principal</p>

          <nav>
            {links.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 h-12 text-[15px] transition-colors ${
                    isActive
                      ? 'bg-white text-[#4a4f53] font-medium'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon size={22} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {footer && (
          <div className="flex items-center gap-3 p-4 border-t border-white/20">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
}
