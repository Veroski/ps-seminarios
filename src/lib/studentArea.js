import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { auth, db, requireFirebase, storage } from './firebase';
import { studentAreaConfig } from '../config/studentArea';

const CONSENT_VERSION = '2026-09-03-v1';
export const WITHDRAWAL_CONSENT_TEXT = 'Solicito el acceso inmediato al contenido digital y reconozco que, una vez iniciado el acceso, puedo perder el derecho de desistimiento cuando la ley lo permita.';

function formationData(snapshot) {
  return { id: snapshot.id, ...snapshot.data() };
}

function sortByOrder(items) {
  return items.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

export function subscribePublishedFormations(onData, onError) {
  requireFirebase();
  const formationsQuery = query(collection(db, 'formaciones'), where('publicada', '==', true));
  return onSnapshot(formationsQuery, (snapshot) => onData(sortByOrder(snapshot.docs.map(formationData))), onError);
}

export function subscribeFormationBySlug(slug, onData, onError) {
  requireFirebase();
  const formationQuery = query(collection(db, 'formaciones'), where('slug', '==', slug), where('publicada', '==', true));
  return onSnapshot(formationQuery, (snapshot) => onData(snapshot.docs[0] ? formationData(snapshot.docs[0]) : null), onError);
}

export function subscribeFormationLessons(formationId, onData, onError) {
  requireFirebase();
  const lessonsQuery = query(collection(db, 'formaciones', formationId, 'apartados'), orderBy('orden', 'asc'));
  return onSnapshot(lessonsQuery, (snapshot) => onData(snapshot.docs.map(formationData)), onError);
}

export function subscribeStudentProfile(uid, onData, onError) {
  requireFirebase();
  return onSnapshot(doc(db, 'usuarios', uid), (snapshot) => onData(snapshot.exists() ? snapshot.data() : null), onError);
}

export function subscribeFormationProgress(uid, formationId, onData, onError) {
  requireFirebase();
  return onSnapshot(doc(db, 'usuarios', uid, 'progreso', formationId), (snapshot) => onData(snapshot.exists() ? snapshot.data() : null), onError);
}

export async function upsertStudentProfile(user, name = '') {
  if (!user || !db) return;
  const profileRef = doc(db, 'usuarios', user.uid);
  const profileSnapshot = await getDoc(profileRef);
  const profile = {
    nombre: name || user.displayName || '',
    email: user.email || '',
    ultimoAccesoEn: serverTimestamp(),
  };
  if (!profileSnapshot.exists()) profile.creadoEn = serverTimestamp();
  await setDoc(profileRef, profile, { merge: true });
}

export function hasPurchased(profile, formationId) {
  const purchases = profile?.productosComprados;
  if (!Array.isArray(purchases)) return false;
  return purchases.some((purchase) => (typeof purchase === 'string' ? purchase : purchase?.formacionId) === formationId);
}

export function getCompletedLessonIds(progress) {
  return Array.isArray(progress?.leccionesCompletadas) ? progress.leccionesCompletadas : [];
}

export async function markLessonComplete(uid, formationId, lessonId) {
  requireFirebase();
  await setDoc(doc(db, 'usuarios', uid, 'progreso', formationId), {
    leccionesCompletadas: arrayUnion(lessonId),
    ultimoAccesoEn: serverTimestamp(),
  }, { merge: true });
}

export async function getFormationById(formationId) {
  requireFirebase();
  const snapshot = await getDoc(doc(db, 'formaciones', formationId));
  return snapshot.exists() ? formationData(snapshot) : null;
}

export async function getAttachmentDownloadUrl(storagePath) {
  if (!storage || !storagePath) return '';
  return getDownloadURL(ref(storage, storagePath));
}

export async function createCheckoutSession({ formationId, consent }) {
  requireFirebase();
  if (!studentAreaConfig.checkoutEndpoint) throw new Error('El checkout todavía no está configurado.');
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(studentAreaConfig.checkoutEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      formacionId: formationId,
      consentimiento: {
        texto: WITHDRAWAL_CONSENT_TEXT,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        aceptado: Boolean(consent),
      },
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.url) throw new Error(payload.error || 'No se pudo iniciar el pago.');
  return payload.url;
}
