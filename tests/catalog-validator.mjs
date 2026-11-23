import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateCatalog} from '../scripts/validate-catalog.mjs';
const sample=JSON.parse(readFileSync(new URL('../content/poems.json',import.meta.url),'utf8'))[0];
test('existing catalogue passes structure validation',()=>{
 const all=JSON.parse(readFileSync(new URL('../content/poems.json',import.meta.url),'utf8'));
 assert.deepEqual(validateCatalog(all),[]);
});
test('duplicates cannot replace saved poem identities',()=>assert.match(validateCatalog([sample,sample]).join(' '),/duplicado/));
test('missing rights and unsafe source links are rejected',()=>{
 const bad={...sample,rightsBasis:'',sourceUrl:'javascript:alert(1)'};
 const errors=validateCatalog([bad]).join(' ');
 assert.match(errors,/rightsBasis/);assert.match(errors,/sourceUrl/);
});
test('a credential in a source URL is rejected',()=>assert.match(validateCatalog([{...sample,pdfUrl:'https://user:password@example.org/file.pdf'}]).join(' '),/pdfUrl/));
