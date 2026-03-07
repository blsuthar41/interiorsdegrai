// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.querySelector('.float-btn.back-top').style.opacity = window.scrollY > 400 ? '1' : '0';
  document.querySelector('.float-btn.back-top').style.pointerEvents = window.scrollY > 400 ? 'all' : 'none';
});

// ===== NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.innerHTML = navLinks.classList.contains('open') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    if (navToggle) navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ===== ACTIVE NAV =====
function setActiveNav() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}
setActiveNav();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = Date.now();
  const timer = setInterval(() => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
    if (progress >= 1) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-section, .stat-section').forEach(el => counterObserver.observe(el));

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-cat]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    projectCards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? 'block' : 'none';
      card.style.opacity = '0';
      if (show) setTimeout(() => card.style.opacity = '1', 10);
    });
  });
});

// ===== ESTIMATE FORM =====
const estimateForm = document.getElementById('estimateForm');
if (estimateForm) {
  estimateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const service = this.querySelector('[name="service"]').value;
    const message = this.querySelector('[name="message"]').value;
    const subject = `Estimate Request from ${name} - Arcmax Interiors`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@interiorsdegrai.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success message
    const btn = this.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Request Sent!';
    btn.style.background = '#2ecc71';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; this.reset(); }, 3500);
  });
}

// ===== BACK TO TOP =====
document.querySelector('.float-btn.back-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== LIGHTBOX for projects =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    const img = this.querySelector('img');
    const title = this.querySelector('h3')?.textContent;
    if (!img) return;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:99999;
      display:flex;align-items:center;justify-content:center;cursor:pointer;
      animation:fadeInUp 0.3s ease;
    `;
    overlay.innerHTML = `
      <div style="max-width:90vw;max-height:90vh;position:relative">
        <img src="${img.src}" style="max-width:100%;max-height:85vh;object-fit:contain;border-radius:4px;">
        <p style="color:rgba(255,255,255,0.7);text-align:center;margin-top:14px;font-family:Futura,sans-serif;letter-spacing:2px;font-size:14px">${title || ''}</p>
        <button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:-36px;right:0;background:none;border:none;color:white;font-size:26px;cursor:pointer;"><i class='fas fa-times'></i></button>
      </div>
    `;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  });
});

console.log('%cArcmax Interiors', 'color:#845C01;font-size:22px;font-weight:bold;');
console.log('%cWhere Design Meets Flawless Execution.', 'color:#545454;font-size:13px;');
