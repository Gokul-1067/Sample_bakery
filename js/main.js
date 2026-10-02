// MAANNAPPAM BAKERY & CAFE — Animation Engine & Interactivity

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('done');
  }, 850);
});

// Register GSAP ScrollTrigger if available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Reveal animations via IntersectionObserver (safe for CSS grid and flex items)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Animated Number Counters
document.querySelectorAll('[data-count]').forEach((el) => {
  const end = +el.dataset.count;
  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString() + (end >= 1000 ? '+' : (el.dataset.suffix || ''));
          }
        });
      }
    });
  } else {
    el.textContent = end.toLocaleString();
  }
});

// 3D Perspective Tilt on interactive cards (Hero visual, Worlds, Quotes, Team, Values)
document.querySelectorAll('.tilt').forEach((card) => {
  if (card.classList.contains('item') || card.classList.contains('prod')) return;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Custom Magnetic Cursor
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  (function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(renderCursor);
  })();

  // Cursor scaling on links and buttons
  document.querySelectorAll('a, button, .magnetic, .world, .item').forEach((interactive) => {
    interactive.addEventListener('mouseenter', () => {
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'var(--orange)';
    });
    interactive.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'var(--lime)';
    });
  });
}

// Magnetic Button Physics
document.querySelectorAll('.magnetic').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Mobile Burger Navigation
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
  });
});

// Floating Bakery Particles Canvas
const floatCanvas = document.getElementById('floaters');
if (floatCanvas) {
  const ctx = floatCanvas.getContext('2d');
  let width, height;
  let particles = [];
  const bakeryEmojis = ['🥐', '🥖', '🥟', '🥨', '☕', '🍰', '🧁', '🍪'];

  function resizeCanvas() {
    width = floatCanvas.width = floatCanvas.offsetWidth;
    height = floatCanvas.height = floatCanvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  for (let i = 0; i < 22; i++) {
    particles.push({
      emoji: bakeryEmojis[i % bakeryEmojis.length],
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 800),
      size: 18 + Math.random() * 24,
      speed: 0.35 + Math.random() * 0.75,
      oscillation: Math.random() * Math.PI * 2
    });
  }

  (function animateParticles() {
    if (!width || !height) return;
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 0.45;

    particles.forEach((p) => {
      p.y -= p.speed;
      p.oscillation += 0.012;
      if (p.y < -40) {
        p.y = height + 40;
        p.x = Math.random() * width;
      }
      ctx.font = `${p.size}px serif`;
      const waveX = (p.x + Math.sin(p.oscillation) * 22) % width;
      ctx.fillText(p.emoji, waveX < 0 ? waveX + width : waveX, p.y);
    });

    requestAnimationFrame(animateParticles);
  })();
}

// Procedural Film Grain Canvas Overlay
const grainCanvas = document.getElementById('grain');
if (grainCanvas) {
  const gCtx = grainCanvas.getContext('2d');
  grainCanvas.width = 180;
  grainCanvas.height = 180;

  setInterval(() => {
    const imgData = gCtx.createImageData(180, 180);
    const buffer = imgData.data;
    for (let i = 0; i < buffer.length; i += 4) {
      const val = Math.random() * 255;
      buffer[i] = val;
      buffer[i + 1] = val;
      buffer[i + 2] = val;
      buffer[i + 3] = 255;
    }
    gCtx.putImageData(imgData, 0, 0);
  }, 110);
}

// Category Navigation Filter on Menu page
const catButtons = document.querySelectorAll('.cat-nav button');
catButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    catButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const targetSection = document.querySelector(btn.dataset.target);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(targetSection, { scale: 0.98, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
    }
  });
});

// Hero Intro Animations
if (typeof gsap !== 'undefined') {
  gsap.from('.mega', { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.8 });
  gsap.from('.hero-visual', { x: 80, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 1.0 });
  gsap.from('.lede, .hero-btns, .hero-stats', { y: 40, opacity: 0, duration: 1.0, ease: 'power2.out', delay: 1.1, stagger: 0.15 });
}
