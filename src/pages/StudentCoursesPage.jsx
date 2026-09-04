import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Lock, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import StudentShell from '../components/StudentShell';
import { useAuth } from '../context/AuthContext';
import { createCheckoutSession, hasPurchased, subscribePublishedFormations, subscribeStudentProfile, WITHDRAWAL_CONSENT_TEXT } from '../lib/studentArea';
import { studentAreaConfig } from '../config/studentArea';

function formatPrice(cents, currency = 'EUR') {
  if (typeof cents !== 'number') return 'Precio disponible al comprar';
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(cents / 100);
}

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const [formations, setFormations] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [consent, setConsent] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribePublishedFormations((nextFormations) => { setFormations(nextFormations); setLoading(false); }, (subscribeError) => { setError(subscribeError.message); setLoading(false); });
    return unsubscribe;
  }, []);

  useEffect(() => subscribeStudentProfile(user.uid, setProfile, (profileError) => setError(profileError.message)), [user.uid]);

  const startCheckout = async () => {
    if (!selected || !consent) return;
    setCheckoutBusy(true);
    setCheckoutError('');
    try {
      const url = await createCheckoutSession({ formationId: selected.id, consent });
      window.location.assign(url);
    } catch (checkoutSubmitError) {
      setCheckoutError(checkoutSubmitError.message);
      setCheckoutBusy(false);
    }
  };

  return (
    <StudentShell>
      <Seo title="Mis formaciones | Área de alumnas Patricia Songel" description="Accede a tus formaciones de Patricia Songel." canonical={`${studentAreaConfig.appOrigin}${studentAreaConfig.coursesPath}`} robots="noindex, nofollow" />
      <div className="student-page-header"><div><p className="student-eyebrow">Biblioteca de formación</p><h1 className="student-heading">Tu siguiente nivel <em>empieza aquí.</em></h1><p className="student-lead">Accede a las formaciones que ya tienes disponibles o elige una nueva para ampliar tu técnica.</p></div><p className="student-page-header__side">Contenido organizado por Patricia Songel<br />Actualizado para tu práctica</p></div>
      {error && <div className="student-alert student-alert--error" role="alert">No hemos podido cargar tus formaciones. Comprueba tu conexión y vuelve a intentarlo.</div>}
      {loading && <div className="student-loader" role="status">Cargando formaciones…</div>}
      {!loading && !formations.length && <div className="student-empty">Todavía no hay formaciones publicadas. Volveremos a abrir esta biblioteca muy pronto.</div>}
      <div className="student-grid">
        {formations.map((formation) => {
          const purchased = hasPurchased(profile, formation.id);
          return <article className="student-card student-course-card" key={formation.id}><div className="student-course-card__media"><img src={formation.imagenPortada || '/micro20_banner.webp'} alt="" loading="lazy" />{!purchased && <span className="student-course-card__lock"><Lock size={13} aria-hidden="true" /> Vista previa</span>}</div><div className="student-course-card__body"><p className="student-eyebrow">Formación {String(formation.orden ?? '').padStart(2, '0')}</p><h2>{formation.nombre}</h2><p>{formation.descripcionCorta || 'Contenido profesional, estructurado para avanzar con criterio y precisión.'}</p><div className="student-course-card__meta"><span>{purchased ? 'Disponible' : 'Acceso completo'}</span><strong>{purchased ? <Check size={18} aria-label="Comprada" /> : formatPrice(formation.precioCentimos, formation.moneda)}</strong></div>{purchased ? <Link className="student-button student-button--primary student-course-card__action" to={studentAreaConfig.coursePath(formation.slug)}><span>Continuar formación</span><ArrowRight size={16} aria-hidden="true" /></Link> : <button className="student-button student-button--gold student-course-card__action" type="button" onClick={() => { setSelected(formation); setConsent(false); setCheckoutError(''); }}>Obtener acceso <ArrowRight size={16} aria-hidden="true" /></button>}</div></article>;
        })}
      </div>

      {selected && <div className="student-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><div className="student-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><button type="button" className="student-modal__close" onClick={() => setSelected(null)} aria-label="Cerrar"><X size={18} /></button><p className="student-eyebrow">Acceso seguro · Stripe test</p><h2 id="checkout-title">{selected.nombre}</h2><p>Vas a iniciar el pago seguro por {formatPrice(selected.precioCentimos, selected.moneda)}. La formación quedará asociada a tu cuenta de alumna cuando el pago se confirme.</p><label className="student-consent"><input className="student-checkbox" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> <span>He leído y acepto el acceso inmediato al contenido digital. {WITHDRAWAL_CONSENT_TEXT}</span></label>{checkoutError && <div className="student-alert student-alert--error" role="alert">{checkoutError}</div>}<div className="student-modal__actions"><button className="student-button student-button--quiet" type="button" onClick={() => setSelected(null)}>Cancelar</button><button className="student-button student-button--primary" type="button" onClick={startCheckout} disabled={!consent || checkoutBusy}>{checkoutBusy ? 'Conectando…' : 'Ir al pago'}</button></div><p className="student-modal__legal">Al continuar aceptas también nuestros <a href="https://www.patriciasongel.es/terminos" className="student-link">términos y condiciones</a>.</p></div></div>}
    </StudentShell>
  );
}
