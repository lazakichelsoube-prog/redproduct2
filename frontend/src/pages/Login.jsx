import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/token/', {
        username: email,
        password: password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 px-4">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-red-500 text-2xl">🚩</span>
        <h1 className="text-white text-xl font-bold tracking-wide">RED PRODUCT</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-slate-800 font-semibold mb-6">
          Connectez-vous en tant que <span className="font-bold">Admin</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-slate-800 text-gray-700 placeholder-gray-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-slate-800 text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-slate-800" />
            <label htmlFor="remember" className="text-sm text-gray-600">Gardez-moi connecté</label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-3 rounded-md font-medium hover:bg-slate-700 transition"
          >
            Se connecter
          </button>
        </form>
      </div>

      <Link to="/forgot-password" className="text-yellow-400 text-sm mt-6 hover:underline">
        Mot de passe oublié ?
      </Link>

      <p className="text-white text-sm mt-4">
        Vous n'avez pas de compte ?{' '}
        <Link to="/register" className="text-yellow-400 hover:underline">S'inscrire</Link>
      </p>
    </div>
  );
}

export default Login;