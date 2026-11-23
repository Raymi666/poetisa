import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const compile=source=>'data:text/javascript;base64,'+Buffer.from(ts.transpile(source,{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022})).toString('base64');
const poetryUrl=compile(await readFile(new URL('../lib/poetry.ts',import.meta.url),'utf8'));
const reminderUrl=compile((await readFile(new URL('../lib/reminders.ts',import.meta.url),'utf8')).replace("'./poetry'",JSON.stringify(poetryUrl)));
const {reminderSlot,reminderMessage}=await import(reminderUrl);
// Winter/summer offsets and local midnight: wall clock follows Chile DST.
assert.equal(reminderSlot(1,new Date('2026-07-10T12:59:00Z')),null);
assert.equal(reminderSlot(1,new Date('2026-07-10T13:00:00Z')),'2026-07-10');
assert.equal(reminderSlot(1,new Date('2026-10-31T11:59:00Z')),null);
assert.equal(reminderSlot(1,new Date('2026-10-31T12:00:00Z')),'2026-10-31');
assert.equal(reminderSlot(1,new Date('2026-11-01T02:59:00Z')),'2026-10-31');
assert.equal(reminderSlot(1,new Date('2026-11-01T03:00:00Z')),null);
assert.equal(reminderSlot(0,new Date('2026-11-01T03:00:00Z')),'confirmation');
const row={name:'César',confirmed:0,confirm_token:'a'.repeat(64),unsubscribe_token:'b'.repeat(64)};
assert.match(reminderMessage(row,'https://example.org').body,/api\/confirm/);
assert.doesNotMatch(reminderMessage({...row,confirmed:1},'https://example.org').body,/api\/confirm/);
assert.match(reminderMessage({...row,confirmed:1},'https://example.org').body,/api\/unsubscribe/);
assert.throws(()=>reminderMessage(row,'http://example.org'));
// Admin endpoint rejects unauthenticated/public callers before any database operation.
const mockEnv={REMINDER_OWNER_EMAIL:'owner@example.org'};
globalThis.__poetisaTestEnv=mockEnv;
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
const authUrl=compile((await read('lib/account-auth.ts')).replace("'jose'",JSON.stringify(import.meta.resolve('jose'))));
const journeyUrl=compile(await read('lib/journey.ts'));
const pushUrl=compile((await read('lib/push.ts')).replaceAll("'web-push'",JSON.stringify(import.meta.resolve('web-push'))).replaceAll("'./account-auth'",JSON.stringify(authUrl)).replaceAll("'./journey'",JSON.stringify(journeyUrl)));
const route=compile((await readFile(new URL('../app/mcp/route.ts',import.meta.url),'utf8')).replace("import {env} from 'cloudflare:workers';","const env=globalThis.__poetisaTestEnv;").replace("'@/lib/reminders'",JSON.stringify(reminderUrl)).replace("'@/lib/push'",JSON.stringify(pushUrl)));
const {POST}=await import(route);
for(const name of ['poetisa_claim_reminders','poetisa_send_daily_notifications','poetisa_notification_status'])for(const email of [null,'visitor@example.org','owner@example.org']){
 const headers={'Content-Type':'application/json'};if(email)headers['oai-authenticated-user-email']=email;
 const res=await POST(new Request('https://example.org/mcp',{method:'POST',headers,body:JSON.stringify({id:1,method:'tools/call',params:{name}})}));
 assert.equal(res.status,403);
}
const discover=await POST(new Request('https://example.org/mcp',{method:'POST',body:JSON.stringify({id:2,method:'tools/list'})}));
assert.equal((await discover.json()).result.tools.length,6);
console.log('Recordatorios comprobados: horario de Chile, confirmación, baja y acceso exclusivo del propietario.');
