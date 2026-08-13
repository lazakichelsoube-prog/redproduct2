import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import api from '../api';

function CreateHotel() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '',
    adresse: '',
    email: '',
    telephone: '',
    prix_nuit: '',
    devise: 'XOF',
    photo: null,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') formData.append(key, value);
      });

      await api.post('/hotels/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/hotels');
    } catch (err) {
      setError("Erreur lors de la création de l'hôtel");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate('/hotels')}
          className="flex items-center gap-2 text-slate-700 font-semibold mb-4"
        >
          <ArrowLeft size={18} /> CRÉER UN NOUVEL HÔTEL
        </button>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nom de l'hôtel</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={form.adresse}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Numéro de téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Prix par nuit</label>
                <input
                  type="number"
                  name="prix_nuit"
                  value={form.prix_nuit}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Devise</label>
                <select
                  name="devise"
                  value={form.devise}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                >
                  <option value="XOF">F XOF</option>
                  <option value="EUR">Euro</option>
                  <option value="USD">Dollar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Ajouter une photo</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-40 cursor-pointer hover:bg-gray-50">
                <ImageIcon size={28} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-400">
                  {form.photo ? form.photo.name : 'Ajouter une photo'}
                </span>
                <input type="file" name="photo" accept="image/*" onChange={handleChange} className="hidden" />
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-slate-800 text-white px-6 py-2 rounded-md font-medium hover:bg-slate-700"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateHotel;