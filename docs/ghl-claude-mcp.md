# GoHighLevel + Claude Code via MCP

GHL tiene un servidor MCP oficial. Esto permite que Claude Code opere directamente
tu CRM — leer contactos, crear oportunidades, mover leads por el pipeline, etc. —
sin salir de la terminal.

---

## Opción 1 — Servidor oficial de GHL (recomendado)

Es el más simple: solo un enlace, sin instalar nada.

### Paso 1 — Credenciales

**Private Integration Token (PIT)**
1. GHL → `Settings → Integrations → Private Integrations`
2. Click `+ New Integration` → dale un nombre (ej. `Claude Code`)
3. Activa los scopes que necesites: Contacts, Opportunities, Calendars, Workflows
4. Copia el token — empieza por `pit-...`

**Location ID**
1. GHL → `Settings → Business Info`
2. O cópialo de la URL del navegador:
   ```
   https://app.gohighlevel.com/location/AQUI_ESTA/settings/...
   ```

### Paso 2 — Añadir a Claude Code

Ejecuta este comando en la terminal (una sola vez):

```bash
claude mcp add gohighlevel \
  --transport http \
  --url "https://services.leadconnectorhq.com/mcp/" \
  --header "Authorization: Bearer pit-TU_TOKEN_AQUI" \
  --header "locationId: TU_LOCATION_ID_AQUI"
```

O añádelo manualmente en `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "gohighlevel": {
      "url": "https://services.leadconnectorhq.com/mcp/",
      "headers": {
        "Authorization": "Bearer pit-TU_TOKEN_AQUI",
        "locationId": "TU_LOCATION_ID_AQUI"
      }
    }
  }
}
```

### Paso 3 — Verificar

```bash
claude mcp list
```

Debería aparecer `gohighlevel` como conectado.

---

## Opción 2 — Paquete npm de la comunidad (269+ herramientas)

Si necesitas más capacidades que el oficial, este paquete tiene 269 herramientas
sobre toda la API de GHL.

```bash
npm install -g @mastanley13/ghl-mcp-server
```

Configura el `.env`:

```bash
GHL_API_KEY=pit-TU_TOKEN_AQUI
GHL_BASE_URL=https://services.leadconnectorhq.com
GHL_LOCATION_ID=TU_LOCATION_ID_AQUI
```

Regístralo en Claude Code:

```bash
claude mcp add ghl-extended -- npx @mastanley13/ghl-mcp-server
```

---

## Lo que puedes hacer desde Claude Code

El servidor oficial incluye 21 herramientas core (creciendo a 250+):

| Categoría | Ejemplos de uso |
|-----------|----------------|
| Contacts | Buscar, crear, actualizar, añadir tags |
| Opportunities | Crear, mover de etapa, asignar valor |
| Calendars | Ver disponibilidad, crear citas |
| Conversations | Leer mensajes, enviar SMS/email |
| Workflows | Consultar y disparar automations |
| Payments | Ver transacciones |

---

## Ejemplos concretos para este proyecto

Una vez conectado, puedes hacer esto directamente en Claude Code:

```
Dame los últimos leads con tag "lead micropigmentacion landing"
```

```
¿Cuántos contactos tienen presupuesto "Más de 2000€" esta semana?
```

```
Mueve todos los leads de Glowlips que respondieron al pipeline
"Seminarios" en la etapa "Confirmado"
```

```
Crea una oportunidad de 250€ para el contacto maria@ejemplo.com
en el pipeline "Micropigmentacion 3.0"
```

---

## Diferencia entre Webhook y MCP

| | Webhook (ya configurado) | MCP (esta guía) |
|---|---|---|
| Dirección del flujo | Formulario → GHL | Claude Code ↔ GHL |
| Para qué sirve | Recibir leads nuevos | Operar el CRM completo |
| Cuándo se activa | Al enviar el formulario | Cuando tú lo pidas |
| Instalación | Variables de entorno Vercel | Una vez en tu máquina |

---

## Recursos oficiales

- Documentación oficial GHL MCP: `https://help.gohighlevel.com/support/solutions/articles/155000005741`
- API Reference: `https://highlevel.stoplight.io/docs/integrations`
- Paquete comunidad: `https://github.com/mastanley13/GoHighLevel-MCP`
