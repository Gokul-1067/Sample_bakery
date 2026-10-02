// ==========================================================================
// MAANNAPPAM BAKERY & CAFE — KINETIC HEARTH MOTION & INTERACTION ENGINE
// Concept: "Bakery as an Immersive Sensory Experience"
// ==========================================================================

// Preloader Dismissal Function (Safe, fast, and fail-safe)
function dismissPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('done')) {
    preloader.classList.add('done');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 750);
  }
}

// Immediate dismissal triggers
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(dismissPreloader, 200);
  });
} else {
  setTimeout(dismissPreloader, 150);
}

// Fail-safe listeners: window load and a hard safety timeout (1.2s max)
window.addEventListener('load', dismissPreloader);
setTimeout(dismissPreloader, 1200);

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ------------------------------------------------------------------------
  // 1. Sticky Nav Transition
  // ------------------------------------------------------------------------
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Navigation Drawer
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


  // ------------------------------------------------------------------------
  // 3. 3D Parallax & Depth Tilt on Hero Stage
  // ------------------------------------------------------------------------
  const heroStage = document.querySelector('.hero-stage');
  const centerpiece = document.querySelector('.hero-heroic-centerpiece');
  const sat1 = document.querySelector('.sat-1');
  const sat2 = document.querySelector('.sat-2');
  const sat3 = document.querySelector('.sat-3');

  if (heroStage && centerpiece && window.matchMedia('(pointer: fine)').matches) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle 3D tilt for centerpiece
      centerpiece.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;

      // Counter-depth parallax for satellites
      if (sat1) sat1.style.transform = `translate3d(${-x * 32}px, ${-y * 28}px, 30px)`;
      if (sat2) sat2.style.transform = `translate3d(${x * 36}px, ${y * 32}px, 40px)`;
      if (sat3) sat3.style.transform = `translate3d(${-x * 24}px, ${y * 26}px, 20px)`;
    });

    heroStage.addEventListener('mouseleave', () => {
      centerpiece.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
      if (sat1) sat1.style.transform = '';
      if (sat2) sat2.style.transform = '';
      if (sat3) sat3.style.transform = '';
    });
  }

  // ------------------------------------------------------------------------
  // 4. Interactive 4 PM Bell Rush Feature
  // ------------------------------------------------------------------------
  const bellBtn = document.getElementById('bellChimeBtn') || document.querySelector('.bell-interactive-trigger');
  
  // Create toast element dynamically if not present
  let chimeToast = document.querySelector('.chime-toast');
  if (!chimeToast) {
    chimeToast = document.createElement('div');
    chimeToast.className = 'chime-toast';
    chimeToast.innerHTML = `
      <span class="chime-toast-icon">🔔</span>
      <div>
        <strong>Deck 02 Fired! 4:00 PM Snack Rush Is Live</strong><br>
        <span style="font-size:12px; opacity:0.85;">Piping-hot Meat Puffs &amp; Pazhampori ready at the counter!</span>
      </div>
    `;
    document.body.appendChild(chimeToast);
  }

  let toastTimer = null;
  bellBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    chimeToast.classList.add('active');

    // Jiggle bell cards for high-energy response
    const mainCard = document.querySelector('.bell-card-main');
    const floatCard = document.querySelector('.bell-card-float');

    if (mainCard) {
      mainCard.style.transform = 'rotate(-1deg) scale(1.05)';
      setTimeout(() => { mainCard.style.transform = ''; }, 600);
    }
    if (floatCard) {
      floatCard.style.transform = 'rotate(8deg) scale(1.08)';
      setTimeout(() => { floatCard.style.transform = ''; }, 600);
    }

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      chimeToast.classList.remove('active');
    }, 4200);
  });

  // ------------------------------------------------------------------------
  // 5. Dynamic Category Filter System (Spotlight & Catalog)
  // ------------------------------------------------------------------------
  const catButtons = document.querySelectorAll('.cat-btn');
  const foodCards = document.querySelectorAll('.food-card');

  catButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      catButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter || 'all';

      foodCards.forEach((card) => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category === filter) {
          card.classList.remove('filtered-out');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, 
              { opacity: 0, y: 15, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
            );
          } else {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 6. Interactive Ateliers Accordion
  // ------------------------------------------------------------------------
  const atelierItems = document.querySelectorAll('.atelier-item');
  atelierItems.forEach((item) => {
    item.addEventListener('click', () => {
      atelierItems.forEach((it) => it.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ------------------------------------------------------------------------
  // 7. Interactive Table Reservation Form
  // ------------------------------------------------------------------------
  const bookingForm = document.getElementById('reservationForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>✨ Reserving Your Hearth Table…</span>';
      
      setTimeout(() => {
        bookingForm.innerHTML = `
          <div style="background: rgba(232, 168, 72, 0.08); border: 1.5px solid var(--amber); border-radius: 20px; padding: 36px; text-align: center;">
            <div style="font-size: 42px; margin-bottom: 14px;">🥐✨</div>
            <h3 style="font-family: var(--font-d); font-size: 26px; color: var(--cream); margin-bottom: 10px;">Hearth Table Reserved!</h3>
            <p style="color: var(--cream-soft); font-size: 15px; line-height: 1.6; max-width: 480px; margin: 0 auto;">
              We have received your reservation request. Our host at Bakery Junction will prepare your warm table and greeting. See you at the hearth!
            </p>
          </div>
        `;
      }, 900);
    }
  });

  // ------------------------------------------------------------------------
  // 8. Animated Counters via GSAP ScrollTrigger
  // ------------------------------------------------------------------------
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          let countObj = { val: 0 };
          gsap.to(countObj, {
            val: end,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.floor(countObj.val).toLocaleString() + (el.dataset.suffix || (end >= 1000 ? '+' : ''));
            }
          });
        }
      });
    } else {
      el.textContent = end.toLocaleString() + (el.dataset.suffix || '');
    }
  });

  // ------------------------------------------------------------------------
  // 9. Procedural Tactile Film Grain Canvas
  // ------------------------------------------------------------------------
  const grainCanvas = document.getElementById('grain');
  if (grainCanvas) {
    const gCtx = grainCanvas.getContext('2d');
    grainCanvas.width = 160;
    grainCanvas.height = 160;

    let grainInterval = setInterval(() => {
      const imgData = gCtx.createImageData(160, 160);
      const buffer = imgData.data;
      for (let i = 0; i < buffer.length; i += 4) {
        const val = Math.random() * 255;
        buffer[i] = val;
        buffer[i + 1] = val;
        buffer[i + 2] = val;
        buffer[i + 3] = 255;
      }
      gCtx.putImageData(imgData, 0, 0);
    }, 120);
  }

  // ------------------------------------------------------------------------
  // 10. Ambient Floating Hearth Embers Canvas
  // ------------------------------------------------------------------------
  const embersCanvas = document.getElementById('floaters');
  if (embersCanvas) {
    const ctx = embersCanvas.getContext('2d');
    let width = embersCanvas.width = embersCanvas.offsetWidth || window.innerWidth;
    let height = embersCanvas.height = embersCanvas.offsetHeight || window.innerHeight;

    window.addEventListener('resize', () => {
      if (!embersCanvas) return;
      width = embersCanvas.width = embersCanvas.offsetWidth || window.innerWidth;
      height = embersCanvas.height = embersCanvas.offsetHeight || window.innerHeight;
    }, { passive: true });

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(232, 168, 72,' : 'rgba(200, 90, 50,'
    }));

    const renderEmbers = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(renderEmbers);
    };
    requestAnimationFrame(renderEmbers);
  }
});
