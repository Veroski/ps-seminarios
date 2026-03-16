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

  const payload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    name: data.nombre,
    email: data.email,
    phone: data.telefono,
    source: 'Landing Glowlips Masterclass',
    tags: ['lead-glowlips'],
    customFields: [
      { key: 'contact.micropig_activa',      field_value: data.activa    || '' },
      { key: 'contact.tecnica_labios',        field_value: data.tecnica   || '' },
      { key: 'contact.presupuesto_inversion', field_value: data.inversion || '' },
      { key: 'contact.mensaje_seminario',     field_value: data.mensaje   || '' },
    ],
  };

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
