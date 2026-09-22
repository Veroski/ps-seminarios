# Área privada de alumnas: puesta en marcha

## Lo que queda preparado en el proyecto

- Firebase Authentication con email/contraseña y Google.
- Biblioteca privada en `/alumnos/formaciones`.
- Aula por formación en `/alumnos/formaciones/:slug`.
- Progreso por alumna y formación.
- Markdown sanitizado, YouTube sin cookies y materiales descargables protegidos por Storage Rules.
- Reglas de Firestore y Storage, índices y cargador de contenido validado.
- Checkout servido por n8n y accesos concedidos/revocados desde eventos Stripe.

El cargador de contenido trabaja por defecto sobre `micropigmentacion`, funciona en modo simulación y solo escribe al añadir `--apply`. No actualiza `precioCentimos`, `moneda`, `publicada` ni `stripePriceId`.

```text
npm run seed:firestore
npm run seed:firestore -- --apply
```

## Acciones necesarias de Patricia

### 1. Firebase

1. Crear un proyecto Firebase separado para pruebas.
2. Añadir una aplicación web y copiar sus seis valores públicos a las variables `VITE_FIREBASE_*` del entorno de Vercel.
3. Activar Authentication > Email/Password y Google.
4. Crear Firestore en la región elegida y Storage.
5. Crear una cuenta de servicio para que n8n pueda escribir Firestore. El JSON debe guardarse únicamente en la credencial de n8n; no se sube al repositorio.
6. Publicar `firestore.rules`, `storage.rules` y `firestore.indexes.json` desde un entorno con Firebase CLI autenticado.
   Al desplegar Storage Rules que consultan Firestore, aceptar también el permiso de integración entre Storage y Firestore si Firebase lo solicita.
7. Cargar los precios test en `formaciones/{id}.stripePriceId` y marcar `publicada: true` solo cuando el contenido esté listo.

### 2. n8n

En `https://n8n.clinicscalesystem.com` están creados estos workflows dentro de Clinic Scale:

- `PS - Create Checkout Session (TEST)` — [abrir workflow](https://n8n.clinicscalesystem.com/workflow/NP3b4xESPNCB3f5z)
- `PS - Stripe Test: Access & Refunds` — [abrir workflow](https://n8n.clinicscalesystem.com/workflow/fbEgsiwhH8sdXZ0l) — activo
- `PS - Firebase Registration → GHL Lead` — [abrir workflow](https://n8n.clinicscalesystem.com/workflow/yMvMOVWPZktX5OVE) — activo

El flujo de registro recibe el ID token de Firebase, valida la identidad y hace un upsert del contacto en GHL. Mantiene una oportunidad en el pipeline `Formación Online`, etapa `Registrado`, sin retroceder una oportunidad que ya esté en `Comprado`.

El flujo de Stripe sigue siendo la fuente de verdad del pago. Para compras confirmadas hace upsert del contacto, añade `alumno-activo-{formacionId}`, mueve la oportunidad a `Formación Online` · `Comprado` y guarda los identificadores de la sincronización junto a la compra de Firestore. Para reembolsos mantiene la revocación de acceso, mueve la oportunidad a `Formación Online` · `Reembolso` y no añade la etiqueta de compra activa.

Los nodos de GHL usan la credencial existente `Bearer Auth account` y la ubicación `i2hUJPae67Nohi62dB2H`.

En el checkout, seleccionar manualmente la credencial existente `Stripe account` en `Create Stripe Checkout Session`. n8n no la puede autoasignar dentro de un nodo HTTP Request aunque sí la ha asociado automáticamente al Stripe Trigger.

La credencial de cuenta de servicio Firebase está seleccionada en los nodos de Firestore. Si se replica la instalación en otra instancia, hay que seleccionar esa credencial antes de publicar. El endpoint de checkout es:

`https://n8n.clinicscalesystem.com/webhook/checkout-session`

El workflow de Stripe usa la cuenta test. Su webhook debe estar configurado en Stripe Test > Developers > Webhooks, con el signing secret `whsec_...` en la credencial `Stripe account` para que Stripe Trigger valide la firma.

### 3. Web

Añadir en Vercel:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_N8N_CHECKOUT_URL=https://n8n.clinicscalesystem.com/webhook/checkout-session
VITE_N8N_STUDENT_REGISTRATION_URL=https://n8n.clinicscalesystem.com/webhook/ps-student-registration
```

Después de guardar las variables, hacer un nuevo deploy. La web no habilita el login hasta que Firebase esté configurado.

## Orden de prueba recomendado

1. Registrar una alumna con un email de prueba.
2. Confirmar que ve la biblioteca, pero no puede leer un apartado sin comprar.
3. Usar un precio Stripe test y completar el Checkout.
4. Verificar que el webhook registra `compras/{stripeSessionId}` y añade el ID de formación a `usuarios/{uid}.productosComprados`.
5. Abrir el aula, reproducir el vídeo, descargar un material y marcar un apartado como completado.
6. Ejecutar un reembolso test y comprobar que el ID de la formación desaparece del perfil y el apartado vuelve a estar bloqueado.

## Cambio posterior a Patricia Songel

Los workflows actuales siguen conectados al entorno test. Cuando el test esté validado, crear la credencial live de la cuenta de Patricia Songel, sustituirla en los nodos Stripe, cambiar los `price_...` por los de esa cuenta y registrar un nuevo signing secret live. Las URLs de la aplicación pueden mantenerse.
