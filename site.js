const setupCarousel=({id,prevSelector,nextSelector,delay=3600})=>{
  const el=document.getElementById(id);
  if(!el)return;
  const step=()=>{const card=el.querySelector(':scope > *');return card?card.getBoundingClientRect().width+16:300};
  const next=()=>{const end=el.scrollLeft+el.clientWidth>=el.scrollWidth-8;el.scrollTo({left:end?0:el.scrollLeft+step(),behavior:'smooth'})};
  document.querySelector(prevSelector)?.addEventListener('click',()=>el.scrollBy({left:-step(),behavior:'smooth'}));
  document.querySelector(nextSelector)?.addEventListener('click',next);
  window.setInterval(next,delay);
};
const samplesSection=document.querySelector('.samples');
let sampleMediaReady=false;
const enableSampleMedia=()=>{
  if(sampleMediaReady||!samplesSection)return;
  sampleMediaReady=true;
  samplesSection.classList.add('media-ready');
  setupCarousel({id:'productCarouselTop',prevSelector:'.top-prev',nextSelector:'.top-next',delay:3300});
  setupCarousel({id:'productCarouselBottom',prevSelector:'.bottom-prev',nextSelector:'.bottom-next',delay:4100});
};
if(samplesSection){
  if('IntersectionObserver'in window){
    const sampleObserver=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){enableSampleMedia();sampleObserver.disconnect()}
    },{rootMargin:'600px 0px'});
    sampleObserver.observe(samplesSection);
  }else{window.addEventListener('load',enableSampleMedia,{once:true})}
  const runWhenIdle=window.requestIdleCallback||((callback)=>setTimeout(callback,1600));
  runWhenIdle(enableSampleMedia,{timeout:2400});
}

const upgradeModal=document.getElementById('upgradeModal');
const upgradeDialog=upgradeModal?.querySelector('.upgrade-dialog');
const offerButton=document.querySelector('.buy');
let upgradeLastFocus=null;
const openUpgrade=(event)=>{if(!upgradeModal||!upgradeDialog)return;event?.preventDefault();upgradeLastFocus=document.activeElement;upgradeModal.hidden=false;document.body.classList.add('upgrade-open');requestAnimationFrame(()=>{upgradeModal.classList.add('is-open');upgradeDialog.focus()})};
const closeUpgrade=()=>{if(!upgradeModal)return;upgradeModal.classList.remove('is-open');document.body.classList.remove('upgrade-open');setTimeout(()=>{upgradeModal.hidden=true;upgradeLastFocus?.focus?.()},200)};
offerButton?.addEventListener('click',openUpgrade);
upgradeModal?.querySelectorAll('[data-upgrade-close]').forEach(element=>element.addEventListener('click',closeUpgrade));
document.addEventListener('keydown',event=>{if(!upgradeModal||upgradeModal.hidden)return;if(event.key==='Escape'){closeUpgrade();return}if(event.key!=='Tab')return;const focusable=[...upgradeDialog.querySelectorAll('a[href],button:not([disabled])')];if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
