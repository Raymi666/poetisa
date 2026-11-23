# PoetisA

**Tres palabras tuyas. Un poema para hoy.**

Proyecto abierto de mediación poética, impulsado por Raymi Vásquez / SURFIA. Cada persona comparte tres palabras y recibe una lectura de poesía chilena publicada, con autoría, edición de origen y enlaces a sus fuentes.

La IA ayuda a seleccionar e interpretar la relación con las palabras. **No inventa ni reescribe el poema.** Si no hay una afinidad clara, PoetisA propone un descubrimiento y lo indica. Sin una conexión de IA configurada, utiliza temas y palabras del catálogo.

[Probar e instalar el piloto](https://poetisa.raymi666.chatgpt.site/poetisa?install=1)

## Para quienes quieren leer

No necesitas descargar el repositorio ni configurar claves.

1. Abre el piloto, crea tu cuenta y confirma tu correo.
2. Pulsa **Instalar PoetisA**. La guía incluye Windows, Mac y celulares.
3. En **Mis recordatorios**, activa los avisos en ese equipo y solicita una prueba.
4. Regala tus tres palabras y abre tu cuaderno.

Es una aplicación web instalable. Los avisos están programados para las 09:00 de `America/Santiago`; requieren permiso, conexión y compatibilidad del navegador y del sistema. La aceptación del envío por el servicio de notificaciones no garantiza que el equipo lo muestre. Si ya completaste tu encuentro del día, se omite el recordatorio.

## Qué incluye

- Una lectura diaria a partir de tres palabras.
- Primera colección chilena con fuentes y base de derechos por texto.
- Cuenta por correo y cuaderno privado de lecturas y poemas propios.
- Invitación a escribir después de seis meses; se puede empezar antes.
- Instalación desde el navegador y avisos opcionales por dispositivo.
- Descarga de lecturas, enlace al libro original y exportación del cuaderno.
- Paleta verde azulada, crema, naranja suave y detalles florales.

## Ayúdanos a crecer

Puedes proponer bibliotecas y poemas, cotejar transcripciones, mejorar la accesibilidad o aportar código. Empieza por [CONTRIBUTING.md](CONTRIBUTING.md) y [cómo sumar una colección](docs/COLECCIONES.md).

La colección inicial se centra en poesía chilena. Nuevas bibliotecas deben mantener autoría, procedencia y derechos verificables. No se incorporan automáticamente textos por estar disponibles gratis en Internet.

## Desarrollo local

Requisitos: Node.js **24**, npm y Git. Python 3 solo se necesita para regenerar el ZIP de la colección.

```sh
npm ci
```

Copia `.dev.vars.example` como `.dev.vars`, con un código de invitación ficticio y los servicios externos desactivados. Después:

```sh
npm run db:local
npm run build
npm run dev
```

Abre `http://127.0.0.1:5173/poetisa`. En **Tengo una invitación de la primera prueba**, usa el código de tu archivo local. Ese modo permite probar la selección temática sin Firebase ni clave de IA. Para registro y avisos reales: [DESARROLLO.md](docs/DESARROLLO.md).

```sh
npm test
npm run check:catalog
```

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `frontend/`, `public/` | Interfaz, instalación y recepción de notificaciones |
| `content/` | Catálogo, fuentes y formato de contribuciones |
| `lib/` | Selección, cuentas, recorrido de escritura y envíos |
| `app/api/` | API de la aplicación |
| `app/mcp/` | Administración de recordatorios, bloqueada por defecto en esta distribución |
| `drizzle/` | Esquema y migraciones, sin datos de usuarios |
| `tests/` | Pruebas de selección, privacidad, cuentas y avisos |

El piloto utiliza Firebase Authentication y un servidor compatible con Cloudflare Workers/D1. Publicar el código en GitHub **no despliega el servidor ni configura recordatorios**. GitHub Pages por sí solo no ejecuta este backend.

## Estado

Primera versión abierta del piloto, basada en la versión 6 del sitio. Esta distribución añade documentación, validación del catálogo y un bloqueo administrativo para nuevas instalaciones. Usa Vinext en beta; prueba cambios antes de actualizar una instancia con usuarios.

[Hoja de ruta](ROADMAP.md) · [Seguridad](SECURITY.md) · [Derechos de los textos](content/DERECHOS.md)

## Licencias

El código y documentación original de PoetisA se publican bajo [MIT](LICENSE). Los poemas y ediciones citadas **no se relicencian bajo MIT**: cada texto conserva su autoría y su base de uso documentada. Los componentes de terceros mantienen sus licencias: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
