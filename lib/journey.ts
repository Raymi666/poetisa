export const CHILE_ZONE='America/Santiago';
export function localDay(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:CHILE_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
/** Six calendar months, clamping the last day (August 31 → February 28/29). */
export function sixMonthsAfter(day:string){
 const [year,month,date]=day.split('-').map(Number),target=new Date(Date.UTC(year,month-1+6,1));
 const last=new Date(Date.UTC(target.getUTCFullYear(),target.getUTCMonth()+1,0)).getUTCDate();
 target.setUTCDate(Math.min(date,last));return target.toISOString().slice(0,10);
}
export function journey(registeredAt:number,invitationOn:string,now=new Date()){
 return {registeredOn:localDay(new Date(registeredAt)),invitationOn,writingInvited:localDay(now)>=invitationOn};
}
