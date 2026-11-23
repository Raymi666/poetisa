import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

// Structural validation is not a substitute for editorial and rights review.
export function validateCatalog(poems) {
 const issues=[],ids=new Set();
 if(!Array.isArray(poems)||!poems.length)return ['El catálogo debe ser una lista no vacía.'];
 for(const [i,p] of poems.entries()){
  const label=`Registro ${i+1}`;
  if(!p||typeof p!=='object'||Array.isArray(p)){issues.push(`${label}: ficha inválida.`);continue;}
  for(const key of ['id','title','author','book','text','sourceUrl','sourceLabel','rightsBasis','rightsUrl','transcriptionNote','note','pdfUrl'])if(typeof p[key]!=='string'||!p[key].trim())issues.push(`${label}: falta ${key}.`);
  if(typeof p.id!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id))issues.push(`${label}: id inválido.`);
  if(ids.has(p.id))issues.push(`${label}: id duplicado ${p.id}.`);ids.add(p.id);
  for(const key of ['sourceUrl','rightsUrl','pdfUrl'])try{const u=new URL(p[key]);if(u.protocol!=='https:'||u.username||u.password)throw Error();}catch{issues.push(`${label}: ${key} debe ser una URL HTTPS sin credenciales.`);}
  for(const key of ['authorBirth','authorDeath','year'])if(!Number.isInteger(p[key])||p[key]<1||p[key]>2100)issues.push(`${label}: fecha ${key} inválida.`);
  if(p.authorDeath<p.authorBirth||p.year<p.authorBirth)issues.push(`${label}: fechas incoherentes.`);
  for(const key of ['themes','keywords'])if(!Array.isArray(p[key])||!p[key].length||p[key].some(x=>typeof x!=='string'||!x.trim())||new Set(p[key]).size!==p[key].length)issues.push(`${label}: etiquetas ${key} inválidas o repetidas.`);
 }
 return issues;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const poems=JSON.parse(readFileSync(new URL('../content/poems.json',import.meta.url),'utf8'));
 const issues=validateCatalog(poems);
 if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}
 else console.log(`Catálogo válido: ${poems.length} poemas de ${new Set(poems.map(p=>p.author)).size} voces. Los derechos requieren revisión editorial.`);
}
