import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const data=JSON.parse(readFileSync(new URL('assets/content.json',root),'utf8'));
const js=readFileSync(new URL('assets/content.js',root),'utf8');
assert.ok(js.startsWith('window.OPENDOOR = '));
const fallback=JSON.parse(js.slice('window.OPENDOOR = '.length).trim().replace(/;$/,''));
assert.deepEqual(fallback,data,'Offline/Admin fallback must match live Guest Hub content');
const locales=['it','en','de','fr','nl','pl','ro'];
const reference=Object.keys(data.strings.it).sort();
let fields=0;
for(const locale of locales){
  const dict=data.strings[locale];
  assert.ok(dict,'Missing locale '+locale);
  assert.deepEqual(Object.keys(dict).sort(),reference,'Missing or extra copy keys in '+locale);
  for(const [key,value] of Object.entries(dict)){
    assert.equal(typeof value,'string',locale+' '+key+' is not a string');
    assert.ok(value.trim(),locale+' '+key+' is blank');
    assert.equal(value,value.trim(),locale+' '+key+' has stray whitespace');
    assert.ok(!/\s{2,}/.test(value),locale+' '+key+' has consecutive spaces');
    assert.ok(!/undefined|\[object Object\]/.test(value),locale+' '+key+' has a broken placeholder');
    fields++;
  }
  assert.match(dict.healthIntro,/112/,'Emergency number must be present in '+locale);
  assert.ok(!/2027/.test(dict.eventRepeat),'Unconfirmed annual event must not hard-code 2027 in '+locale);
}
assert.equal(data.strings.it.checkinPhotoIntro.includes('due foto'),false,'Check-in now contains an intercom step too');
assert.match(data.strings.it.boilerNotice,/bollitore/i,'Do not confuse kettle and hot-water boiler');
console.log(JSON.stringify({checks:'copy-locales',locales:locales.length,keysPerLocale:reference.length,fields,pass:true,productionWrites:false}));
