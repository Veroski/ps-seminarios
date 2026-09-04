import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterAll, afterEach, beforeAll, describe, it } from 'vitest';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, setDoc } from 'firebase/firestore';
import { getBytes, ref, uploadString } from 'firebase/storage';

const firestoreRules = readFileSync(resolve(globalThis.process.cwd(), 'firestore.rules'), 'utf8');
const storageRules = readFileSync(resolve(globalThis.process.cwd(), 'storage.rules'), 'utf8');
let testEnv;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({ projectId: 'ps-seminarios-storage-test', firestore: { rules: firestoreRules }, storage: { rules: storageRules } });
});

afterEach(async () => {
  await testEnv.clearFirestore();
  await testEnv.clearStorage();
});

afterAll(async () => testEnv.cleanup());

async function seed() {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'usuarios/student-1'), { productosComprados: ['micro'] });
    await uploadString(ref(context.storage(), 'covers/cover.txt'), 'cover');
    await uploadString(ref(context.storage(), 'formaciones/micro/materiales/guide.txt'), 'guide');
  });
}

describe('Storage access policy', () => {
  it('keeps covers public and course materials restricted to purchasers', async () => {
    await seed();
    const guestStorage = testEnv.unauthenticatedContext().storage();
    const studentStorage = testEnv.authenticatedContext('student-1').storage();
    await assertSucceeds(getBytes(ref(guestStorage, 'covers/cover.txt')));
    await assertFails(getBytes(ref(guestStorage, 'formaciones/micro/materiales/guide.txt')));
    await assertSucceeds(getBytes(ref(studentStorage, 'formaciones/micro/materiales/guide.txt')));
  });
});
