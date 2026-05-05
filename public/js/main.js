// deciDATA — main.js (defer-loaded, PROYECTOS is injected inline before this)

function initNavbar() {
  const nav = document.getElementById('nav');
  const bar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    if (bar) {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = pct + '%';
    }
  }, { passive: true });

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  ['proyectos', 'acerca', 'valoraciones', 'contacto'].forEach(id => {
    const el = document.getElementById(id);
    if (el) navObs.observe(el);
  });
}

function initDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const overlay   = document.getElementById('nav-overlay');

  function openDrawer() {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  window._closeDrawer = function() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    hamburger.getAttribute('aria-expanded') === 'true' ? window._closeDrawer() : openDrawer();
  });
  overlay.addEventListener('click', window._closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') window._closeDrawer(); });
}

function initSmoothScroll() {
  function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    if (window._closeDrawer) window._closeDrawer();
    const id = href.slice(1);
    const detail = document.getElementById('project-detail');
    if (detail?.classList.contains('active')) {
      detail.classList.remove('active');
      document.getElementById('main-content').style.display = '';
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }
  document.querySelectorAll('.nav-link, .drawer-link').forEach(a => {
    a.addEventListener('click', handleAnchorClick);
  });
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  const procesoTimeline = document.querySelector('.proceso__timeline');
  if (procesoTimeline) {
    const procesoObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        procesoObs.unobserve(entry.target);
        entry.target.querySelectorAll('.proceso__paso').forEach((paso, i) => {
          setTimeout(() => paso.classList.add('visible'), i * 150);
        });
      });
    }, { threshold: 0.2 });
    procesoObs.observe(procesoTimeline);
  }
}

function initFilters() {
  document.querySelectorAll('.filtro').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filtro').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      const filtro = this.dataset.filtro;
      document.querySelectorAll('.proyecto-card').forEach(card => {
        card.classList.toggle('oculta', filtro !== 'todos' && card.dataset.categoria !== filtro);
      });
    });
  });
}

function initCounters() {
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    function animateCount(el) {
      const target = +el.dataset.target;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const dur = 1800, start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = prefix + Math.round((1 - Math.pow(1 - t, 3)) * target) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        statsObs.unobserve(entry.target);
        entry.target.querySelectorAll('.stats__item').forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'none';
            const num = item.querySelector('.stats__number');
            if (num && !num.dataset.static) animateCount(num);
          }, i * 100);
        });
      });
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
  }

  function runCountUp(el) {
    const target = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const dur = 1400, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.round((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = prefix + (val >= 1000 ? Math.round(val / 1000) + 'k' : val);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { runCountUp(e.target); countObs.unobserve(e.target); }
    });
  }, { threshold: 0 });
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));
}

function initSlider() {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;
  const total = track.querySelectorAll('.review-card').length;
  const dots  = document.querySelectorAll('.dot');
  let idx = 0, startX = 0;

  function isDesktop() { return window.innerWidth > 900; }

  function goTo(i) {
    if (isDesktop()) return;
    idx = ((i % total) + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  document.querySelector('.slider-btn--prev')?.addEventListener('click', () => goTo(idx - 1));
  document.querySelector('.slider-btn--next')?.addEventListener('click', () => goTo(idx + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));

  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = startX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) goTo(delta > 0 ? idx + 1 : idx - 1);
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (isDesktop()) { track.style.transform = ''; idx = 0; dots.forEach((d, j) => d.classList.toggle('active', j === 0)); }
  }, { passive: true });
}

function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitBtn = document.getElementById('submitBtn');
  const mensaje   = document.getElementById('formMensaje');
  const ENDPOINT  = 'https://formspree.io/f/mpqbdvyz';

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.querySelector('.btn-submit__text').hidden = on;
    submitBtn.querySelector('.btn-submit__loading').hidden = !on;
  }

  function showMsg(type, text) {
    mensaje.className = 'form-mensaje ' + type;
    mensaje.textContent = text;
    mensaje.hidden = false;
  }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre   = form.nombre.value.trim();
    const negocio  = form.negocio.value.trim();
    const problema = form.problema.value.trim();
    const email    = form.email.value.trim();
    let ok = true;

    [form.nombre, form.negocio, form.problema, form.email].forEach(el => el.classList.remove('input-error'));
    mensaje.hidden = true;

    if (!nombre)          { form.nombre.classList.add('input-error');   ok = false; }
    if (!negocio)         { form.negocio.classList.add('input-error');  ok = false; }
    if (!problema)        { form.problema.classList.add('input-error'); ok = false; }
    if (!validEmail(email)){ form.email.classList.add('input-error');   ok = false; }
    if (!ok) { showMsg('error', 'Completá todos los campos correctamente.'); return; }

    setLoading(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ nombre, negocio, problema, email })
      });
      if (res.ok) { showMsg('success', '¡Consulta enviada! Te respondo pronto.'); form.reset(); }
      else throw new Error();
    } catch {
      showMsg('error', 'Hubo un error. Escribime por WhatsApp.');
    } finally {
      setLoading(false);
    }
  });
}

function initFloatingButton() {
  setTimeout(() => {
    const btn = document.getElementById('floatWa');
    if (btn) btn.classList.add('visible');
  }, 2000);
}

// Exposed globally for inline onclick attrs in Nunjucks template
function openProject(i) {
  const destacados = Object.values(PROYECTOS).filter(p => p.destacado).sort((a, b) => (a.orden || 99) - (b.orden || 99));
  const p = destacados[i];
  if (!p) return;

  const logoHTML     = p.logo    ? `<img src="${p.logo}" alt="Logo ${p.titulo}" class="detail-logo">` : '';
  const mockupHTML   = p.mockup  ? `<img src="${p.mockup}" alt="Sistema de gestión ${p.titulo} — deciDATA" class="detail-mockup">` : '';
  const featuresHTML = (p.funcionalidades || []).map(f => `<div class="feature-chip"><div class="feature-dot"></div>${f}</div>`).join('');
  const resultsHTML  = (p.resultados || []).map(r => `<div class="result-card"><div class="result-text">${r}</div></div>`).join('');

  document.getElementById('detail-content').innerHTML = `
    <div class="detail-header">
      ${logoHTML}
      <div class="detail-tag">${p.tag}</div>
      <h1 class="detail-title">${p.titulo}</h1>
      <p class="detail-desc">${p.descripcion}</p>
    </div>
    ${mockupHTML}
    <div class="detail-quote"><p>"${p.quote}"</p><cite>— ${p.quoteAutor}</cite></div>
    <div class="detail-section-title">El problema</div>
    <p class="detail-problem">${p.problema}</p>
    <div class="detail-section-title">Funcionalidades</div>
    <div class="features-grid">${featuresHTML}</div>
    <div class="detail-section-title">Resultados</div>
    <div class="results-grid">${resultsHTML}</div>
    <div class="detail-section-title">Solución</div>
    <div class="solution-tag">→ ${p.solucion}</div>
  `;

  document.getElementById('main-content').style.display = 'none';
  document.getElementById('project-detail').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
  document.getElementById('project-detail').classList.remove('active');
  document.getElementById('main-content').style.display = '';
  setTimeout(() => document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

// Boot
initNavbar();
initDrawer();
initSmoothScroll();
initReveal();
initFilters();
initCounters();
initSlider();
initForm();
initFloatingButton();
