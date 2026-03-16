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

  const headers = {
    Authorization: `Bearer ${process.env.GHL_PRIVATE_KEY}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  };

  // 1. Obtener IDs reales de los custom fields del location
  const cfRes = await fetch(
    `https://services.leadconnectorhq.com/locations/${process.env.GHL_LOCATION_ID}/customFields`,
    { headers }
  );
  const cfData = await cfRes.json();

  // Construir mapa fieldKey → id (normalizamos quitando el prefijo "contact.")
  const fieldMap = {};
  for (const f of (cfData.customFields || [])) {
    const key = (f.fieldKey || '').replace(/^contact\./, '');
    fieldMap[key] = f.id;
  }

  // 2. Construir customFields solo con los campos que tienen ID
  const customFields = [
    { key: 'experiencia_micropigmentacion', value: data.experiencia },
    { key: 'presupuesto_inversion',         value: data.inversion   },
    { key: 'mensaje_seminario',             value: data.mensaje     },
  ]
    .filter(f => f.value && fieldMap[f.key])
    .map(f => ({ id: fieldMap[f.key], field_value: f.value }));

  // 3. Upsert del contacto
  const payload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    name: data.nombre,
    email: data.email,
    phone: normalizePhone(data.telefono),
    source: 'Landing Micropigmentacion 3.0',
    tags: ['lead-micropigmentacion'],
    customFields,
  };

  const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    console.error('GHL error:', ghlRes.status, detail);
    return res.status(ghlRes.status).json({ ok: false, detail });
  }

  return res.status(200).json({ ok: true });
}
