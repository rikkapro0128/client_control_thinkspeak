let btnOn = document.getElementById('ON');
let btnOff = document.getElementById('OFF');
let auto = document.getElementById('auto');
let manual = document.getElementById('manual');

let api_key_write_ch3 = 'LZTWM7JLLN44RAXH';
let api_key_read_ch3 = 'HBVJS4N0W1OJSIUC';
let channels_id_3 = '1683999'
let api_key_write_ch2 = 'IM8FAFV50537UB7I';
let api_key_read_ch2 = 'C38B8SGTL7VW8TF6';
let api_key_write_ch1 = 'LRR7VAWRCAJ75YGC';
let api_key_read_ch1 = 'Q4U1ZWHTTSA57EB2';

let urlLED = `https://api.thingspeak.com/update?api_key=${api_key_write_ch2}&field1=`;
let urlWriteMode = `https://api.thingspeak.com/update?api_key=${api_key_write_ch3}&field1=`;
let urlReadMode = `https://api.thingspeak.com/channels/${channels_id_3}/feeds/last.json?api_key=${api_key_read_ch3}`;

// 0 => manual
// 1 => auto

(async () => {
    const data = await requestURL(urlReadMode, 'GET');
    if(data.field1 == '0') {
        auto.classList.add('dark')
    }else if(data.field1 == '1') {
        manual.classList.add('dark')
    }
})()

btnOn.addEventListener('click', async function() {
  await requestURL(urlLED + '1', 'POST');
})

btnOff.addEventListener('click', async function() {
  await requestURL(urlLED + '0', 'POST');
})

auto.addEventListener('click', async function() {
  await requestURL(urlWriteMode + '1', 'POST');
  manual.classList.add('dark')
  this.classList.remove('dark')
})

manual.addEventListener('click', async function() {
  await requestURL(urlWriteMode + '0', 'POST');
  auto.classList.add('dark')
  this.classList.remove('dark')
})

async function requestURL(url, method) {
    const res = await fetch(url, {  method: method });
    const data = await res.json();
    return data;
}
