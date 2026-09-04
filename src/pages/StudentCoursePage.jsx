import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Download, FileText, PlayCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import StudentShell from '../components/StudentShell';
import { useAuth } from '../context/AuthContext';
import { getAttachmentDownloadUrl, getCompletedLessonIds, hasPurchased, markLessonComplete, subscribeFormationBySlug, subscribeFormationLessons, subscribeFormationProgress, subscribeStudentProfile } from '../lib/studentArea';

function attachmentLabel(attachment) {
  return typeof attachment === 'string' ? attachment.split('/').pop() : attachment?.nombre || attachment?.name || 'Material descargable';
}

export default function StudentCoursePage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [materialError, setMaterialError] = useState('');
  const [completeBusy, setCompleteBusy] = useState(false);

  useEffect(() => subscribeStudentProfile(user.uid, setProfile, (profileError) => setError(profileError.message)), [user.uid]);
  useEffect(() => subscribeFormationBySlug(slug, setFormation, (formationError) => { setError(formationError.message); setLoading(false); }), [slug]);
  useEffect(() => { if (!formation) return undefined; if (!hasPurchased(profile, formation.id)) { setLoading(false); return undefined; } return subscribeFormationLessons(formation.id, (nextLessons) => { setLessons(nextLessons); setSelectedLessonId((current) => current || nextLessons[0]?.id || ''); setLoading(false); }, (lessonsError) => { setError(lessonsError.message); setLoading(false); }); }, [formation, profile]);
  useEffect(() => { if (!formation || !hasPurchased(profile, formation.id)) return undefined; return subscribeFormationProgress(user.uid, formation.id, setProgress, (progressError) => setError(progressError.message)); }, [formation, profile, user.uid]);
  useEffect(() => { if (formation && profile && !hasPurchased(profile, formation.id)) navigate('/alumnos/formaciones', { replace: true }); }, [formation, navigate, profile]);

  const selectedLesson = useMemo(() => lessons.find((lesson) => lesson.id === selectedLessonId) || lessons[0], [lessons, selectedLessonId]);
  const completedIds = getCompletedLessonIds(progress);
  const percentage = lessons.length ? Math.round((completedIds.filter((id) => lessons.some((lesson) => lesson.id === id)).length / lessons.length) * 100) : 0;

  const completeLesson = async () => {
    if (!selectedLesson || completedIds.includes(selectedLesson.id)) return;
    setCompleteBusy(true);
    try { await markLessonComplete(user.uid, formation.id, selectedLesson.id); } catch (completeError) { setError(completeError.message); } finally { setCompleteBusy(false); }
  };

  const openAttachment = async (attachment) => {
    const path = typeof attachment === 'string' ? attachment : attachment?.storagePath || attachment?.path;
    if (!path) return;
    setMaterialError('');
    try { const url = await getAttachmentDownloadUrl(path); window.open(url, '_blank', 'noopener,noreferrer'); } catch { setMaterialError('No hemos podido abrir este material.'); }
  };

  if (loading) return <div className="student-app"><div className="student-loader" role="status">Abriendo tu formación…</div></div>;
  if (error && !formation) return <StudentShell><div className="student-alert student-alert--error" role="alert">No hemos podido abrir esta formación.</div></StudentShell>;
  if (!formation) return <StudentShell><div className="student-empty">Esta formación ya no está disponible.</div></StudentShell>;

  return <StudentShell eyebrow="Aula de formación"><Seo title={`${formation.nombre} | Área de alumnas Patricia Songel`} description={formation.descripcionCorta || 'Formación profesional de Patricia Songel.'} canonical={`https://www.patriciasongel.es/alumnos/formaciones/${formation.slug}`} robots="noindex, nofollow" /><Link to="/alumnos/formaciones" className="student-back-link"><ArrowLeft size={15} aria-hidden="true" /> Volver a mis formaciones</Link><div className="student-course-layout"><aside className="student-course-sidebar" aria-label="Índice de la formación"><p className="student-course-sidebar__title">Índice de contenidos</p><select className="student-course-select" value={selectedLesson?.id || ''} onChange={(event) => setSelectedLessonId(event.target.value)} aria-label="Seleccionar apartado">{lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.titulo}</option>)}</select><div className="student-lesson-list">{lessons.map((lesson, index) => <button key={lesson.id} type="button" className={`student-lesson-link ${selectedLesson?.id === lesson.id ? 'is-active' : ''} ${completedIds.includes(lesson.id) ? 'is-complete' : ''}`} onClick={() => setSelectedLessonId(lesson.id)}>{String(index + 1).padStart(2, '0')} · {lesson.titulo}</button>)}</div><div className="student-progress"><div className="student-progress__label"><span>Progreso</span><strong>{percentage}%</strong></div><div className="student-progress__bar"><span style={{ width: `${percentage}%` }} /></div></div></aside><main className="student-course-main"><header className="student-course-main__header"><p className="student-eyebrow">Formación completa</p><h1>{formation.nombre}</h1><p>{formation.descripcionCorta}</p></header>{error && <div className="student-alert student-alert--error" role="alert">No hemos podido guardar o cargar el progreso en este momento.</div>}{selectedLesson ? <article className="student-lesson"><h2>{selectedLesson.titulo}</h2>{selectedLesson.videoProvider === 'youtube' && selectedLesson.videoId && <div className="student-video"><iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(selectedLesson.videoId)}`} title={`Vídeo: ${selectedLesson.titulo}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>}{selectedLesson.videoProvider && selectedLesson.videoProvider !== 'youtube' && <div className="student-alert student-alert--info"><PlayCircle size={16} aria-hidden="true" /> Este vídeo se publicará próximamente.</div>}<div className="student-prose"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{selectedLesson.contenidoMd || selectedLesson.contenido || ''}</ReactMarkdown></div>{Array.isArray(selectedLesson.adjuntos) && selectedLesson.adjuntos.length > 0 && <div className="student-attachments"><p className="student-course-sidebar__title">Materiales</p>{selectedLesson.adjuntos.map((attachment, index) => <button key={`${attachmentLabel(attachment)}-${index}`} className="student-attachment" type="button" onClick={() => openAttachment(attachment)}><FileText size={15} aria-hidden="true" />{attachmentLabel(attachment)}<Download size={14} aria-hidden="true" /></button>)}</div>}{materialError && <div className="student-form-error" role="alert">{materialError}</div>}<button type="button" className="student-button student-button--gold student-mark-complete" onClick={completeLesson} disabled={completeBusy || completedIds.includes(selectedLesson.id)}>{completedIds.includes(selectedLesson.id) ? <><Check size={16} aria-hidden="true" /> Apartado completado</> : completeBusy ? 'Guardando…' : 'Marcar como completado'}</button></article> : <div className="student-empty">Esta formación todavía no tiene apartados publicados.</div>}</main></div></StudentShell>;
}
