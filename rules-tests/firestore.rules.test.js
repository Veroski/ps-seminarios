import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterAll, afterEach, beforeAll, describe, it } from 'vitest';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const rules = readFileSync(resolve(globalThis.process.cwd(), 'firestore.rules'), 'utf8');
let testEnv;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({ projectId: 'ps-seminarios-rules-test', firestore: { rules } });
});

afterEach(async () => testEnv.clearFirestore());
afterAll(async () => testEnv.cleanup());

async function seed() {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const firestore = context.firestore();
    await setDoc(doc(firestore, 'formaciones/micro'), { nombre: 'Micro', publicada: true, slug: 'micro' });
    await setDoc(doc(firestore, 'formaciones/micro/apartados/intro'), { titulo: 'Intro', orden: 1, contenidoMd: '# Intro' });
    await setDoc(doc(firestore, 'formaciones/private'), { nombre: 'Private', publicada: false, slug: 'private' });
    await setDoc(doc(firestore, 'usuarios/student-1'), { nombre: 'Student', email: 'student@example.com', productosComprados: ['micro'] });
  });
}

describe('Firestore access policy', () => {
  it('allows public published formations but not unpublished formations', async () => {
    await seed();
    const guest = testEnv.unauthenticatedContext().firestore();
    const student = testEnv.authenticatedContext('student-1').firestore();
    await assertSucceeds(getDoc(doc(guest, 'formaciones/micro')));
    await assertFails(getDoc(doc(guest, 'formaciones/private')));
    await assertFails(getDoc(doc(student, 'formaciones/private')));
  });

  it('only allows lesson reads when the user owns the formation', async () => {
    await seed();
    const guest = testEnv.unauthenticatedContext().firestore();
    const student = testEnv.authenticatedContext('student-1').firestore();
    const otherStudent = testEnv.authenticatedContext('student-2').firestore();
    await assertFails(getDoc(doc(guest, 'formaciones/micro/apartados/intro')));
    await assertSucceeds(getDoc(doc(student, 'formaciones/micro/apartados/intro')));
    await assertFails(getDoc(doc(otherStudent, 'formaciones/micro/apartados/intro')));
  });

  it('blocks client changes to purchases and CRM fields', async () => {
    await seed();
    const student = testEnv.authenticatedContext('student-1').firestore();
    await assertFails(setDoc(doc(student, 'usuarios/student-1'), { productosComprados: ['private'] }, { merge: true }));
    await assertFails(setDoc(doc(student, 'usuarios/student-1'), { crm: { tag: 'vip' } }, { merge: true }));
  });

  it('allows only the owner to read and write their progress', async () => {
    await seed();
    const student = testEnv.authenticatedContext('student-1').firestore();
    const otherStudent = testEnv.authenticatedContext('student-2').firestore();
    await assertSucceeds(setDoc(doc(student, 'usuarios/student-1/progreso/micro'), { leccionesCompletadas: ['intro'] }));
    await assertSucceeds(getDoc(doc(student, 'usuarios/student-1/progreso/micro')));
    await assertFails(getDoc(doc(otherStudent, 'usuarios/student-1/progreso/micro')));
    await assertFails(setDoc(doc(otherStudent, 'usuarios/student-1/progreso/micro'), { leccionesCompletadas: [] }));
  });
});
