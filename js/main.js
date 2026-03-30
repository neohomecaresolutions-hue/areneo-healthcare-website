/* ============================================================
   ARENEO Healthcare - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar scroll behavior ----
  const navbar = document.querySelector('.navbar');
  const topBar = document.querySelector('.top-bar');
  const TOPBAR_H = topBar ? topBar.offsetHeight : 38;

  function handleNavbarScroll() {
    if (window.scrollY > TOPBAR_H) {
      navbar.classList.add('scrolled');
      if (topBar) topBar.classList.add('hidden');
    } else {
      navbar.classList.remove('scrolled');
      if (topBar) topBar.classList.remove('hidden');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---- Mobile nav toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- Active nav link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPath || (currentPath === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll to top button ----
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Intersection Observer for animations ----
  const animElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (animElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    animElements.forEach(el => observer.observe(el));
  }

  // ---- Animated counters ----
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Open clicked if it wasn't already open
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit-btn');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // Simulate form submission (replace with real API call)
      setTimeout(() => {
        const success = document.querySelector('.form-success');
        if (success) success.classList.add('show');
        contactForm.reset();
        btn.innerHTML = original;
        btn.disabled = false;
        setTimeout(() => success && success.classList.remove('show'), 6000);
      }, 1500);
    });
  }

  // ---- Career Application Form ----
  const careerForm = document.getElementById('careerForm');
  if (careerForm) {
    careerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = careerForm.querySelector('.form-submit-btn');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      btn.disabled = true;

      setTimeout(() => {
        const success = document.querySelector('.career-form-success');
        if (success) success.classList.add('show');
        careerForm.reset();
        btn.innerHTML = original;
        btn.disabled = false;
        success && success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => success && success.classList.remove('show'), 8000);
      }, 1500);
    });
  }

  // ---- Testimonials auto-carousel (mobile) ----
  // Cards are shown in grid on desktop; on small screens we allow scrolling
  // Optional: add a simple dot navigation if needed

  // ---- Smooth anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
