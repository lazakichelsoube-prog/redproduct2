// Kit de composants pour les pages d'authentification
// (Login, Register, ForgotPassword, ResetPassword).
// Toutes les valeurs (px, couleurs, polices) viennent du SVG de la maquette « Se connecter ».
//
// Exemple d'utilisation :
//
// <AuthLayout>
//   <AuthCard title="Connectez-vous en tant que Admin">
//     <form onSubmit={handleSubmit}>
//       <div className="flex flex-col gap-[56px]">
//         <AuthInput type="email" placeholder="E-mail" value={email} onChange={...} />
//         <AuthInput type="password" placeholder="Mot de passe" value={password} onChange={...} />
//       </div>
//       <AuthCheckbox label="Gardez-moi connecté" className="mt-[33.33px]" />
//       <AuthButton type="submit" className="mt-[34.67px]">Se connecter</AuthButton>
//       <AuthError>{error}</AuthError>
//     </form>
//   </AuthCard>
//   <AuthFooter>
//     <p><AuthLink to="/forgot-password">Mot de passe oublié?</AuthLink></p>
//     <p className="mt-[27.33px] text-white/[.87]">
//       Vous n'avez pas de compte? <AuthLink to="/register" bold>S'inscrire</AuthLink>
//     </p>
//   </AuthFooter>
// </AuthLayout>

import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import RedLogo from './RedLogo';
import AuthBackground from './AuthBackground';

// Fond gris (même couleur que la sidebar du Dashboard) avec un motif dessiné en SVG,
// puis logo centré et contenu de la page.
export default function AuthLayout({ children }) {
  return (
    <div
      style={{ fontFamily: 'Roboto, sans-serif' }}
      className="relative min-h-screen overflow-hidden bg-[#565b5f]"
    >
      <AuthBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-10 pt-[clamp(24px,13.8vh,149px)]">
        <div className="flex items-center gap-[22px] mb-[46.67px]">
          <RedLogo />
          <span className="relative top-[1.5px] text-[26.67px] leading-[26.67px] font-bold text-white/[.87]">
            RED PRODUCT
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

// Carte blanche de 384 px avec son titre.
export function AuthCard({ title, children }) {
  return (
    <div className="w-full max-w-[384px] rounded-[4px] bg-white p-8 shadow-[0_-1.33px_0_rgba(0,0,0,0.02),0_1.33px_2.67px_rgba(0,0,0,0.1)]">
      {title && (
        <h1 className="mb-[45.6px] text-[17.07px] leading-[25.33px] font-normal text-black/[.87]">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}

// Champ sans fond, avec seulement une fine ligne grise dessous.
export const AuthInput = forwardRef(function AuthInput({ className = '', ...props }, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={[
        'block w-full h-[45.33px] rounded-none bg-transparent px-0 pt-0 pb-3',
        'border-0 border-b-[1.33px] border-[rgba(160,160,160,0.2)] focus:border-black/30',
        'text-[18.67px] text-black/[.87] placeholder:text-black/[.435] outline-none',
        // neutralise le fond bleu du remplissage automatique du navigateur
        '[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:rgba(0,0,0,0.87)]',
        className,
      ].join(' ')}
    />
  );
});

// Case à cocher de 24 px, bordure grise.
export function AuthCheckbox({ label, className = '', ...props }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-[13.33px] text-[18.67px] text-black/[.87] ${className}`}
    >
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[2.67px] border-[2.67px] border-[#9E9E9E] peer-checked:border-[#45484B] peer-checked:bg-[#45484B] peer-focus-visible:ring-2 peer-focus-visible:ring-[#FFD964] [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      {label}
    </label>
  );
}

// Bouton gris #45484B, texte blanc.
export function AuthButton({ className = '', ...props }) {
  return (
    <button
      {...props}
      className={`block h-[50.67px] w-full rounded-[5.33px] bg-[#45484B] text-[21.33px] font-medium text-white transition-colors hover:bg-[#3a3d40] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    />
  );
}

// Message d'erreur (n'affiche rien s'il est vide).
export function AuthError({ children }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-4 text-center text-[14px] text-[#D32F2F]">
      {children}
    </p>
  );
}

// Zone de liens sous la carte.
export function AuthFooter({ children }) {
  return (
    <div className="mt-[22.67px] text-center text-[18.67px] leading-[21.87px]">{children}</div>
  );
}

// Lien jaune #FFD964 (medium par défaut, gras avec `bold`).
export function AuthLink({ to, bold = false, children }) {
  return (
    <Link
      to={to}
      className={`${bold ? 'font-bold' : 'font-medium'} text-[#FFD964] hover:underline`}
    >
      {children}
    </Link>
  );
}
