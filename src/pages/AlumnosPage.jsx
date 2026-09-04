import React, { useEffect, useState } from 'react';
import { ArrowRight, Chrome, Mail, RefreshCw } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Seo, { SITE } from '../components/Seo';
import { useAuth } from '../context/AuthContext';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE}/alumnos#webpage`,
  url: `${SITE}/alumnos`,
  name: 'Área de alumnas Patricia Songel',
  description: 'Acceso al área privada de alumnas de las formaciones de Patricia Songel.',
  inLanguage: 'es-ES',
};

function readableAuthError(error) {
  const code = error?.code || '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) return 'El email o la contraseña no son correctos.';
  if (code.includes('email-already-in-use')) return 'Ya existe una cuenta con este email. Prueba a iniciar sesión.';
  if (code.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres.';
  if (code.includes('invalid-email')) return 'Escribe un email válido.';
  if (code.includes('popup-closed')) return 'La ventana de Google se cerró antes de terminar.';
  return error?.message || 'No hemos podido completar la operación. Inténtalo de nuevo.';
}

export default function AlumnosPage({ testing = false }) {
  const { user, loading, configured, login, register, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loading && user) navigate('/alumnos/formaciones', { replace: true });
  }, [loading, navigate, user]);

  const destination = searchParams.get('next') || '/alumnos/formaciones';

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setBusy(true);
    try {
      if (mode === 'recover') {
        await resetPassword(form.email);
        setSuccess('Te hemos enviado un enlace para crear una nueva contraseña.');
      } else if (mode === 'register') {
        await register(form);
        navigate(destination, { replace: true });
      } else {
        await login(form.email, form.password);
        navigate(destination, { replace: true });
      }
    } catch (submitError) {
      setError(readableAuthError(submitError));
    } finally {
      setBusy(false);
    }
  };

  const googleLogin = async () => {
    setError('');
    setBusy(true);
    try {
      await loginWithGoogle();
      navigate(destination, { replace: true });
    } catch (googleError) {
      setError(readableAuthError(googleError));
    } finally {
      setBusy(false);
    }
  };

  if (loading || user) return <div className="student-app"><div className="student-loader" role="status">Preparando tu acceso…</div></div>;

  return (
    <div className="student-app student-auth">
      <Seo
        title="Área de alumnas | Patricia Songel"
        description="Accede al área privada de alumnas de las formaciones de Patricia Songel."
        canonical={`${SITE}/alumnos`}
        robots="noindex, nofollow"
        image={`${SITE}/patricia-portrait.webp`}
        imageAlt="Área de alumnas de Patricia Songel"
        jsonLd={jsonLd}
      />
      <div className="student-auth__visual">
        <Link to="/" className="student-brand" aria-label="Volver a Patricia Songel">
          <span className="student-brand__mark">PS</span>
          <span><small>Patricia Songel</small><strong>Formación profesional</strong></span>
        </Link>
        <div>
          <p className="student-eyebrow">Aula privada · 01</p>
          <h1>Precisión <em>que permanece.</em></h1>
          <p>Un espacio reservado para que puedas volver a tus contenidos, avanzar a tu ritmo y tener tu formación siempre a mano.</p>
        </div>
      </div>
      <div className="student-auth__form">
        <div className="student-auth__panel">
          <p className="student-eyebrow">Área de alumnas</p>
          <h2>{mode === 'recover' ? 'Recupera tu acceso' : mode === 'register' ? 'Crea tu cuenta' : testing ? 'Acceso de pruebas' : 'Bienvenida de nuevo'}</h2>
          <p>{mode === 'recover' ? 'Te enviaremos un enlace seguro a tu email.' : testing ? 'Entra con tu cuenta de prueba o crea una nueva con email y contraseña.' : 'Accede a tus formaciones y continúa donde lo dejaste.'}</p>

          {testing && <div className="student-alert student-alert--info" role="status">Zona interna de pruebas · No compartas este enlace</div>}
          {!configured && <div className="student-alert student-alert--info" role="status">El área está preparada, pero Firebase aún necesita configurarse en el entorno de la web.</div>}
          {error && <div className="student-form-error" role="alert">{error}</div>}
          {success && <div className="student-success" role="status">{success}</div>}

          <form className="student-form" onSubmit={submit}>
            {mode === 'register' && <div className="student-field"><label htmlFor="student-name">Nombre</label><input id="student-name" className="student-input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" required /></div>}
            <div className="student-field"><label htmlFor="student-email">Email</label><input id="student-email" className="student-input" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" required /></div>
            {mode !== 'recover' && <div className="student-field"><label htmlFor="student-password">Contraseña</label><input id="student-password" className="student-input" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} minLength={6} required /></div>}
            <button className="student-button student-button--primary" type="submit" disabled={busy || !configured}>{busy ? <RefreshCw size={16} className="student-spin" aria-hidden="true" /> : <Mail size={16} aria-hidden="true" />}{mode === 'recover' ? 'Enviar enlace' : mode === 'register' ? 'Crear cuenta' : 'Entrar'}</button>
          </form>

          {mode !== 'recover' && <><div className="student-divider">o continúa con</div><button className="student-button student-button--quiet" type="button" onClick={googleLogin} disabled={busy || !configured}><Chrome size={16} aria-hidden="true" /> Continuar con Google</button></>}

          <p className="student-auth__switch">
            {mode === 'recover' ? <button type="button" className="student-link" onClick={() => { setMode('login'); setError(''); setSuccess(''); }}>Volver a iniciar sesión</button> : <>{mode === 'login' ? '¿Aún no tienes cuenta? ' : '¿Ya tienes cuenta? '}<button type="button" className="student-link" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>{mode === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}</button>{mode === 'login' && <><br /><button type="button" className="student-link" onClick={() => { setMode('recover'); setError(''); }}>He olvidado mi contraseña</button></>}</>}
          </p>
          <Link to="/formaciones" className="student-auth__back-link">Ver formaciones públicas <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  );
}
