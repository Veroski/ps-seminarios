import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import StudentShell from '../components/StudentShell';
import { useAuth } from '../context/AuthContext';
import { hasPurchased, subscribePublishedFormations, subscribeStudentProfile } from '../lib/studentArea';

export default function StudentThankYouPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const formationId = searchParams.get('formacionId');
  const [profile, setProfile] = useState(null);
  const [formations, setFormations] = useState([]);
  useEffect(() => subscribeStudentProfile(user.uid, setProfile, () => undefined), [user.uid]);
  useEffect(() => subscribePublishedFormations(setFormations, () => undefined), []);
  const purchasedFormation = formations.find((formation) => formation.id === formationId && hasPurchased(profile, formation.id));
  return <StudentShell><Seo title="Gracias por tu compra | Área de alumnas Patricia Songel" description="Tu compra se está confirmando." canonical="https://www.patriciasongel.es/alumnos/gracias" robots="noindex, nofollow" /><div className="student-thanks"><CheckCircle2 size={46} color="#C6A75C" aria-hidden="true" /><p className="student-eyebrow">Pago recibido</p><h1>Ya es <em>tuya.</em></h1><p>Estamos confirmando tu acceso. En cuanto Stripe confirme el pago, verás la formación disponible en tu biblioteca. Puedes dejar esta página abierta unos segundos.</p>{purchasedFormation ? <Link className="student-button student-button--primary" to={`/alumnos/formaciones/${purchasedFormation.slug}`}>Empezar formación <ArrowRight size={16} aria-hidden="true" /></Link> : <Link className="student-button student-button--gold" to="/alumnos/formaciones">Ir a mi biblioteca <ArrowRight size={16} aria-hidden="true" /></Link>}</div></StudentShell>;
}
