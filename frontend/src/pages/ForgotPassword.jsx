import { useState } from 'react'
import api from '../api'
import AuthLayout, {
  AuthCard,
  AuthInput,
  AuthButton,
  AuthError,
  AuthFooter,
  AuthLink,
} from '../components/AuthLayout'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/password-reset/', { email })
      setSent(true)
    } catch (err) {
      setError("Une erreur est survenue. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="mb-3 text-[17.07px] leading-[25.33px] font-normal text-black/[.87]">
          Mot de passe oublié?
        </h1>
        <p className="mb-[40px] text-[14.67px] leading-[22px] text-black/[.6]">
          Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
          instructions sur la façon de modifier votre mot de passe.
        </p>

        <form onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthButton type="submit" disabled={loading} className="mt-[40px]">
            {loading ? 'Envoi...' : 'Envoyer'}
          </AuthButton>

          <AuthError>{error}</AuthError>

          {sent && (
            <p className="mt-4 text-center text-[14px] text-green-700">
              Si un compte existe, un e-mail a été envoyé.
            </p>
          )}
        </form>
      </AuthCard>

      <AuthFooter>
        <p className="text-white/[.87]">
          Revenir à la <AuthLink to="/" bold>connexion</AuthLink>
        </p>
      </AuthFooter>
    </AuthLayout>
  )
}

export default ForgotPassword
