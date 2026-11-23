# Incorporar poemas y bibliotecas

La app carga `content/poems.json`. Por ahora hay un catálogo único; el selector de múltiples bibliotecas figura en la hoja de ruta y aún no está implementado.

## Antes de editar

Propón la biblioteca y los textos en una Issue. Aporta enlaces verificables a la edición y a los derechos. Si el permiso es incierto, no copies el poema en la Issue. La colección inicial se centra en voces chilenas; otros alcances se acuerdan primero con los mantenedores.

## Ficha por poema

Consulta `content/poem.schema.json` y un registro existente. Cada registro incluye:

- `id`: identificador estable, único, en minúsculas y con guiones.
- `title`, `author`, `authorBirth`, `authorDeath`: identidad y datos cotejados.
- `book`, `year`: libro y año de la edición usada.
- `text`: poema íntegro, fiel a esa edición, con saltos de verso y estrofa.
- `sourceUrl`, `sourceLabel`, `pdfUrl`: fuente, páginas y descarga del original.
- `rightsBasis`, `rightsUrl`: fundamento documentado de reproducción.
- `transcriptionNote`: cotejo y decisiones de transcripción.
- `themes`, `keywords`: etiquetas para la búsqueda temática.
- `note`: interpretación editorial breve; no forma parte del poema.

No inventes metadatos ni enlaces. No reutilices un `id` para otra obra; las lecturas guardadas lo usan. Las restricciones de este formato (por ejemplo, fechas de autores fallecidos) reflejan la colección inicial y deben evolucionar con revisión si se aceptan otros tipos de material.

## Comprobar e integrar

1. Coteja texto y metadatos con la edición.
2. Añade la ficha y documenta la fuente en `content/FUENTES-*.txt`.
3. Ejecuta `npm run check:catalog` y `npm test`.
4. Cambia `COLLECTION_VERSION` en `lib/selection.ts` cuando se publique la ampliación.
5. Regenera el ZIP con `python3 scripts/package-collection.py`.
6. Abre un pull request. Una persona mantenedora revisará edición, derechos, transcripción y pruebas antes de integrarlo.

El validador comprueba estructura y coherencia básica. No certifica derechos, autoría ni fidelidad: esos puntos requieren revisión editorial.
