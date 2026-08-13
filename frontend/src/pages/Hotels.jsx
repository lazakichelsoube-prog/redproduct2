import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/hotels/')
      .then((res) => setHotels(res.data))
      .catch(() => setError('Impossible de charger les hôtels'));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <span className="text-red-500 text-xl">🚩</span>
          <span className="font-bold">RED PRODUCT</span>
        </div>
        <nav className="flex-1 mt-4">
          <Link to="/dashboard" className="block px-6 py-3 hover:bg-slate-700">
            📊 Dashboard
          </Link>
          <Link to="/hotels" className="block px-6 py-3 bg-slate-700 font-medium">
            🏨 Liste des hôtels
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Liste des hôtels</h1>
        <p className="text-gray-500 mb-8">Hôtels {hotels.length}</p>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-400">
                Image
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">{hotel.address}</p>
                <p className="font-bold text-slate-800">{hotel.name}</p>
                <p className="text-sm text-gray-600 mt-1">{hotel.price} XOF par nuit</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Hotels;