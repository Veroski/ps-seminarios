import { readFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import admin from 'firebase-admin';

const seedRoot = path.resolve(process.env.SEED_DIR || 'seed/formaciones');
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('Define FIREBASE_SERVICE_ACCOUNT o GOOGLE_APPLICATION_CREDENTIALS antes de ejecutar la seed.');
}

const app = admin.apps.length ? admin.app() : admin.initializeApp(serviceAccount ? { credential: admin.credential.cert(JSON.parse(serviceAccount)) } : undefined);
const db = admin.firestore(app);

function headingFromMarkdown(markdown, fallback) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

const courseFolders = (await readdir(seedRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory());
for (const courseFolder of courseFolders) {
  const coursePath = path.join(seedRoot, courseFolder.name);
  const course = await readJson(path.join(coursePath, 'course.json'));
  const courseRef = db.collection('formaciones').doc(course.id || courseFolder.name);
  const { lessons = [], ...courseFields } = course;
  await courseRef.set({ ...courseFields, slug: course.slug || courseFolder.name, creadaEn: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

  const lessonFolder = path.join(coursePath, 'apartados');
  const lessonFiles = (await readdir(lessonFolder, { withFileTypes: true })).filter((entry) => entry.isFile() && entry.name.endsWith('.md')).sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }));
  for (let index = 0; index < lessonFiles.length; index += 1) {
    const file = lessonFiles[index];
    const contenidoMd = await readFile(path.join(lessonFolder, file.name), 'utf8');
    const manifest = lessons[index] || {};
    const lessonId = manifest.id || file.name.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await courseRef.collection('apartados').doc(lessonId).set({
      titulo: manifest.titulo || headingFromMarkdown(contenidoMd, file.name.replace(/\.md$/, '')),
      orden: manifest.orden ?? index + 1,
      contenidoMd,
      videoProvider: manifest.videoProvider || null,
      videoId: manifest.videoId || null,
      adjuntos: manifest.adjuntos || [],
    }, { merge: true });
  }
  console.log(`Seeded ${courseRef.path} (${lessonFiles.length} apartados)`);
}

await app.delete();
