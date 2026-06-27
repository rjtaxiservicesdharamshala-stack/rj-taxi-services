/* ============================================================
   Destination Pages — JavaScript Enhancements
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ---- Itinerary Timeline Animation ----
  const itineraryDays = document.querySelectorAll('.itinerary-day');
  if (itineraryDays.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slideIn 0.6s ease forwards';
        }
      });
    }, { threshold: 0.1 });
    
    itineraryDays.forEach((day, index) => {
      day.style.animationDelay = `${index * 0.1}s`;
      observer.observe(day);
    });
  }
  
  // ---- Attraction Card Hover ----
  const attractionCards = document.querySelectorAll('.attraction-card');
  attractionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // ---- Fleet Card Selection ----
  const fleetCards = document.querySelectorAll('.fleet-card');
  fleetCards.forEach(card => {
    card.addEventListener('click', function() {
      const vehicleName = this.querySelector('.fleet-name').textContent;
      const passengers = this.querySelector('.fleet-cap:first-child').textContent;
      console.log(`Selected: ${vehicleName} - ${passengers}`);
    });
  });
  
  // ---- Smooth Counter Animation ----
  const counters = document.querySelectorAll('.counter-num');
  let hasRun = false;
  
  const runCounters = () => {
    if (hasRun) return;
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent) || 0;
      let current = 0;
      const increment = Math.ceil(target / 30);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 50);
    });
    
    hasRun = true;
  };
  
  // Trigger counter animation when section is in view
  const counterSection = document.querySelector('.counters-section');
  if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(counterSection);
  }
  
  // ---- Image Lazy Loading ----
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.addEventListener('load', () => {
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
          });
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // ---- Testimonials Slider (if exists) ----
  const testimonialsTrack = document.querySelector('.testimonials-track');
  if (testimonialsTrack) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.testimonial-card');
    const totalSlides = slides.length;
    const sliderBtns = document.querySelectorAll('.slider-btn');
    
    function goToSlide(index) {
      if (index >= totalSlides) currentIndex = 0;
      if (index < 0) currentIndex = totalSlides - 1;
      
      testimonialsTrack.style.transform = `translateX(-${currentIndex * (340 + 24)}px)`;
    }
    
    if (sliderBtns.length > 0) {
      sliderBtns[0].addEventListener('click', () => {
        currentIndex--;
        goToSlide(currentIndex);
      });
      
      sliderBtns[1].addEventListener('click', () => {
        currentIndex++;
        goToSlide(currentIndex);
      });
    }
  }
  
  // ---- Price Factors Animation ----
  const priceFactors = document.querySelectorAll('.price-factor');
  priceFactors.forEach((factor, index) => {
    factor.style.animationDelay = `${index * 0.1}s`;
  });
  
  // ---- Destination Gallery Filter (if exists) ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });
});

// Add slideIn animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);
