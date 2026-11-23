import {chileDate} from './poetry';
export function reminderSlot(confirmed:number, now:Date){
  if(!confirmed)return 'confirmation';
  const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'America/Santiago',hour:'2-digit',hourCycle:'h23'}).format(now));
  return hour>=9?chileDate(now):null;
}
export function reminderMessage(row:{name:string;confirmed:number;confirm_token:string;unsubscribe_token:string},origin:string){
  const base=new URL(origin);
  if(base.protocol!=='https:')throw Error('El enlace público debe usar HTTPS.');
  const end=`\n\nDejar de recibir correos: ${base.origin}/api/unsubscribe?t=${row.unsubscribe_token}`;
  return row.confirmed?{
    subject:'PoetisA — tus tres palabras de hoy 💗',
    body:`Hola, ${row.name} 💗\nSoy PoetisA. ¿Me regalas tus tres palabras de hoy? Encontraré un poema chileno publicado para acompañarte.\n\nNuestro encuentro: ${base.origin}/poetisa.html${end}`
  }:{
    subject:'Confirma tu encuentro diario con PoetisA',
    body:`Hola, ${row.name} 💗\nSolicitaste un recordatorio diario de PoetisA a las 9:00 de Chile. Confirma tu correo aquí:\n${base.origin}/api/confirm?t=${row.confirm_token}\n\nSi no lo solicitaste, no confirmes: no recibirás los recordatorios diarios.${end}`
  };
}
