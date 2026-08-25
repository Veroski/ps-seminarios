export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!process.env.GHL_PRIVATE_KEY || !process.env.GHL_LOCATION_ID) {
    return res.status(500).json({ ok: false, error: 'Missing GHL credentials' });
  }

  const data = req.body || {};

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

  // Compose an appointment note from the free-form booking fields.
  const notaCita = [
    data.formacion ? `Formación: ${data.formacion}` : null,
    data.tratamiento ? `Tratamiento: ${data.tratamiento}` : null,
    data.dia ? `Día preferido: ${data.dia}` : null,
    data.hora ? `Hora preferida: ${data.hora}` : null,
    data.mensaje ? `Mensaje: ${data.mensaje}` : null,
  ].filter(Boolean).join(' | ');

  const initiationTag = data.formacion === 'Hairstrokes Iniciación' ? 'lead-hairstrokes-iniciacion' : null;

  const payload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    name: data.nombre,
    phone: normalizePhone(data.telefono),
    source: 'Pedir cita — Micropigmentacion',
    tags: ['lead-cita', ...(initiationTag ? [initiationTag] : []), data.tratamiento ? `tratamiento-${String(data.tratamiento).toLowerCase()}` : 'tratamiento-consulta'],
  };

  const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    console.error('GHL cita error:', ghlRes.status, detail);
    return res.status(ghlRes.status).json({ ok: false, detail });
  }

  const contact = await ghlRes.json().catch(() => ({}));
  const contactId = contact?.contact?.id;

  // Best-effort: attach the booking details as a note (never blocks success).
  if (contactId && notaCita) {
    try {
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body: notaCita }),
      });
    } catch (e) {
      console.error('GHL cita note error:', e);
    }
  }

  return res.status(200).json({ ok: true });
}
