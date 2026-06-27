/* ============================================================
   Destination Pages — JavaScript Enhancements
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Hero Ken Burns effect ---- */
  const destHero = document.querySelector('.dest-hero');
  if (destHero) {
    setTimeout(function () { destHero.classList.add('loaded'); }, 100);
  }

  /* ---- Intersection Observer for stagger animations ---- */
  const animTargets = document.querySelectorAll(
    '.why-rj-card, .attraction-card, .fleet-card, .dest-testimonial-card, .itinerary-day, .place-chip'
  );
  if (animTargets.length) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, (entry.target.dataset.delay || 0) * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animTargets.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      el.dataset.delay = i % 4;
      obs.observe(el);
    });
  }

  /* ---- Gallery lightbox ---- */
  const galleryItems = document.querySelectorAll('.dest-gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (galleryItems.length && lightbox && lightboxImg) {
    galleryItems.forEach(function (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function () {
        lightboxImg.src = img.src.replace('w=400', 'w=1200').replace('w=500', 'w=1200');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    const lbClose = document.getElementById('lightbox-close');
    if (lbClose) {
      lbClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Enquiry form modal ---- */
  const modal = document.getElementById('enquiry-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.open-enquiry').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  /* ---- Enquiry modal form submit → WhatsApp ---- */
  const modalForm = document.getElementById('modal-enquiry-form');
  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const dest = document.getElementById('modal-dest') ? document.getElementById('modal-dest').value : '';
      const name = document.getElementById('modal-name') ? document.getElementById('modal-name').value : '';
      const phone = document.getElementById('modal-phone') ? document.getElementById('modal-phone').value : '';
      const travel = document.getElementById('modal-travel') ? document.getElementById('modal-travel').value : '';
      const pax = document.getElementById('modal-pax') ? document.getElementById('modal-pax').value : '';
      const msg = encodeURIComponent(
        'Hello RJ Taxi Services!\n\nI need a quote for:\n' +
        'Destination: ' + dest + '\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Travel Date: ' + travel + '\n' +
        'Passengers: ' + pax + '\n\nPlease share your best rates.'
      );
      window.open('https://wa.me/919317082083?text=' + msg, '_blank');
      closeModal();
    });
  }

  /* ---- Navbar state ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    function updateNav() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ---- Back to top ---- */
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Mobile nav ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      navToggle.innerHTML = navMenu.classList.contains('open')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  /* ---- Page loader ---- */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('hidden'); }, 1200);
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) {
        if (i !== item) i.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

});
