import React from 'react';
import { LogOut, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentAreaConfig } from '../config/studentArea';

export default function StudentShell({ children, eyebrow = 'Área privada' }) {
  const { user, logout } = useAuth();
  return <div className="student-app"><header className="student-topbar"><Link to={studentAreaConfig.coursesPath} className="student-brand" aria-label="Área de alumnas, inicio"><span className="student-brand__mark">PS</span><span><small>Patricia Songel</small><strong>{eyebrow}</strong></span></Link><div className="student-topbar__actions"><span className="student-user" title={user?.email || ''}>{user?.displayName || user?.email}</span><button type="button" className="student-button student-button--quiet" onClick={logout}><LogOut size={16} aria-hidden="true" /><span className="student-hide-mobile">Salir</span></button></div></header><div className="student-shell-content">{children}</div><footer className="student-footer"><span><ShieldCheck size={14} aria-hidden="true" /> Contenido protegido para alumnas</span><span>Patricia Songel · Formación profesional</span></footer></div>;
}
