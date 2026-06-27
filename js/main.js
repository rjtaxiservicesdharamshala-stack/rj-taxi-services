/* ============================================================
   RJ Taxi Services Dharamshala — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Page Loader ---- */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('hidden'); }, 1600);
    });
  }

  /* ---- Navbar Scroll Behaviour ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    function updateNav() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('top');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('top');
      }
    }
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ---- Mobile Nav Toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      navToggle.innerHTML = navMenu.classList.contains('open')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
  // Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown > .nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        }
    });
});
  /* ---- Back to Top ---- */
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Animated Counters ---- */
  function animateCounter(el, target, suffix) {
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(function () {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString() + suffix;
      if (current >= target) clearInterval(interval);
    }, 24);
  }

  const counterEls = document.querySelectorAll('.counter-num');
  if (counterEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = '1';
          const target = parseInt(entry.target.dataset.target, 10);
          const suffix = entry.target.dataset.suffix || '';
          animateCounter(entry.target, target, suffix);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Fade-Up Scroll Animations ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  }

  /* ---- FAQ Accordion ---- */
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

  /* ---- Testimonials Slider ---- */
  const sliderTrack = document.querySelector('.testimonials-track');
  if (sliderTrack) {
    let pos = 0;
    const cards = sliderTrack.querySelectorAll('.testimonial-card');
    const cardWidth = 364; // 340 + 24 gap
    const maxPos = Math.max(0, cards.length - 3);

    function slideToPos(newPos) {
      pos = Math.max(0, Math.min(newPos, maxPos));
      sliderTrack.style.transform = 'translateX(-' + (pos * cardWidth) + 'px)';
    }

    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { slideToPos(pos - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { slideToPos(pos + 1); });

    // Auto-slide
    setInterval(function () { slideToPos(pos + 1 <= maxPos ? pos + 1 : 0); }, 5000);
  }

  /* ---- Gallery Filters ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    document.getElementById('lightbox-close').addEventListener('click', function () {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Booking Form Submit ---- */
  const bookingForms = document.querySelectorAll('.booking-form-el');
  bookingForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const from = form.querySelector('[name="from"]') ? form.querySelector('[name="from"]').value : '';
      const to = form.querySelector('[name="to"]') ? form.querySelector('[name="to"]').value : '';
      const msg = encodeURIComponent(
        'Hello RJ Taxi Services,\n\nI would like to book a taxi.\n\nFrom: ' + from +
        '\nTo: ' + to + '\n\nPlease provide me a quote.'
      );
      window.open('https://wa.me/919317082083?text=' + msg, '_blank');
    });
  });

  /* ---- Enquiry Form Submit ---- */
  const enquiryForms = document.querySelectorAll('.enquiry-form-el');
  enquiryForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]') ? form.querySelector('[name="name"]').value : '';
      const phone = form.querySelector('[name="phone"]') ? form.querySelector('[name="phone"]').value : '';
      const service = form.querySelector('[name="service"]') ? form.querySelector('[name="service"]').value : '';
      const msg = encodeURIComponent(
        'Hello RJ Taxi Services,\n\nName: ' + name +
        '\nPhone: ' + phone +
        '\nService Required: ' + service +
        '\n\nPlease get back to me.'
      );
      window.open('https://wa.me/919317082083?text=' + msg, '_blank');
    });
  });

  /* ---- Lazy Load Images ---- */
  if ('IntersectionObserver' in window) {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(function (img) { imgObserver.observe(img); });
  }

  /* ---- Active Nav Link ---- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function (link) {
    if (link.getAttribute('href') && currentPath.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

});
