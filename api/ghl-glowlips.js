export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!process.env.GHL_PRIVATE_KEY || !process.env.GHL_LOCATION_ID) {
    return res.status(500).json({ ok: false, error: 'Missing GHL credentials' });
  }

  const data = req.body;

  const parts = (data.nombre || '').trim().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '.';

  const normalizePhone = (raw = '') => {
    let p = raw.replace(/\s+/g, '').replace(/-/g, '');
    if (p.startsWith('0034')) p = '+34' + p.slice(4);
    if (p.startsWith('34') && !p.startsWith('+')) p = '+' + p;
    if (!p.startsWith('+')) p = '+34' + p;
    return p;
  };

  const payload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    name: data.nombre,
    email: data.email,
    phone: normalizePhone(data.telefono),
    source: 'Landing Glowlips Masterclass',
    tags: ['lead-glowlips'],
    customFields: [
      { key: 'contact.micropig_activa',      value: data.activa    || '' },
      { key: 'contact.tecnica_labios',        value: data.tecnica   || '' },
      { key: 'contact.presupuesto_inversion', value: data.inversion || '' },
      { key: 'contact.mensaje_seminario',     value: data.mensaje   || '' },
    ],
  };

  const isBarato = (data.inversion || '').toLowerCase().includes('menos');
  if (isBarato) payload.tags.push('lead-barato');

  const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GHL_PRIVATE_KEY}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    console.error('GHL error:', ghlRes.status, detail);
    return res.status(ghlRes.status).json({ ok: false, detail });
  }

  return res.status(200).json({ ok: true });
}
