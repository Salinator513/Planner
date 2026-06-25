let lastMovedId=null;
let lastDurationId=null;
const expanded=new Set();
const markMoved=id=>{lastMovedId=id;};
const markDuration=id=>{lastDurationId=id;lastMovedId=id;};

const oldCardHTML=cardHTML;
cardHTML=function(dayId,item,idx,start,end){
  const isOpen=expanded.has(item.id);
  const chips=(item.options||[]).map((o,i)=>`<button class="option-chip ${i===(item.selected||0)?'active':''}" data-day="${dayId}" data-item="${item.id}" data-select="${i}">${o}</button>`).join('');
  const tags=(item.tags||[]).concat(item.kind).map(t=>`<span class="tag">${t}</span>`).join('');
  return `<section class="event-card ${isOpen?'open':''}" draggable="true" data-kind="${item.kind}" data-day="${dayId}" data-item="${item.id}">
    <div class="tap-zone" data-open="${item.id}">
      <div class="time-row"><span class="time">${toTime(start)}-${toTime(end)}</span><span class="duration">${item.dur} min</span></div>
      <div class="title-row"><h3>${itemTitle(item)}</h3><button class="open-btn" data-open="${item.id}" aria-label="Open event">${isOpen?'×':'+'}</button></div>
    </div>
    <div class="card-details">
      <p class="note">${item.note||''}</p>
      <div class="time-tools"><button data-duration="-10" data-day="${dayId}" data-item="${item.id}">−10</button><span>${item.dur} min</span><button data-duration="10" data-day="${dayId}" data-item="${item.id}">+10</button></div>
      <div class="reorder"><button data-move="up" data-day="${dayId}" data-item="${item.id}">↑</button><button data-move="down" data-day="${dayId}" data-item="${item.id}">↓</button></div>
      <div class="tags">${chips}${tags}</div>
    </div>
  </section>`;
};

const oldBindButtons=bindButtons;
bindButtons=function(){
  oldBindButtons();
  document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const id=b.dataset.open;
    expanded.has(id)?expanded.delete(id):expanded.add(id);
    markMoved(id);
    render();
  }));
  document.querySelectorAll('[data-duration]').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const d=state.find(x=>x.id===b.dataset.day);
    const it=d?.items.find(x=>x.id===b.dataset.item);
    if(!it)return;
    it.dur=Math.max(10,(it.dur||10)+Number(b.dataset.duration));
    expanded.add(it.id);
    markDuration(it.id);
    render();
    toast(`${it.dur} min`);
  }));
};

const oldRenderDays=renderDays;
renderDays=function(){
  oldRenderDays();
  document.querySelectorAll('.day-list').forEach(list=>{
    list.classList.add('reflowing');
    setTimeout(()=>list.classList.remove('reflowing'),360);
  });
  if(lastMovedId){
    const moved=document.querySelector(`.event-card[data-item="${lastMovedId}"]`);
    if(moved){
      moved.classList.add('moved','just-switched');
      setTimeout(()=>moved.classList.remove('just-switched'),900);
      moved.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});
    }
  }
  if(lastDurationId){
    const changed=document.querySelector(`.event-card[data-item="${lastDurationId}"]`);
    if(changed){
      changed.classList.add('duration-changed');
      setTimeout(()=>changed.classList.remove('duration-changed'),700);
    }
  }
};

const oldHandleDrop=handleDrop;
handleDrop=function(targetDayId,beforeItemId){
  const movedId=drag?.mode==='new'?null:drag?.itemId;
  oldHandleDrop(targetDayId,beforeItemId);
  if(movedId){markMoved(movedId);expanded.add(movedId);render();toast('Updated');}
  else if(lastMovedId){render();}
};

const oldMoveButton=moveButton;
moveButton=function(dayId,itemId,dir){
  markMoved(itemId);
  expanded.add(itemId);
  oldMoveButton(dayId,itemId,dir);
  toast('Updated');
};

const oldOptionHTML=optionHTML;
optionHTML=function(name,detail,item){
  return oldOptionHTML(name,detail,item).replace('class="option-card"','class="option-card compact-option"');
};
render();
