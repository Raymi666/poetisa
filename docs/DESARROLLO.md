# Desarrollo y despliegue

## Local

Usa Node.js 24. `npm ci` respeta el archivo de dependencias. Copia `.dev.vars.example` a `.dev.vars`; `npm run db:local` aplica solo migraciones locales y conserva su registro. Luego `npm run build` y `npm run dev`.

El modo de invitación local usa un código ficticio. Sin `OPENAI_API_KEY`, la selección temática permite probar el catálogo. Ninguna prueba necesita claves reales ni una base de producción.

## Registro por correo

Configura tu propio Firebase Authentication con Email/Password y los dominios autorizados de tu instancia. Proporciona al servidor `FIREBASE_PROJECT_ID`, `FIREBASE_WEB_API_KEY` y `FIREBASE_AUTH_DOMAIN`. El servidor valida firma, proyecto, revocación y verificación del correo; no basta con ocultar botones en el navegador.

## IA opcional

`OPENAI_API_KEY` es un secreto del servidor. Nunca se incluye en JavaScript público ni se pide a las personas lectoras. La IA elige entre identificadores permitidos; el poema siempre procede del catálogo. Los costes y límites corresponden a quien opera la instancia.

## Notificaciones

Necesitas HTTPS, claves VAPID propias (`VAPID_PUBLIC_KEY` y `VAPID_PRIVATE_KEY`), `PUBLIC_ORIGIN` y un programador autenticado. `PUSH_SCHEDULE_ENABLED=true` declara que el servicio está configurado; no crea por sí solo una tarea periódica.

En el alojamiento original existe una tarea externa a las 09:00 de America/Santiago. Esa tarea y sus credenciales no se exportan. Para otra instancia, configura su propio programador y mantén la protección contra duplicados y la omisión de personas que ya completaron la lectura.

La administración `/mcp` está deshabilitada por defecto en esta distribución. `TRUST_SITES_IDENTITY=true` solo corresponde a un despliegue protegido por el dispatcher autenticado de Sites. No confíes en encabezados enviados directamente desde Internet. Para otro proveedor añade autenticación verificable o invoca la función de envíos desde un disparador interno.

## Publicación

El repositorio contiene un backend para Workers/D1, no solo archivos estáticos. GitHub Pages no basta. `.openai/hosting.json` omite deliberadamente el identificador del sitio original. Crea tu propio alojamiento y vincula tu propia base; no reutilices identificadores ni claves del piloto.

`wrangler.local.jsonc` es exclusivamente local: no lo uses para desplegar. El despliegue autónomo simplificado sigue en la hoja de ruta. Conserva migraciones ya aplicadas y ensaya actualizaciones antes de publicar.

El código conserva contactos de mantenimiento del proyecto original. Si operas una instancia independiente, actualiza privacidad, contacto y remitente VAPID para reflejar quién la administra.
