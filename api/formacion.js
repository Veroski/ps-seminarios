const FORMATIONS = {
  micropigmentacion: { title: 'Formación 4 técnicas', tag: 'lead-micropigmentacion', required: ['experiencia', 'inversion'] },
  glowlips: { title: 'Glow Lips', tag: 'lead-glowlips', required: ['activa', 'inversion'] },
  hairstrokes: { title: 'Hairstrokes Masterclass', tag: 'lead-hairstrokes', required: ['activa', 'inversion'] },
  'cejas-online': { title: 'Cejas Online', tag: 'lista-espera-cejas-online', online: true, required: ['experiencia'] },
  'labios-online': { title: 'Labios Online', tag: 'lista-espera-labios-online', online: true, required: ['experiencia'] },
};

const clean = (value, max = 200) => String(value ?? '').trim().slice(0, max);

export function validateFormationLead(body = {}) {
  const formation = FORMATIONS[clean(body.formacion)];
  const lead = {
    nombre: clean(body.nombre),
    email: clean(body.email),
    telefono: clean(body.telefono, 40),
    activa: clean(body.activa),
    tecnica: clean(body.tecnica),
    experiencia: clean(body.experiencia),
    inversion: clean(body.inversion),
    mensaje: clean(body.mensaje, 2000),
  };

  const phoneDigits = lead.telefono.replace(/\D/g, '');
  if (!formation || !lead.nombre || !/^\S+@\S+\.\S+$/.test(lead.email) || phoneDigits.length < 9 || phoneDigits.length > 15 || formation.required.some((field) => !lead[field])) {
    return null;
  }

  return { ...lead, formation };
}

function normalizePhone(raw) {
  const digits = raw.replace(/\D/g, '');
  if (raw.trim().startsWith('+')) return `+${digits}`;
  if (digits.startsWith('0034')) return `+34${digits.slice(4)}`;
  if (digits.startsWith('34')) return `+${digits}`;
  return `+34${digits}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!process.env.GHL_PRIVATE_KEY || !process.env.GHL_LOCATION_ID) return res.status(500).json({ ok: false, error: 'Missing GHL credentials' });

  const data = validateFormationLead(req.body);
  if (!data) return res.status(400).json({ ok: false, error: 'Invalid form data' });

  const [firstName, ...lastNameParts] = data.nombre.split(/\s+/);
  const headers = {
    Authorization: `Bearer ${process.env.GHL_PRIVATE_KEY}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  };
  const payload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName: lastNameParts.join(' ') || '.',
    name: data.nombre,
    email: data.email,
    phone: normalizePhone(data.telefono),
    source: data.formation.online ? `Lista de espera · ${data.formation.title}` : `Formación · ${data.formation.title}`,
    tags: ['lead-formacion', data.formation.tag, ...(data.formation.online ? ['lista-espera-online'] : [])],
  };

  const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!ghlResponse.ok) {
    console.error('GHL formación error:', ghlResponse.status, await ghlResponse.text());
    return res.status(502).json({ ok: false, error: 'CRM request failed' });
  }

  const contact = await ghlResponse.json().catch(() => ({}));
  const note = [
    `Formación: ${data.formation.title}`,
    data.activa && `Practica actualmente: ${data.activa}`,
    data.tecnica && `Técnica de labios: ${data.tecnica}`,
    `Experiencia: ${data.experiencia}`,
    data.inversion && `Inversión: ${data.inversion}`,
    data.mensaje && `Mensaje: ${data.mensaje}`,
  ].filter(Boolean).join(' | ');

  if (contact?.contact?.id) {
    try {
      await fetch(`https://services.leadconnectorhq.com/contacts/${contact.contact.id}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body: note }),
      });
    } catch (error) {
      console.error('GHL formación note error:', error);
    }
  }

  return res.status(200).json({ ok: true });
}
