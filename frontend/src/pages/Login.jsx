import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';
import AuthLayout, {
  AuthCard,
  AuthInput,
  AuthCheckbox,
  AuthButton,
  AuthError,
  AuthFooter,
  AuthLink,
} from '../components/AuthLayout';

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
    <AuthLayout>
      <AuthCard title="Connectez-vous en tant que Admin">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[56px]">
            <AuthInput
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthInput
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <AuthCheckbox label="Gardez-moi connecté" className="mt-[33.33px]" />

          <AuthButton type="submit" className="mt-[34.67px]">
            Se connecter
          </AuthButton>

          <AuthError>{error}</AuthError>
        </form>
      </AuthCard>

      <AuthFooter>
        <p>
          <AuthLink to="/forgot-password">Mot de passe oublié?</AuthLink>
        </p>
        <p className="mt-[27.33px] text-white/[.87]">
          Vous n'avez pas de compte? <AuthLink to="/register" bold>S'inscrire</AuthLink>
        </p>
      </AuthFooter>
    </AuthLayout>
  );
}

export default Login;
