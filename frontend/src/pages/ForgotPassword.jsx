import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: brancher sur un vrai endpoint backend plus tard
    setSent(true)
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
        <p className="text-gray-700 font-medium">Mot de passe oublié ?</p>
        <p className="text-gray-500 text-sm">
          Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
          instructions sur la façon de modifier votre mot de passe.
        </p>

        <input
          type="email"
          placeholder="Votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-gray-300 py-2 outline-none focus:border-gray-600"
        />

        {sent && (
          <p className="text-green-600 text-sm">
            Si un compte existe, un e-mail a été envoyé.
          </p>
        )}

        <button
          type="submit"
          className="bg-gray-900 text-white py-2 rounded mt-2 hover:bg-gray-800"
        >
          Envoyer
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

export default ForgotPassword