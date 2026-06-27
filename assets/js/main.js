/* ============================================================
   RJ Taxi Services — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  // ---- Mobile Menu Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
  
  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.remove('top');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('top');
      navbar.classList.remove('scrolled');
    }
  });
  
  // ---- Page Loader ----
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    window.addEventListener('load', function() {
      pageLoader.classList.add('hidden');
    });
    
    setTimeout(function() {
      pageLoader.classList.add('hidden');
    }, 1500);
  }
  
  // ---- Back to Top Button ----
  const backTopBtn = document.querySelector('.back-top');
  if (backTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backTopBtn.classList.add('visible');
      } else {
        backTopBtn.classList.remove('visible');
      }
    });
    
    backTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // ---- Lightbox Gallery ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.dest-gallery-item img, .gallery-item img');
  
  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(img => {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
      });
    });
    
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
      });
    }
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
  
  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
          }
        });
        item.classList.toggle('open');
      });
    }
  });
  
  // ---- Modal Enquiry Form ----
  const modal = document.getElementById('enquiry-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalForm = document.getElementById('modal-enquiry-form');
  
  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const dest = document.getElementById('modal-dest').value;
      const name = document.getElementById('modal-name').value;
      const email = document.getElementById('modal-email')?.value || '';
      const phone = document.getElementById('modal-phone')?.value || '';
      const travel = document.getElementById('modal-travel').value;
      
      const message = `Hi! I'm interested in booking a taxi service.\n\nDetails:\nName: ${name}\nDestination: ${dest}\nTravel Date: ${travel}\nEmail: ${email}\nPhone: ${phone}`;
      
      const whatsappUrl = `https://wa.me/919317082083?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      this.reset();
      closeModal();
    });
  }
  
  function closeModal() {
    if (modal && modalOverlay) {
      modal.style.opacity = '0';
      modal.style.visibility = 'hidden';
      modal.style.transform = 'translate(-50%, -50%) scale(0.95)';
      modalOverlay.style.opacity = '0';
      modalOverlay.style.visibility = 'hidden';
    }
  }
  
  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  
  // ---- Fade-up Animation on Scroll ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
});
