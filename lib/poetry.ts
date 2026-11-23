export function wordsOf(input:unknown):string[]{
 if(!Array.isArray(input)||input.length!==3) throw Error('Regálame exactamente tres palabras.');
 const words=input.map(w=>typeof w==='string'?w.normalize('NFC').trim():'');
 if(words.some(w=>!w||w.length>40||!/^\p{L}[\p{L}\p{M}'’\-]*$/u.test(w)))throw Error('Escribe una sola palabra en cada casilla, de hasta 40 letras.');
 if(new Set(words.map(w=>w.toLocaleLowerCase('es'))).size!==3)throw Error('Regálame tres palabras diferentes.');
 return words;
}
export function nameOf(input:unknown){const s=typeof input==='string'?input.trim().replace(/\s+/g,' '):'';if(!s||s.length>60)throw Error('Escribe tu nombre, de hasta 60 caracteres.');return s;}
export function chileDate(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);}
