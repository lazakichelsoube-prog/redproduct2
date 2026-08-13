import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!accepted) {
      setError('Vous devez accepter les termes et la politique')
      return
    }

    try {
      await api.post('/auth/register/', {
        username,
        email,
        password,
      })
      navigate('/')
    } catch (err) {
      const data = err.response?.data
      if (data?.username) {
        setError(data.username[0])
      } else {
        setError("Erreur lors de l'inscription")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-2 text-white text-xl font-bold">
        🚩 RED PRODUCT
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 w-80 flex flex-col gap-4"
      >
        <p className="text-gray-700 font-medium">Inscrivez-vous en tant que Admin</p>

        <input
          type="text"
          placeholder="Nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-b border-gray-300 py-2 outline-none focus:border-gray-600"
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-gray-300 py-2 outline-none focus:border-gray-600"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b border-gray-300 py-2 outline-none focus:border-gray-600"
        />

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          Accepter les termes et la politique
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-gray-900 text-white py-2 rounded mt-2 hover:bg-gray-800"
        >
          S'inscrire
        </button>
      </form>

      <p className="text-white text-sm">
        Vous avez déjà un compte ?{' '}
        <Link to="/" className="text-yellow-400 cursor-pointer">
          Se connecter
        </Link>
      </p>
    </div>
  )
}

export default Register