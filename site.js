const setupCarousel=(element,previousButton,nextButton,delay)=>{
  if(!element)return;
  const step=()=>{
    const item=element.querySelector(':scope > *');
    if(!item)return Math.max(280,element.clientWidth);
    const gap=parseFloat(getComputedStyle(element).columnGap)||0;
    return item.getBoundingClientRect().width+gap;
  };
  const next=()=>{
    const atEnd=element.scrollLeft+element.clientWidth>=element.scrollWidth-12;
    element.scrollTo({left:atEnd?0:element.scrollLeft+step(),behavior:'smooth'});
  };
  previousButton?.addEventListener('click',()=>element.scrollBy({left:-step(),behavior:'smooth'}));
  nextButton?.addEventListener('click',next);
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    let timer=setInterval(next,delay);
    const pause=()=>clearInterval(timer);
    const resume=()=>{clearInterval(timer);timer=setInterval(next,delay)};
    element.addEventListener('pointerenter',pause);
    element.addEventListener('pointerleave',resume);
    element.addEventListener('focusin',pause);
    element.addEventListener('focusout',resume);
  }
};

setupCarousel(document.getElementById('carousel'),document.querySelector('.carousel-shell .left'),document.querySelector('.carousel-shell .right'),3200);
setupCarousel(document.getElementById('testimonialCarousel'),document.querySelector('.testi-left'),document.querySelector('.testi-right'),3800);

const purchase=document.getElementById('purchase');
if(purchase){
  const names=['Cláudia garantiu o guia','Marcos começou os 21 dias','Sandra recebeu o acesso'];
  let index=0;
  setTimeout(()=>purchase.classList.add('show'),4500);
  setInterval(()=>{
    purchase.classList.remove('show');
    setTimeout(()=>{
      index=(index+1)%names.length;
      purchase.querySelector('strong').textContent=names[index];
      purchase.classList.add('show');
    },500);
  },7500);
}
