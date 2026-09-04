# Área privada de alumnas: puesta en marcha

## Lo que queda preparado en el proyecto

- Firebase Authentication con email/contraseña y Google.
- Biblioteca privada en `/alumnos/formaciones`.
- Aula por formación en `/alumnos/formaciones/:slug`.
- Progreso por alumna y formación.
- Markdown sanitizado, YouTube sin cookies y materiales descargables protegidos por Storage Rules.
- Reglas de Firestore y Storage, índices y seed de estructura de ejemplo.
- Checkout servido por n8n y accesos concedidos/revocados desde eventos Stripe.

Los datos de ejemplo tienen `publicada: false`, `precioCentimos: 0` y `stripePriceId` vacío. No publican ni cobran nada.

## Acciones necesarias de Patricia

### 1. Firebase

1. Crear un proyecto Firebase separado para pruebas.
2. Añadir una aplicación web y copiar sus seis valores públicos a las variables `VITE_FIREBASE_*` del entorno de Vercel.
3. Activar Authentication > Email/Password y Google.
4. Crear Firestore en la región elegida y Storage.
5. Crear una cuenta de servicio para que n8n pueda escribir Firestore. El JSON debe guardarse únicamente en la credencial de n8n; no se sube al repositorio.
6. Configurar en n8n las variables de entorno `FIREBASE_PROJECT_ID` y `FIREBASE_WEB_API_KEY`.
7. Publicar `firestore.rules`, `storage.rules` y `firestore.indexes.json` desde un entorno con Firebase CLI autenticado.
   Al desplegar Storage Rules que consultan Firestore, aceptar también el permiso de integración entre Storage y Firestore si Firebase lo solicita.
8. Cargar los precios test en `formaciones/{id}.stripePriceId` y marcar `publicada: true` solo cuando el contenido esté listo.

### 2. n8n

En `https://n8n.clinicscalesystem.com` están creados estos workflows dentro de Clinic Scale:

- `PS - Create Checkout Session (TEST)` — [abrir workflow](https://n8n.clinicscalesystem.com/workflow/NP3b4xESPNCB3f5z)
- `PS - Stripe Test: Access & Refunds` — [abrir workflow](https://n8n.clinicscalesystem.com/workflow/fbEgsiwhH8sdXZ0l)

Ambos están deliberadamente inactivos hasta que Firebase y los precios test estén configurados; así no se reciben pagos ni se ejecutan escrituras incompletas.

En el checkout, seleccionar manualmente la credencial existente `Stripe account` en `Create Stripe Checkout Session`. n8n no la puede autoasignar dentro de un nodo HTTP Request aunque sí la ha asociado automáticamente al Stripe Trigger.

En los tres nodos de Firestore, seleccionar la credencial de cuenta de servicio Firebase y publicar ambos workflows después de configurar las variables de entorno. El endpoint de checkout será:

`https://n8n.clinicscalesystem.com/webhook/checkout-session`

Después de publicar el workflow de Stripe, copiar su URL de producción en Stripe Test > Developers > Webhooks. Añadir el signing secret `whsec_...` a la misma credencial `Stripe account` para que Stripe Trigger valide la firma.

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

No se cambia el workflow a producción ni se modifica el proyecto de pruebas. Cuando el test esté validado, crear la credencial live de la cuenta de Patricia Songel, sustituirla en los nodos Stripe, cambiar los `price_...` por los de esa cuenta y registrar un nuevo signing secret live. Las URLs de la aplicación pueden mantenerse.
