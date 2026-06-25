const main=document.querySelector('main');
if(main&&!document.querySelector('.quick-jump')){
  const jump=document.createElement('nav');
  jump.className='quick-jump';
  jump.innerHTML='<a href="#d1">Day 1</a><a href="#d2">Day 2</a><a href="#d3">Day 3</a><button id="collapseAll" type="button">Collapse all</button>';
  main.prepend(jump);
}
function stampDayAnchors(){document.querySelectorAll('.day').forEach((day,i)=>day.id=`d${i+1}`)}
const oldRender=render;
render=function(){oldRender();stampDayAnchors()};
document.addEventListener('click',e=>{
  const c=e.target.closest('#collapseAll');
  if(c){expanded.clear();lastMovedId=null;lastDurationId=null;render();toast('Collapsed');}
  const a=e.target.closest('.quick-jump a');
  if(a){e.preventDefault();document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'});}
});
stampDayAnchors();
