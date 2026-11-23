# Seguridad y privacidad

No publiques claves, tokens, suscripciones push, bases de datos, correos de usuarios ni cuadernos en Issues o pull requests.

Informa de vulnerabilidades en privado a rvasquez@surfia.cl, con una reproducción basada en datos ficticios. No pruebes contra cuentas del piloto público.

Cada instalación necesita sus propios secretos y proyectos de servicios externos. Los ejemplos no incluyen credenciales de producción. El catálogo es público; los cuadernos son privados y no se distribuyen.

La ruta `/mcp` usa la identidad autenticada del alojamiento original. Esta distribución bloquea sus operaciones administrativas por defecto con `TRUST_SITES_IDENTITY=false`. No actives esa opción en un servidor que acepte del visitante encabezados `oai-authenticated-user-*`. En otro alojamiento implementa autenticación administrativa verificable antes de habilitar el programador.

Prueba cambios de esquema en una base local o saneada. No reescribas migraciones ya aplicadas ni uses la base del piloto para las pruebas.
