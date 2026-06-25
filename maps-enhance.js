const mapsUrl=q=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q+' Vienna')}`;
const embedUrl=q=>`https://maps.google.com/maps?q=${encodeURIComponent(q+' Vienna')}&output=embed`;
const cleanMapName=item=>{
  const title=itemTitle(item).replace(/^Breakfast: |^Lunch.*?: |^Dinner: |^Pre-dinner option: |^Afternoon replacement option: |^Evening option: |^Final cruise option: /,'');
  if(title.includes('Transit')) return 'Vienna public transport';
  if(title.includes('Wake up')) return 'Laudongasse 8 Vienna';
  if(title.includes('Return to hotel')) return 'Laudongasse 8 Vienna';
  return title;
};
const richDetail=item=>{
  const title=itemTitle(item);
  const kind=item.kind||'event';
  const base=item.note||'';
  const extras=[];
  if(kind==='food') extras.push('Food block: use the option buttons above to switch restaurants, then open the map for the selected place.');
  if(kind==='fixed') extras.push('Main stop: keep this unless you are intentionally rebuilding the day.');
  if(kind==='option') extras.push('Flexible option: good place to swap depending on weather, energy, or timing.');
  if(kind==='transit') extras.push('Travel buffer: adjust this if the route is shorter or longer in Google Maps.');
  if(title.includes('Park')||title.includes('Gardens')) extras.push('Best use: sit down, refill water, and avoid stacking too many museum/church blocks without a break.');
  return [base,...extras].filter(Boolean).join(' ');
};
cardHTML=function(dayId,item,idx,start,end){
 const open=expanded.has(item.id);
 const title=itemTitle(item);
 const q=cleanMapName(item);
 const chips=(item.options||[]).map((o,i)=>`<button class="option-chip ${i===(item.selected||0)?'active':''}" data-day="${dayId}" data-item="${item.id}" data-select="${i}">${o}</button>`).join('');
 const tags=(item.tags||[]).concat(item.kind).map(t=>`<span class="tag">${t}</span>`).join('');
 return `<section class="event-card ${open?'open':''}" draggable="true" data-kind="${item.kind}" data-day="${dayId}" data-item="${item.id}"><div class="tap-zone" data-open="${item.id}"><div class="time-row"><span class="time">${toTime(start)}-${toTime(end)}</span><span class="duration">${item.dur} min</span></div><div class="title-row"><h3>${title}</h3><button class="open-btn" data-open="${item.id}" aria-label="Open event">${open?'×':'+'}</button></div></div><div class="card-details"><p class="note">${richDetail(item)}</p><div class="map-actions"><a class="map-btn" href="${mapsUrl(q)}" target="_blank" rel="noopener">Open map</a><span>${q}</span></div><iframe class="map-preview" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${embedUrl(q)}"></iframe><div class="time-tools"><button data-duration="-10" data-day="${dayId}" data-item="${item.id}">−10</button><span>${item.dur} min</span><button data-duration="10" data-day="${dayId}" data-item="${item.id}">+10</button></div><div class="reorder"><button data-move="up" data-day="${dayId}" data-item="${item.id}">↑</button><button data-move="down" data-day="${dayId}" data-item="${item.id}">↓</button></div><div class="tags">${chips}${tags}</div></div></section>`;
};
optionHTML=function(name,detail,item){
 const q=item.base&&item.options?item.options[0]:name;
 return `<div class="option-card compact-option" draggable="true" data-new='${JSON.stringify(item).replaceAll("'",'&apos;')}'><strong>${name}</strong><span>${detail}</span><a class="option-map" href="${mapsUrl(q)}" target="_blank" rel="noopener">Map</a></div>`;
};
render();
