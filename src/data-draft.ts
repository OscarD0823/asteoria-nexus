/** Recovery is editor metadata. Restoring it never executes SQL or modifies records. */
export type DataDraft={sql:string;newTable:string;definition:string;createOpen:boolean;tab:string;table:string;rowKey?:Record<string,string|number|null>;record?:Record<string,string>;newRecord?:boolean};
export function recoverDataDraft(value:unknown):DataDraft|undefined{
 if(!value||typeof value!=='object')return;
 const v=value as Record<string,unknown>;
 if(!['sql','newTable','definition','tab','table'].every(k=>typeof v[k]==='string')||typeof v.createOpen!=='boolean')return;
 const record=v.record;
 if(record!==undefined&&(!record||typeof record!=='object'||Array.isArray(record)||!Object.values(record).every(x=>typeof x==='string')))return;
 const key=v.rowKey;
 if(key!==undefined&&(!key||typeof key!=='object'||Array.isArray(key)||!Object.values(key).every(x=>x===null||typeof x==='string'||typeof x==='number'&&Number.isFinite(x))))return;
 return {sql:v.sql as string,newTable:v.newTable as string,definition:v.definition as string,createOpen:v.createOpen,tab:['Tabla','Consulta SQL','Diseño','Relaciones'].includes(v.tab as string)?v.tab as string:'Tabla',table:v.table as string,rowKey:key as DataDraft['rowKey'],record:record as DataDraft['record'],newRecord:v.newRecord===true};
}
