import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api'

function ResetPassword() {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/password-reset-confirm/', {
        uid,
        token,
        new_password: password,
      })
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Lien invalide ou expiré. Redemandez une réinitialisation.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-background min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-2 text-white text-xl font-bold">
        🚩 RED PRODUCT
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 w-80 flex flex-col gap-4"
      >
        <p className="text-gray-700 font-medium">Nouveau mot de passe</p>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b border-gray-300 py-2 outline-none focus:border-gray-600"
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border-b border-gray-300 py-2 outline-none focus:border-gray-600"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {success && (
          <p className="text-green-600 text-sm">
            Mot de passe réinitialisé ! Redirection...
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white py-2 rounded mt-2 hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Envoi...' : 'Réinitialiser'}
        </button>
      </form>

      <p className="text-white text-sm">
        Revenir à la{' '}
        <Link to="/" className="text-yellow-400 cursor-pointer">
          connexion
        </Link>
      </p>
    </div>
  )
}

export default ResetPassword
