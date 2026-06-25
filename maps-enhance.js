const mapsUrl=q=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q+' Vienna')}`;
const embedUrl=q=>`https://maps.google.com/maps?q=${encodeURIComponent(q+' Vienna')}&output=embed`;
const cleanMapName=item=>{
  const title=itemTitle(item).replace(/^Breakfast: |^Lunch.*?: |^Dinner: |^Pre-dinner option: |^Afternoon replacement option: |^Evening option: |^Final cruise option: /,'');
  if(title.includes('Transit')) return 'Vienna public transport';
  if(title.includes('Wake up')) return 'Laudongasse 8 Vienna';
  if(title.includes('Return to hotel')) return 'Laudongasse 8 Vienna';
  return title;
};
const sentenceForTitle=title=>{
  if(title.includes('St. Stephen')) return 'This stop is centered on Vienna’s old town landmark, so it is worth treating it as more than a quick photo stop: look at the Gothic exterior, the roof pattern, the interior details, and how the cathedral sits in the middle of the city.';
  if(title.includes('Belvedere')) return 'This is one of the strongest palace-and-art blocks in the plan, combining Baroque architecture with major Austrian artwork, so it works best when you move through it slowly rather than trying to rush to the next stop.';
  if(title.includes('Schönbrunn')) return 'This is the main imperial palace day, so the goal is to balance the formal rooms with the gardens and nearby rest time instead of making the whole day feel like one long museum visit.';
  if(title.includes('Kunsthistorisches')||title.includes('Museum')) return 'This is a heavy museum block with major art and historic collections, so pick a few highlights to focus on and use the architecture of the building itself as part of the experience.';
  if(title.includes('Karlskirche')) return 'This church block is mostly about the Baroque interior, the dome frescoes, and the unusual viewing experience, so it works well as a shorter but memorable stop after the museum portion of the day.';
  if(title.includes('Cruise')||title.includes('DDSG')) return 'This is the day-ending experience block, meant to slow the pace down and let the evening feel different from the walking and museum sections earlier in the itinerary.';
  if(title.includes('Park')||title.includes('Garden')||title.includes('Volksgarten')||title.includes('Schweizergarten')) return 'This is not filler time; it is a recovery block. Use it to sit, cool down, refill water, review the next route, and keep the rest of the day from feeling overpacked.';
  if(title.includes('Breakfast')) return 'This is a practical start block: keep it simple, avoid a long sit-down meal unless the day starts slowly, and use it to set up the first route without losing too much morning time.';
  if(title.includes('Lunch')) return 'This is a reset point in the middle of the day. The best choice is the place that keeps walking low, gives you a real break, and does not pull the schedule away from the next major stop.';
  if(title.includes('Dinner')) return 'This is the main evening food block, so it should be comfortable and close to the next/last activity rather than chosen only because it looks best on a list.';
  if(title.includes('Transit')||title.includes('Walk to')||title.includes('Return')) return 'This block is a timing cushion as much as transportation. Keep it in the schedule so route changes, walking speed, ticket entrances, and tiredness do not break the rest of the day.';
  if(title.includes('Wake up')) return 'This is the start buffer for getting ready, checking tickets, charging phones, and leaving with enough time that the first real stop does not immediately feel rushed.';
  return 'This is a flexible schedule block. Use the map preview, duration controls, and nearby options to decide whether it still fits the day once you see how tired you are and how much travel time remains.';
};
const richDetail=item=>{
  const title=itemTitle(item);
  const kind=item.kind||'event';
  const base=item.note||'';
  const extras=[];
  extras.push(sentenceForTitle(title));
  if(kind==='food') extras.push('Use the option buttons to switch restaurants, then open the map for the selected place before committing to it. Prioritize convenience over chasing a far-away restaurant.');
  if(kind==='fixed') extras.push('This is treated as a core stop in the day, so move it only if you are intentionally rebuilding the route. If the day runs late, shorten the surrounding flexible blocks first.');
  if(kind==='option') extras.push('This is intentionally flexible. Choose it when the timing, weather, and energy level make sense; otherwise swap it with another option of similar duration.');
  if(kind==='transit') extras.push('If Google Maps shows a faster or slower route, use the +10 or −10 buttons so every later time updates automatically.');
  if(title.includes('Park')||title.includes('Gardens')) extras.push('Do not skip every rest block; one calm hour can make the evening part of the day much better.');
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
 const longer=`${detail}. Add this only if it fits the surrounding route and does not create an awkward backtrack.`;
 return `<div class="option-card compact-option" draggable="true" data-new='${JSON.stringify(item).replaceAll("'",'&apos;')}'><strong>${name}</strong><span>${longer}</span><a class="option-map" href="${mapsUrl(q)}" target="_blank" rel="noopener">Map</a></div>`;
};
render();
