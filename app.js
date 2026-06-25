const STORAGE_KEY='planner-vienna-v1';
const el=id=>document.getElementById(id);
const pad=n=>String(n).padStart(2,'0');
const toMin=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};
const toTime=m=>`${pad(Math.floor(m/60)%24)}:${pad(m%60)}`;
const maps=q=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q+' Vienna')}`;
const uid=()=>Math.random().toString(36).slice(2,9);

const initialDays=[
 {id:'d1',title:'Day 1 - Cathedral + Belvedere + pre-dinner options',date:'Thu, June 25',start:'07:30',items:[
  {id:'d1-1',kind:'fixed',title:'Wake up',dur:30,note:'Get ready and leave from Laudongasse 8.',tags:['hotel','start']},
  {id:'d1-2',kind:'food',base:'Breakfast',selected:0,options:['Cafe Eiles','Cafe Hummel'],dur:30,note:'Breakfast near hotel before heading to St. Stephen’s.'},
  {id:'d1-3',kind:'transit',title:'Transit to St. Stephen’s Cathedral',dur:30,note:'Go to Stephansplatz and aim for the North Tower entrance before the ticket time.'},
  {id:'d1-4',kind:'fixed',title:'St. Stephen’s North Tower',dur:40,note:'Pummerin bell area, roof tiles, and skyline view.',tags:['ticket','view']},
  {id:'d1-5',kind:'fixed',title:'St. Stephen’s Catacombs Tour',dur:30,note:'Guided underground tour with bishops’ crypt and burial chambers.',tags:['ticket','tour']},
  {id:'d1-6',kind:'fixed',title:'St. Stephen’s Cathedral Interior',dur:40,note:'Gothic nave, altars, pulpit, and main cathedral interior.',tags:['church']},
  {id:'d1-7',kind:'transit',title:'Transit to Upper Belvedere',dur:35,note:'Leave Stephansplatz and go straight to Upper Belvedere.'},
  {id:'d1-8',kind:'fixed',title:'Upper Belvedere Gallery',dur:150,note:'Klimt, The Kiss, Austrian art, Baroque palace rooms, and Upper Belvedere galleries.',tags:['major sight','ticket']},
  {id:'d1-9',kind:'fixed',title:'Belvedere Gardens + Exterior',dur:30,note:'Formal gardens, fountains, palace exterior, and quick photo angles.',tags:['free','photos']},
  {id:'d1-10',kind:'food',base:'Lunch near Belvedere',selected:0,options:['Salm Bräu','Cafe Goldegg'],dur:60,note:'One-hour lunch near Belvedere before a park break.'},
  {id:'d1-11',kind:'fixed',title:'Botanical Garden / Schweizergarten Park Break',dur:60,note:'Shady paths or lawns close to Belvedere after lunch.',tags:['park','rest']},
  {id:'d1-12',kind:'transit',title:'Transit to old-center option area',dur:30,note:'Move out of Belvedere area before the pre-dinner option block.'},
  {id:'d1-13',kind:'option',base:'Pre-dinner option',selected:0,options:['Danube Canal + Schwedenplatz Walk','Rathaus + Parliament + Ringstrasse Walk'],dur:75,note:'Flexible walk before dinner; choose tired-day canal or architecture route.'},
  {id:'d1-14',kind:'food',base:'Dinner',selected:0,options:['Figlmüller Bäckerstraße','Griechenbeisl'],dur:90,note:'Dinner near old center / Schwedenplatz.'},
  {id:'d1-15',kind:'transit',title:'Return to hotel / end of day',dur:30,note:'Return by transit or taxi depending on tiredness.'}
 ]},
 {id:'d2',title:'Day 2 - Schönbrunn Palace Day',date:'Fri, June 26',start:'07:00',items:[
  {id:'d2-1',kind:'fixed',title:'Wake up',dur:20,note:'Start at Laudongasse 8.'},
  {id:'d2-2',kind:'transit',title:'Transit to Schönbrunn',dur:40,note:'Public transit toward Schönbrunn before palace crowds/heat.'},
  {id:'d2-3',kind:'fixed',title:'Schönbrunn Gardens',dur:90,note:'Palace park, garden axis, fountains, exterior palace views, cooler morning walk.',tags:['free core','palace']},
  {id:'d2-4',kind:'food',base:'Breakfast at / near Schönbrunn',selected:0,options:['Schönbrunner Schlosscafe','Gerstner Schönbrunn'],dur:30,note:'Quick breakfast/pastry option in the palace area.'},
  {id:'d2-5',kind:'fixed',title:'Schönbrunn Palace',dur:165,note:'Imperial state rooms, Habsburg apartments, palace exterior, and garden viewpoints.',tags:['major sight','ticket']},
  {id:'d2-6',kind:'food',base:'Lunch near Schönbrunn',selected:1,options:['Della Lucia','Cafe Raimann'],dur:60,note:'Lunch close enough after the palace block.'},
  {id:'d2-7',kind:'fixed',title:'Auer-Welsbach-Park Break',dur:60,note:'Shade and lawns near Schönbrunn/Hietzing before the short afternoon option.',tags:['park','rest']},
  {id:'d2-8',kind:'option',base:'Afternoon replacement option',selected:0,options:['Schönbrunn Palm House','Schönbrunn Desert House'],dur:60,note:'Lower-cost replacement for the Carriage Museum.'},
  {id:'d2-9',kind:'transit',title:'Transit to dinner area',dur:45,note:'Return toward Josefstadt / hotel side so dinner stays manageable.'},
  {id:'d2-10',kind:'food',base:'Dinner',selected:0,options:['Rebhuhn','Cafe Benno'],dur:90,note:'Dinner near hotel side.'},
  {id:'d2-11',kind:'option',base:'Evening option',selected:0,options:['Quintessenz Organ Festival','VOLXkino Open-Air Film'],dur:75,note:'Concert is shorter and earlier; film is free but later.'},
  {id:'d2-12',kind:'transit',title:'Return to hotel / end of day',dur:45,note:'Return after concert or film; later if staying for full film.'}
 ]},
 {id:'d3',title:'Day 3 - KHM + Karlskirche + Cruise',date:'Sat, June 27',start:'07:30',items:[
  {id:'d3-1',kind:'fixed',title:'Wake up',dur:30,note:'Start at Laudongasse 8.'},
  {id:'d3-2',kind:'food',base:'Breakfast near hotel / center',selected:0,options:['Cafe Eiles','Cafe Hummel'],dur:30,note:'Short breakfast before MuseumsQuartier / KHM.'},
  {id:'d3-3',kind:'transit',title:'Transit / walk to Museum Quarter area',dur:30,note:'Move toward Maria-Theresien-Platz / MuseumsQuartier before KHM opens.'},
  {id:'d3-4',kind:'fixed',title:'Maria-Theresien-Platz + MuseumsQuartier Exterior',dur:50,note:'Museum facades, Maria Theresa monument, MQ courtyards, benches, photos.',tags:['free','architecture']},
  {id:'d3-5',kind:'fixed',title:'Kunsthistorisches Museum',dur:150,note:'Bruegel, Raphael, Titian, Velázquez, Egyptian/Greek-Roman collections, grand staircase.',tags:['major sight','ticket']},
  {id:'d3-6',kind:'food',base:'Lunch near museum / hotel side',selected:0,options:['Fromme Helene','Cafe Landtmann'],dur:60,note:'One-hour lunch before park break.'},
  {id:'d3-7',kind:'fixed',title:'Volksgarten / MuseumsQuartier Courtyard Park Break',dur:60,note:'Relax between museum and Karlskirche; pick shade instead of forcing a long walk.',tags:['park','rest']},
  {id:'d3-8',kind:'fixed',title:'Karlskirche',dur:60,note:'Baroque interior, dome frescoes, panoramic platform/lift, and church square.',tags:['ticket','church']},
  {id:'d3-9',kind:'transit',title:'Transit to cruise-side dinner area',dur:45,note:'Move toward Schwedenplatz / canal before dinner and cruise.'},
  {id:'d3-10',kind:'food',base:'Dinner',selected:0,options:['Griechenbeisl','Figlmüller Bäckerstraße'],dur:90,note:'Dinner close enough to Schwedenplatz / cruise boarding.'},
  {id:'d3-11',kind:'transit',title:'Walk to cruise / boarding area',dur:15,note:'Confirm exact DDSG boarding point before dinner and leave buffer.'},
  {id:'d3-12',kind:'option',base:'Final cruise option',selected:0,options:['DDSG Evening Sightseeing / Dinner Cruise','DDSG Heurigen Cruise with Viennese Songs'],dur:180,note:'Evening boat ride; choose basic sightseeing/dinner version or Heurigen music version.'},
  {id:'d3-13',kind:'transit',title:'Return to hotel / end of day',dur:30,note:'Transit or taxi from Schwedenplatz / cruise endpoint.'}
 ]}
];

const eventOptions=[
 {dur:30,title:'St. Stephen’s Catacombs Tour',detail:'Guided underground tour; ticket time around 10:00.',kind:'fixed'},
 {dur:30,title:'Belvedere Gardens + Exterior',detail:'Formal gardens, fountains, palace exterior photos.',kind:'fixed'},
 {dur:40,title:'St. Stephen’s North Tower',detail:'Elevator view near Pummerin bell and roof tiles.',kind:'fixed'},
 {dur:50,title:'Maria-Theresien-Platz + MQ Exterior',detail:'Architecture and low-stress square/courtyard walk.',kind:'fixed'},
 {dur:60,title:'Auer-Welsbach-Park Break',detail:'Shade and lawns near Schönbrunn/Hietzing.',kind:'fixed'},
 {dur:60,title:'Botanical Garden / Schweizergarten Park Break',detail:'Park rest near Belvedere.',kind:'fixed'},
 {dur:60,title:'Schönbrunn Palm House',detail:'Greenhouse; about EUR 9.',kind:'option'},
 {dur:60,title:'Schönbrunn Desert House',detail:'Desert greenhouse; about EUR 7.',kind:'option'},
 {dur:60,title:'Karlskirche',detail:'Baroque church interior and panoramic lift.',kind:'fixed'},
 {dur:75,title:'Danube Canal + Schwedenplatz Walk',detail:'Flexible tired-day waterfront/city walk.',kind:'option'},
 {dur:75,title:'Rathaus + Parliament + Ringstrasse Walk',detail:'Architecture walk before dinner.',kind:'option'},
 {dur:75,title:'Quintessenz Organ Festival',detail:'Organ + violin concert; student price noted as EUR 8.',kind:'option'},
 {dur:90,title:'Schönbrunn Gardens',detail:'Garden axis, fountains, exterior views.',kind:'fixed'},
 {dur:105,title:'VOLXkino Open-Air Film',detail:'Free outdoor cinema; later return.',kind:'option'},
 {dur:150,title:'Upper Belvedere Gallery',detail:'Klimt, The Kiss, Austrian art, Baroque rooms.',kind:'fixed'},
 {dur:150,title:'Kunsthistorisches Museum',detail:'Major art/history museum with Kunstkammer and grand staircase.',kind:'fixed'},
 {dur:165,title:'Schönbrunn Palace',detail:'Imperial state rooms and Habsburg apartments.',kind:'fixed'},
 {dur:180,title:'DDSG Evening Sightseeing / Dinner Cruise',detail:'Evening river / canal cruise.',kind:'option'},
 {dur:180,title:'DDSG Heurigen Cruise with Viennese Songs',detail:'Boat ride with Viennese songs and Heurigen-style food.',kind:'option'}
];
const foodOptions={
 Breakfast:[
  ['Cafe Eiles','Day 1/3 · Viennese coffeehouse · mostly EUR 10-20 · 6-12 min'],['Cafe Hummel','Day 1/3 · neighborhood Viennese cafe · EUR 7-19 · 7-13 min'],['Schönbrunner Schlosscafe','Day 2 · palace-area cafe breakfast · 30 min'],['Gerstner Schönbrunn','Day 2 · Viennese cafe / pastry · 30 min'],['Bäckerei Café Felzl','Bakery breakfast · early practical option'],['Ströck Feierabend Burggasse','Austrian bakery-cafe · early practical option'],['POC - People on Caffeine','Specialty coffee / light breakfast'],['Jonas Reindl Coffee Roasters','Specialty coffee · Day 3 option'],['Oefferl Bio-Bäckerei & Bistro','Organic bakery / bistro'],['ULRICH','Modern brunch']
 ],
 Lunch:[
  ['Anna’s Schnitzel Stube','Austrian schnitzel · cheap/local near hotel'],['Zur Böhmischen Kuchl','Bohemian/Austrian · weekday-only'],['Salm Bräu','Austrian brewery food near Belvedere'],['Cafe Goldegg','Viennese cafe near Belvedere'],['Della Lucia','Italian/European near Schönbrunn'],['Cafe Raimann','Viennese cafe / Austrian casual near Schönbrunn'],['Fromme Helene','Austrian / Viennese near museum/hotel side'],['Cafe Landtmann','Classic Viennese cafe near center'],['Via Toledo Enopizzeria','Pizza, very close to hotel'],['Pizzeria Scarabocchio','Pizza/pasta fallback'],['Cafe Merkur','Cheap neighborhood cafe'],['Schnitzelwirt','Austrian schnitzel'],['Gasthaus Rebhuhn','Traditional Austrian Beisl'],['Das Kolin','European cafe-restaurant']
 ],
 Dinner:[
  ['Figlmüller Bäckerstraße','Viennese schnitzel / Austrian'],['Griechenbeisl','Historic Austrian restaurant'],['Rebhuhn','Austrian pub / schnitzel / goulash'],['Cafe Benno','Casual Austrian / cafe-pub'],['Das Käuzchen','Austrian Beisl'],['Wildling Restaurant & Bar','Modern Austrian regional tapas'],['Fromme Helene','Classic Austrian'],['Restaurant Marienhof','Austrian / Wiener'],['Batoni Restaurant','Georgian, budget-friendly'],['Der Wiener Deewan','Pakistani buffet, pay-as-you-wish'],['Alt Wiener Gastwirtschaft Schilling','Traditional Austrian']
 ]
};
const treats={
 'Old center / Cathedral / Hofburg':[['Eis-Greissler Rotenturmstrasse','Creative Austrian ice cream · about 3-8 min from cathedral/Hofburg route'],['Zanoni & Zanoni','Classic central ice cream / gelato / pastries · 5-7 min from St. Stephen’s'],['Leones Gelato','Well-known gelato · 10-15 min from Hofburg / center']],
 'Schönbrunn / Hietzing':[['Eis-Greissler Schönbrunn ice-cream bikes','Official ice-cream bikes inside palace park'],['Cafe Dommayer','Traditional cafe/cake stop near Hietzing'],['Landtmann Jausen Station','Palace-park cafe for cake, cold drinks, and treats']],
 'Belvedere / Karlskirche':[['Ferrari Natural Gelato','Gelato near Karlskirche / Belvedere route'],['Veganista IV','Popular vegan ice cream chain near area'],['Schelato','Small gelato shop near route if using transit']],
 'Schwedenplatz / Cruise / Evening center':[['Eissalon am Schwedenplatz','Very convenient before/after cruise'],['Gelateria Castelletto','Central gelato/cake cafe near Schwedenplatz'],['Eis-Greissler Rotenturmstrasse','Creative Austrian ice cream close to old center']],
 'Hotel / Josefstadt area':[['Leones Gelato','Gelato near Josefstadt route'],['Schelato','Gelato near Josefstadt / Neubau side'],['Gelateria La Romana','Gelato/frozen desserts; best if already near Neubau']]
};

let state=loadState();
let drag={mode:null,dayId:null,itemId:null,newItem:null};
function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||structuredClone(initialDays)}catch{return structuredClone(initialDays)}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function toast(msg){let t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1400)}
function itemTitle(item){if(item.base&&item.options){return `${item.base}: ${item.options[item.selected||0]}`}return item.title}
function render(){renderDays();renderEventOptions();renderFoodOptions();renderTreats();saveState()}
function renderDays(){el('days').innerHTML=state.map(day=>{
 let current=toMin(day.start), cards='';
 day.items.forEach((item,idx)=>{const start=current,end=current+item.dur;current=end;cards+=cardHTML(day.id,item,idx,start,end)});
 return `<article class="day"><div class="day-head"><p class="eyebrow">Vienna</p><h2>${day.title}</h2><div class="day-meta"><span>${day.date}</span><span>Start ${day.start}</span><span>Ends ${toTime(current)}</span></div></div><div class="day-list" data-day="${day.id}">${cards}</div></article>`}).join('');
 bindScheduleDnD();bindButtons();}
function cardHTML(dayId,item,idx,start,end){
 const chips=(item.options||[]).map((o,i)=>`<button class="option-chip ${i===(item.selected||0)?'active':''}" data-day="${dayId}" data-item="${item.id}" data-select="${i}">${o}</button>`).join('');
 const tags=(item.tags||[]).concat(item.kind).map(t=>`<span class="tag">${t}</span>`).join('');
 return `<section class="event-card" draggable="true" data-kind="${item.kind}" data-day="${dayId}" data-item="${item.id}"><div class="time-row"><span class="time">${toTime(start)}-${toTime(end)}</span><span class="duration">${item.dur} min</span></div><div class="title-row"><h3>${itemTitle(item)}</h3><div class="reorder"><button data-move="up" data-day="${dayId}" data-item="${item.id}">↑</button><button data-move="down" data-day="${dayId}" data-item="${item.id}">↓</button></div></div><p class="note">${item.note||''}</p><div class="tags">${chips}${tags}</div></section>`}
function bindScheduleDnD(){
 document.querySelectorAll('.event-card').forEach(card=>{
  card.addEventListener('dragstart',e=>{drag={mode:'move',dayId:card.dataset.day,itemId:card.dataset.item};card.classList.add('dragging');e.dataTransfer.effectAllowed='move'});
  card.addEventListener('dragend',()=>card.classList.remove('dragging'));
  card.addEventListener('dragover',e=>e.preventDefault());
  card.addEventListener('drop',e=>{e.preventDefault();handleDrop(card.dataset.day,card.dataset.item)});
 });
 document.querySelectorAll('.day-list').forEach(list=>{
  list.addEventListener('dragover',e=>{e.preventDefault();list.classList.add('drag-over')});
  list.addEventListener('dragleave',()=>list.classList.remove('drag-over'));
  list.addEventListener('drop',e=>{e.preventDefault();list.classList.remove('drag-over');handleDrop(list.dataset.day,null)});
 });
}
function bindButtons(){
 document.querySelectorAll('[data-move]').forEach(b=>b.addEventListener('click',()=>moveButton(b.dataset.day,b.dataset.item,b.dataset.move)));
 document.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>{const d=state.find(x=>x.id===b.dataset.day);const it=d.items.find(x=>x.id===b.dataset.item);it.selected=Number(b.dataset.select);render()}));
}
function handleDrop(targetDayId,beforeItemId){
 if(!drag.mode)return;
 const target=state.find(d=>d.id===targetDayId);
 if(drag.mode==='new'){
  const item={...drag.newItem,id:uid()};
  const at=beforeItemId?target.items.findIndex(i=>i.id===beforeItemId):target.items.length;
  target.items.splice(at<0?target.items.length:at,0,item);render();toast('Added to schedule');return;
 }
 const source=state.find(d=>d.id===drag.dayId);const idx=source.items.findIndex(i=>i.id===drag.itemId);if(idx<0)return;
 const [item]=source.items.splice(idx,1);let at=beforeItemId?target.items.findIndex(i=>i.id===beforeItemId):target.items.length;if(at<0)at=target.items.length;target.items.splice(at,0,item);render();toast('Schedule updated');
}
function moveButton(dayId,itemId,dir){const d=state.find(x=>x.id===dayId);const i=d.items.findIndex(x=>x.id===itemId);const j=dir==='up'?i-1:i+1;if(i<0||j<0||j>=d.items.length)return;[d.items[i],d.items[j]]=[d.items[j],d.items[i]];render()}
function renderEventOptions(){
 const groups={};eventOptions.forEach(o=>{(groups[o.dur]??=[]).push(o)});
 el('eventOptions').innerHTML=Object.keys(groups).sort((a,b)=>a-b).map(k=>bucketHTML(`${k} minutes`,groups[k].map(o=>optionHTML(o.title,o.detail,{kind:o.kind||'option',title:o.title,dur:Number(k),note:o.detail,tags:['added']})).join(''))).join('');bindOptionDrag();}
function renderFoodOptions(){
 el('foodOptions').innerHTML=Object.entries(foodOptions).map(([meal,items])=>bucketHTML(meal,items.map(([name,detail])=>optionHTML(name,detail,{kind:'food',base:meal,selected:0,options:[name],dur:meal==='Breakfast'?30:meal==='Lunch'?60:90,note:detail,tags:['food']})).join(''))).join('');bindOptionDrag();}
function renderTreats(){
 el('treatOptions').innerHTML=Object.entries(treats).map(([loc,items])=>bucketHTML(loc,items.map(([name,detail])=>optionHTML(name,detail,{kind:'option',title:name,dur:20,note:detail,tags:['ice cream','treat']})).join(''))).join('');bindOptionDrag();}
function bucketHTML(title,inner){return `<div class="bucket"><h3>${title}</h3>${inner}</div>`}
function optionHTML(name,detail,item){return `<div class="option-card" draggable="true" data-new='${JSON.stringify(item).replaceAll("'",'&apos;')}'><strong>${name}</strong><span>${detail}</span><span class="mini">Drag into a day</span></div>`}
function bindOptionDrag(){document.querySelectorAll('.option-card').forEach(c=>c.addEventListener('dragstart',e=>{drag={mode:'new',newItem:JSON.parse(c.dataset.new.replaceAll('&apos;',"'"))};e.dataTransfer.effectAllowed='copy'}))}

el('saveBtn').addEventListener('click',()=>{saveState();toast('Saved on this device')});
el('resetBtn').addEventListener('click',()=>{state=structuredClone(initialDays);saveState();render();toast('Vienna reset')});
render();
