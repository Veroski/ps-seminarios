import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import admin from 'firebase-admin';

const seedRoot = path.resolve(process.env.SEED_DIR || 'seed/formaciones');
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
const formationArg = process.argv.find((argument) => argument.startsWith('--formation='));
const requestedFormation = formationArg?.slice('--formation='.length) || process.env.SEED_FORMATION || 'micropigmentacion';

if (!serviceAccount && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('Define FIREBASE_SERVICE_ACCOUNT o GOOGLE_APPLICATION_CREDENTIALS antes de ejecutar la seed.');
}

const app = admin.apps.length ? admin.app() : admin.initializeApp(serviceAccount ? { credential: admin.credential.cert(JSON.parse(serviceAccount)) } : undefined);
const db = admin.firestore(app);
const apply = process.argv.includes('--apply');

const FORMATION_CONTENT_FIELDS = ['nombre', 'slug', 'descripcionCorta', 'imagenPortada', 'orden'];
const PROTECTED_FORMATION_FIELDS = ['precioCentimos', 'moneda', 'stripePriceId', 'publicada'];

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

function validateCourse(course, folderName) {
  if (course.id !== folderName) throw new Error(`El id de ${folderName} debe coincidir con el nombre de la carpeta.`);
  if (!course.nombre || !course.slug || !course.descripcionCorta) throw new Error(`${folderName}/course.json necesita nombre, slug y descripcionCorta.`);
  if (!Array.isArray(course.lessons) || course.lessons.length === 0) throw new Error(`${folderName}/course.json necesita lessons.`);

  const ids = new Set();
  const orders = new Set();
  for (const lesson of course.lessons) {
    if (!lesson.id || !lesson.titulo || !lesson.seccion || !Number.isInteger(lesson.orden)) {
      throw new Error(`Cada apartado de ${folderName} necesita id, titulo, seccion y orden entero.`);
    }
    if (ids.has(lesson.id) || orders.has(lesson.orden)) throw new Error(`Hay ids u órdenes repetidos en ${folderName}.`);
    if (lesson.videoProvider === 'youtube' && !lesson.videoId) throw new Error(`Falta videoId en ${folderName}/${lesson.id}.`);
    ids.add(lesson.id);
    orders.add(lesson.orden);
  }
}

const courseFolders = (await readdir(seedRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory() && entry.name === requestedFormation);
if (courseFolders.length === 0) throw new Error(`No existe contenido local para ${requestedFormation}.`);
for (const courseFolder of courseFolders) {
  const coursePath = path.join(seedRoot, courseFolder.name);
  const course = await readJson(path.join(coursePath, 'course.json'));
  validateCourse(course, courseFolder.name);
  const courseRef = db.collection('formaciones').doc(course.id || courseFolder.name);
  const existingCourse = await courseRef.get();
  if (!existingCourse.exists) throw new Error(`La formación ${course.id} no existe. Este cargador no crea ofertas comerciales.`);

  for (const field of PROTECTED_FORMATION_FIELDS) {
    if (Object.hasOwn(course, field) && JSON.stringify(course[field]) !== JSON.stringify(existingCourse.get(field))) {
      throw new Error(`${course.id}: ${field} difiere de Firebase y está protegido.`);
    }
  }

  const courseFields = Object.fromEntries(FORMATION_CONTENT_FIELDS.filter((field) => course[field] !== undefined).map((field) => [field, course[field]]));
  const lessons = [...course.lessons].sort((a, b) => a.orden - b.orden);

  const lessonFolder = path.join(coursePath, 'apartados');
  const lessonFiles = new Map((await readdir(lessonFolder, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => [entry.name.replace(/\.md$/, ''), entry.name]));
  const missingFiles = lessons.filter((lesson) => !lessonFiles.has(lesson.id));
  if (missingFiles.length) throw new Error(`${course.id}: faltan Markdown para ${missingFiles.map((lesson) => lesson.id).join(', ')}.`);

  const unknownFiles = [...lessonFiles.keys()].filter((id) => !lessons.some((lesson) => lesson.id === id));
  if (unknownFiles.length) throw new Error(`${course.id}: hay Markdown sin manifest: ${unknownFiles.join(', ')}.`);

  const existingLessons = await courseRef.collection('apartados').get();
  const staleLessons = existingLessons.docs.map((doc) => doc.id).filter((id) => !lessons.some((lesson) => lesson.id === id));
  console.log(`${apply ? 'Applying' : 'Dry run'} ${courseRef.path}: ${lessons.length} apartados${staleLessons.length ? `; no se borrarán ${staleLessons.length} apartados existentes` : ''}`);

  if (apply) await courseRef.set(courseFields, { merge: true });
  for (const manifest of lessons) {
    const contenidoMd = await readFile(path.join(lessonFolder, lessonFiles.get(manifest.id)), 'utf8');
    const lessonData = {
      titulo: manifest.titulo,
      seccion: manifest.seccion,
      orden: manifest.orden,
      contenidoMd,
      videoProvider: manifest.videoProvider || null,
      videoId: manifest.videoId || null,
      adjuntos: Array.isArray(manifest.adjuntos) ? manifest.adjuntos : [],
    };
    if (apply) await courseRef.collection('apartados').doc(manifest.id).set(lessonData, { merge: true });
  }
}

await app.delete();
