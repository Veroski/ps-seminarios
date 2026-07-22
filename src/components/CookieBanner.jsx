import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Shield, BarChart2, Target, Zap } from 'lucide-react';

const COOKIE_KEY = 'ps_cookie_consent';

const defaultPrefs = {
  vercel: false,
  google: false,
  meta: false,
};

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${checked ? 'bg-[#0A0A0A]' : 'bg-[#F3EDE2]/20'}
      `}
      style={{ border: '1px solid rgba(250,248,245,0.15)' }}
    >
      <span
        className={`
          inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-300
          ${checked ? 'translate-x-4' : 'translate-x-0.5'}
        `}
      />
    </button>
  );
}

const services = [
  {
    key: 'forms',
    icon: Shield,
    label: 'Cookies de formularios',
    desc: 'Necesarias para el envío de formularios de contacto e inscripción. No pueden desactivarse.',
    required: true,
  },
  {
    key: 'vercel',
    icon: Zap,
    label: 'Vercel Analytics',
    desc: 'Métricas de rendimiento y análisis de visitas anónimas para mejorar la experiencia del sitio.',
    required: false,
  },
  {
    key: 'google',
    icon: BarChart2,
    label: 'Google Analytics',
    desc: 'Análisis estadístico de navegación para entender el comportamiento de los usuarios en el sitio.',
    required: false,
  },
  {
    key: 'meta',
    icon: Target,
    label: 'Meta Pixel',
    desc: 'Seguimiento de conversiones y publicidad personalizada en plataformas de Facebook e Instagram.',
    required: false,
  },
];

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('banner'); // 'banner' | 'manage'
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      // Small delay so the page loads first
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (newPrefs) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ ts: Date.now(), prefs: newPrefs }));
    setVisible(false);
  };

  const acceptAll = () => save({ vercel: true, google: true, meta: true });
  const rejectAll = () => save(defaultPrefs);
  const savePrefs = () => save(prefs);

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  if (!visible) return null;

  return (
    <>
      {/* Backdrop on manage mode */}
      {mode === 'manage' && (
        <div
          className="fixed inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm z-[9998]"
          onClick={() => setMode('banner')}
        />
      )}

      <div
        className={`
          fixed z-[9999] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${mode === 'manage'
            ? 'inset-0 flex items-end sm:items-center justify-center p-4 sm:p-6'
            : 'bottom-0 left-0 right-0 flex justify-center px-4 pb-4 sm:pb-6'}
        `}
      >
        <div
          className={`
            relative bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#F3EDE2]/8
            transition-all duration-500
            ${mode === 'manage'
              ? 'w-full max-w-lg max-h-[90vh] overflow-y-auto'
              : 'w-full max-w-2xl'}
          `}
          style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(250,248,245,0.06)' }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[radial-gradient(ellipse,rgba(10,10,10,0.08)_0%,transparent_70%)] pointer-events-none" />

          {mode === 'banner' ? (
            <div className="relative p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-[#F3EDE2] mb-2" style={{ letterSpacing: '0.16em' }}>COOKIES</p>
                <p className="font-sans text-sm text-[#F3EDE2]/80 leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
                  Usamos cookies propias (necesarias) y de terceros (analíticas y publicitarias). Puedes aceptarlas todas, rechazar las opcionales o gestionar tus preferencias.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-row sm:flex-col gap-2.5 flex-shrink-0 sm:min-w-[140px]">
                <button
                  onClick={acceptAll}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#F3EDE2] text-[#0A0A0A] font-sans font-semibold text-xs hover:bg-white transition-colors duration-200"
                  style={{ letterSpacing: '0.04em' }}
                >
                  Aceptar todo
                </button>
                <button
                  onClick={() => setMode('manage')}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#F3EDE2]/15 text-[#F3EDE2]/60 font-sans font-medium text-xs hover:border-[#F3EDE2]/30 hover:text-[#F3EDE2]/80 transition-colors duration-200"
                  style={{ letterSpacing: '0.04em' }}
                >
                  Gestionar
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-[#F3EDE2]/35 font-sans font-medium text-xs hover:text-[#F3EDE2]/55 transition-colors duration-200"
                  style={{ letterSpacing: '0.04em' }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ) : (
            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-mono text-xs text-[#F3EDE2] mb-1.5" style={{ letterSpacing: '0.16em' }}>GESTIÓN DE COOKIES</p>
                  <h3 className="font-serif italic text-xl text-[#F3EDE2]" style={{ letterSpacing: '-0.02em' }}>Tus preferencias</h3>
                </div>
                <button
                  onClick={() => setMode('banner')}
                  className="text-[#F3EDE2]/30 hover:text-[#F3EDE2]/60 transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="font-sans text-xs text-[#F3EDE2]/50 mb-6 leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
                Puedes activar o desactivar cada tipo de cookie. Las marcadas como obligatorias no pueden desactivarse ya que son necesarias para el funcionamiento del sitio.
              </p>

              {/* Service toggles */}
              <div className="space-y-2 mb-8">
                {services.map(({ key, icon: Icon, label, desc, required }) => (
                  <div
                    key={key}
                    className="rounded-xl border border-[#F3EDE2]/8 overflow-hidden"
                  >
                    <div
                      className={`flex items-center gap-4 p-4 ${!required ? 'cursor-pointer hover:bg-[#F3EDE2]/3 transition-colors' : ''}`}
                      onClick={() => !required && setExpanded(expanded === key ? null : key)}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#F3EDE2]/6 flex items-center justify-center flex-shrink-0">
                        <Icon size={13} className={required ? 'text-[#F3EDE2]' : 'text-[#F3EDE2]/40'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs font-medium text-[#F3EDE2]/85" style={{ letterSpacing: '-0.01em' }}>{label}</span>
                          {required && (
                            <span className="font-mono text-[10px] text-[#F3EDE2]/70 bg-[#F3EDE2]/10 px-2 py-0.5 rounded-full" style={{ letterSpacing: '0.08em' }}>obligatoria</span>
                          )}
                        </div>
                        {expanded !== key && (
                          <p className="font-sans text-xs text-[#F3EDE2]/35 mt-0.5 truncate" style={{ letterSpacing: '-0.01em' }}>{desc}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Toggle
                          checked={required ? true : prefs[key]}
                          onChange={() => toggle(key)}
                          disabled={required}
                        />
                        {!required && (
                          <span className="text-[#F3EDE2]/20">
                            {expanded === key ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {expanded === key && !required && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="border-t border-[#F3EDE2]/6 pt-3">
                          <p className="font-sans text-xs text-[#F3EDE2]/45 leading-relaxed" style={{ letterSpacing: '-0.01em' }}>{desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={savePrefs}
                  className="flex-1 px-5 py-3 rounded-full bg-[#F3EDE2] text-[#0A0A0A] font-sans font-semibold text-xs hover:bg-white transition-colors duration-200"
                  style={{ letterSpacing: '0.04em' }}
                >
                  Guardar preferencias
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-5 py-3 rounded-full border border-[#F3EDE2]/15 text-[#F3EDE2]/60 font-sans font-medium text-xs hover:border-[#F3EDE2]/30 hover:text-[#F3EDE2]/80 transition-colors duration-200"
                  style={{ letterSpacing: '0.04em' }}
                >
                  Aceptar todas
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 px-5 py-3 rounded-full text-[#F3EDE2]/35 font-sans font-medium text-xs hover:text-[#F3EDE2]/55 transition-colors duration-200"
                  style={{ letterSpacing: '0.04em' }}
                >
                  Rechazar opcionales
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
