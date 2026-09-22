import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import AuthLayout, {
  AuthCard,
  AuthInput,
  AuthCheckbox,
  AuthButton,
  AuthError,
  AuthFooter,
  AuthLink,
} from '../components/AuthLayout'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

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
      setSuccess('Inscription réussie avec succès')
      setTimeout(() => {
        navigate('/')
      }, 2000)
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
    <AuthLayout>
      <AuthCard title="Inscrivez-vous en tant que Admin">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[56px]">
            <AuthInput
              type="text"
              placeholder="Nom"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!!success}
            />
            <AuthInput
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!success}
            />
            <AuthInput
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!!success}
            />
          </div>

          <AuthCheckbox
            label="Accepter les termes et la politique"
            className="mt-[33.33px]"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            disabled={!!success}
          />

          <AuthButton type="submit" className="mt-[34.67px]" disabled={!!success}>
            S'inscrire
          </AuthButton>

          {success && (
            <p className="mt-4 text-center text-sm font-medium text-green-500">
              {success}
            </p>
          )}

          <AuthError>{error}</AuthError>
        </form>
      </AuthCard>

      <AuthFooter>
        <p className="text-white/[.87]">
          Vous avez déjà un compte? <AuthLink to="/" bold>Se connecter</AuthLink>
        </p>
      </AuthFooter>
    </AuthLayout>
  )
}

export default Register
