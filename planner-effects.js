let lastMovedId=null;
let lastTouchedAt=0;
const markMoved=id=>{lastMovedId=id;lastTouchedAt=Date.now();};
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
};
const oldHandleDrop=handleDrop;
handleDrop=function(targetDayId,beforeItemId){
  const movedId=drag?.mode==='new'?null:drag?.itemId;
  oldHandleDrop(targetDayId,beforeItemId);
  if(movedId){markMoved(movedId);render();toast('Moved and times recalculated');}
  else if(lastMovedId){render();}
};
const oldMoveButton=moveButton;
moveButton=function(dayId,itemId,dir){
  markMoved(itemId);
  oldMoveButton(dayId,itemId,dir);
  toast('Moved and times recalculated');
};
const oldOptionHTML=optionHTML;
optionHTML=function(name,detail,item){
  return oldOptionHTML(name,detail,item).replace('class="option-card"','class="option-card compact-option"');
};
render();
