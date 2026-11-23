// Installation is a browser/OS action. Never report it complete from a click alone.
export function deviceFamily(userAgent, touchPoints = 0) {
  if (/iPhone|iPad|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && touchPoints > 1)) return 'ios';
  if (/Android/.test(userAgent)) return 'android';
  if (/Macintosh|Mac OS X/.test(userAgent)) return 'mac';
  if (/Windows/.test(userAgent)) return 'windows';
  return 'other';
}

export function browserFamily(userAgent) {
  if (/Edg\//.test(userAgent)) return 'edge';
  if (/Chrome\//.test(userAgent)) return 'chrome';
  if (/Safari\//.test(userAgent) && !/CriOS|FxiOS/.test(userAgent)) return 'safari';
  return 'other';
}

export function installGuide(device, browser) {
  if (device === 'ios') return {
    title: 'En tu iPhone o iPad',
    steps: ['Abre PoetisA en Safari.', 'Pulsa Compartir. Si no lo ves, abre primero el menú de los tres puntos.', 'Elige Agregar a Inicio. Si no aparece, búscalo en Editar acciones.', 'Deja Abrir como app web activado, si aparece, y pulsa Agregar. Abre el nuevo icono.'],
    note: 'Para los avisos necesitas iOS o iPadOS 16.4 o posterior y abrir PoetisA desde su icono.'
  };
  if (device === 'mac' && browser === 'safari') return {
    title: 'En tu Mac con Safari',
    steps: ['Abre PoetisA en Safari.', 'En la barra superior del Mac, elige Archivo y luego Agregar al Dock.', 'Confirma el nombre PoetisA y pulsa Agregar.', 'Abre PoetisA desde su icono en el Dock. Inicia sesión si te lo pide.'],
    note: 'Disponible desde macOS Sonoma 14. También puedes instalarla con Chrome o Edge.'
  };
  if (browser === 'edge') return {
    title: device === 'mac' ? 'En tu Mac con Edge' : 'En Windows con Edge',
    steps: ['Abre PoetisA en Microsoft Edge.', 'Pulsa el icono de instalar de la barra de direcciones. También puedes abrir el menú de tres puntos, Más herramientas y Aplicaciones.', 'Elige Instalar este sitio como una aplicación y confirma Instalar.', device === 'mac' ? 'Abre PoetisA desde su nuevo icono. Puedes conservarlo en el Dock.' : 'Abre PoetisA desde su nuevo icono. Puedes anclarlo a Inicio o a la barra de tareas.'],
    note: 'Si aparece el botón Instalar ahora aquí abajo, puedes comenzar directamente desde él.'
  };
  if (device === 'android') return {
    title: 'En tu teléfono Android',
    steps: ['Abre PoetisA en Chrome.', 'Abre el menú de tres puntos y elige Instalar aplicación o Agregar a la pantalla principal.', 'Confirma la instalación y abre PoetisA desde el icono.'],
    note: 'El nombre de la opción puede variar según la versión de Chrome.'
  };
  return {
    title: device === 'mac' ? 'En tu Mac con Chrome' : 'En tu laptop con Chrome',
    steps: ['Abre PoetisA en Google Chrome.', 'Pulsa el icono de instalar de la barra de direcciones. También puedes abrir el menú de tres puntos y Transmitir, guardar y compartir.', 'Elige Instalar página como aplicación y confirma Instalar.', 'Abre PoetisA desde su nuevo icono. Tu cuenta y tu cuaderno siguen siendo los mismos.'],
    note: browser === 'other' ? 'Para instalar el piloto usa Chrome o Edge. En Mac también puedes usar Safari desde macOS Sonoma 14.' : 'Si aparece el botón Instalar ahora aquí abajo, puedes comenzar directamente desde él.'
  };
}

export function withTimeout(promise, ms, message) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms); })]).finally(() => clearTimeout(timer));
}
