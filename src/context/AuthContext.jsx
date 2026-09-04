import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, firebaseConfigured } from '../lib/firebase';
import { upsertStudentProfile } from '../lib/studentArea';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!auth) {
      return undefined;
    }

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    configured: firebaseConfigured,
    async register({ email, password, name }) {
      if (!auth) throw new Error('Firebase todavía no está configurado.');
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name?.trim()) await updateProfile(credential.user, { displayName: name.trim() });
      await upsertStudentProfile(credential.user, name?.trim());
      return credential.user;
    },
    async login(email, password) {
      if (!auth) throw new Error('Firebase todavía no está configurado.');
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await upsertStudentProfile(credential.user);
      return credential.user;
    },
    async loginWithGoogle() {
      if (!auth) throw new Error('Firebase todavía no está configurado.');
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      await upsertStudentProfile(credential.user);
      return credential.user;
    },
    async resetPassword(email) {
      if (!auth) throw new Error('Firebase todavía no está configurado.');
      await sendPasswordResetEmail(auth, email);
    },
    async logout() {
      if (auth) await signOut(auth);
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider.');
  return context;
}
