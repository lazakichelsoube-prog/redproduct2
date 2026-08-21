import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, LogOut, LayoutGrid, Building2, Plus, Menu, X, Camera } from 'lucide-react';
import api from '../api';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/hotels/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotels(response.data);
      } catch (err) {
        setError('Impossible de charger les hôtels');
      }
    };

    const fetchMe = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/auth/me/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMe(response.data);
      } catch (err) {
        // silencieux : si /me/ échoue, on garde l'avatar par défaut
      }
    };

    fetchHotels();
    fetchMe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  };

  const getImageUrl = (photo) => {
    if (!photo) return null;
    return photo.startsWith('http') ? photo : photo;
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.patch('/auth/me/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMe(response.data);
    } catch (err) {
      alert("Erreur lors de l'envoi de la photo");
    } finally {
      setUploading(false);
    }
  };

  const AvatarUpload = ({ size = 'w-9 h-9' }) => (
    <label className={`${size} rounded-full bg-gray-200 overflow-hidden flex-shrink-0 relative cursor-pointer group block`}>
      <img
        src={me?.avatar || '/default-avatar.png'}
        alt="avatar"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <Camera size={14} className="text-white" />
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
        disabled={uploading}
      />
    </label>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay mobile quand le menu est ouvert */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`pattern-overlay fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white flex flex-col justify-between transform transition-transform duration-200 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          <div className="p-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-xl">🚩</span>
              <span className="font-bold tracking-wide">RED PRODUCT</span>
            </div>
            <button className="lg:hidden" onClick={() => setMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="px-6 text-xs text-gray-400 mt-2 mb-1">Principal</p>
          <nav>
            <Link to="/dashboard" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-700 cursor-pointer text-sm">
              <LayoutGrid size={18} /> Dashboard
            </Link>
            <Link to="/hotels" className="flex items-center gap-3 px-6 py-3 bg-slate-700 font-medium text-sm">
              <Building2 size={18} /> Liste des hôtels
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-700">
          <AvatarUpload />
          <div>
            <p className="text-sm font-medium">{me?.username || 'Utilisateur'}</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block" /> en ligne
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 w-full min-w-0">
        {/* Header */}
        <div className="flex justify-between items-center bg-white px-4 sm:px-8 py-4 border-b gap-2">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={22} className="text-slate-700" />
            </button>
            <h1 className="text-base sm:text-lg font-semibold text-slate-800">Liste des hôtels</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Recherche"
                className="pl-9 pr-3 py-1.5 rounded-md bg-gray-100 text-sm focus:outline-none w-48"
              />
            </div>
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <AvatarUpload size="w-8 h-8" />
            <LogOut size={18} onClick={handleLogout} className="text-gray-500 cursor-pointer hover:text-red-500" />
          </div>
        </div>

        <div className="p-4 sm:p-8">
          <div className="flex justify-between items-center mb-1 flex-wrap gap-3">
            <p className="text-gray-500">
              Hôtels <span className="text-gray-400">{hotels.length}</span>
            </p>
            <Link to="/hotels/create" className="flex items-center gap-2 bg-white border border-gray-300 text-slate-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              <Plus size={16} /> Créer un nouveau hôtel
            </Link>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="w-full h-48 sm:h-32 bg-gray-200 flex items-center justify-center">
                  {hotel.photo ? (
                    <img
                      src={getImageUrl(hotel.photo)}
                      alt={hotel.nom}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Pas d'image</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-red-400">{hotel.adresse}</p>
                  <p className="font-semibold text-slate-800">{hotel.nom}</p>
                  <p className="text-sm text-gray-500">{hotel.prix_nuit} {hotel.devise} par nuit</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HotelList;
