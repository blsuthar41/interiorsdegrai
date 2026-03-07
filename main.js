/* ═══════════════════════════════════════
   DEGRAI INTERIORS — SHARED JS
═══════════════════════════════════════ */

// ── Navbar scroll ──────────────────────
window.addEventListener('scroll',()=>{
  document.getElementById('navbar')?.classList.toggle('scrolled',scrollY>50);
});

// ── Set active nav link ─────────────────
(function(){
  const page = location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(el=>{
    if(el.dataset.page===page) el.classList.add('active');
  });
})();

// ── AOS Observer ───────────────────────
const _obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});
},{threshold:0.1});
document.querySelectorAll('.aos,.aos-left,.aos-right').forEach(el=>_obs.observe(el));

// ── Counter ────────────────────────────
function _animateCount(el){
  const target=parseInt(el.dataset.count);
  const suffix=el.dataset.suffix||'';
  const dur=1800,step=target/(dur/16);
  let cur=0;
  const tm=setInterval(()=>{
    cur+=step;
    if(cur>=target){el.textContent=target+suffix;clearInterval(tm);}
    else el.textContent=Math.floor(cur)+suffix;
  },16);
}
const _cobs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){_animateCount(e.target);_cobs.unobserve(e.target);}});
},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>_cobs.observe(el));

// ── Mobile nav ─────────────────────────
function toggleMobileNav(){
  const mn=document.getElementById('mobileNav');
  const hb=document.querySelector('.hamburger');
  mn?.classList.toggle('open');
  hb?.classList.toggle('open');
}
document.querySelectorAll('.mobile-nav a').forEach(a=>{
  a.addEventListener('click',()=>{
    document.getElementById('mobileNav')?.classList.remove('open');
    document.querySelector('.hamburger')?.classList.remove('open');
  });
});

// ── Estimate Modal ─────────────────────
function openEstimate(e){if(e)e.preventDefault();document.getElementById('estimateModal')?.classList.add('on');document.body.style.overflow='hidden';}
function closeEstimate(){document.getElementById('estimateModal')?.classList.remove('on');document.body.style.overflow='';}
document.getElementById('estimateModal')?.addEventListener('click',function(e){if(e.target===this)closeEstimate();});

// ── Form submit ────────────────────────
function submitEstimate(e){
  e.preventDefault();
  const fd=new FormData(e.target);
  const sub=encodeURIComponent('Estimate Request – Degrai Interiors');
  const body=encodeURIComponent(
    'New Estimate Request\n\n'+
    'Name: '+(fd.get('name')||'N/A')+'\n'+
    'Phone: '+(fd.get('phone')||'N/A')+'\n'+
    'Email: '+(fd.get('email')||'N/A')+'\n'+
    'Company: '+(fd.get('company')||'N/A')+'\n'+
    'Service: '+(fd.get('service')||'N/A')+'\n\n'+
    'Details:\n'+(fd.get('msg')||'N/A')
  );
  window.location.href=`mailto:info@interiorsdegrai.in?subject=${sub}&body=${body}`;
  closeEstimate();
  e.target.reset();
  setTimeout(()=>alert('✓ Enquiry sent! We will respond within 24 hours.'),400);
}
